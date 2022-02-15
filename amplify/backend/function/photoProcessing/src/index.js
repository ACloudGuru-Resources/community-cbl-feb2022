

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 const gm = require('gm')
 const aws = require('aws-sdk')
 const s3 = new aws.S3()
 const rekognition = new aws.Rekognition()
 const ExifImage = require('exif').ExifImage;
 
 const MAX_WIDTH = 400
 const MAX_HEIGHT = 400
 
 const shouldIgnoreFile = (key) => {
   // Detect if thumbnail
   const elements = key.split('/');
   if (elements[elements.length - 2] === 'thumbnails') {
     return true;
   }
   // Detect if JSON
   const lastElement = elements[elements.length -1];
   if(lastElement.endsWith('json')) {
     return true;
   }
   // Neither, go ahead and process
   return false;
 }
 
 const generateThumbnail = async (image) => {
   return new Promise((resolve, reject) => {
     gm(image.Body)
       .resize(MAX_WIDTH, MAX_HEIGHT)
       .setFormat('jpeg')
       .toBuffer(function (err, buffer) {
         if (err) {
           console.log('error storing and resizing image: ', err)
           reject(err)
         }
         else {
           resolve(buffer)
         }
       })
   });
 }
 
 const getImageMetadata = async (buffer) => {
   return new Promise((resolve, reject) => {
     new ExifImage(buffer, (err, exifData) => {
       if(err) {
         reject(err);
       } else {
         resolve({
           image: exifData.image,
           exif: exifData.exif,
           gps: exifData.gps
         })
       }
     })
   });
 }
 
 const getImageLabels = async (imageBuffer) => {
   const rekognitionParams = {
     Image: {
       Bytes: imageBuffer
     },
     MinConfidence: 75
   }
   const result = await rekognition.detectLabels(rekognitionParams).promise()
   const labels = result.Labels.map(l => l.Name)
   return labels;
 }
 
 exports.handler = async function (event) {
   const bucket = event.Records[0].s3.bucket.name
   const key = decodeURIComponent(event.Records[0].s3.object.key)
 
   // Log event information in JSON
   console.log({
     bucket,
     key,
     eventName: event.Records[0].eventName
   });
 
   // Bail if not an ObjectCreated event
   console.log("Detecting if an object created event...");
   if(!event.Records[0].eventName.startsWith('ObjectCreated')) {
     console.log("Not an object created event.  Exiting...");
     return;
   }
 
   // Bail out if this was triggered by a thumbnail
   console.log("Detecting if thumbnail or JSON file...");
   if(shouldIgnoreFile(key)) {
     console.log("Thumbnail or JSON file. Exiting...");
     return;
   }
 
   // Get information from key
   const keyElements = key.split('/');
   const userKey = keyElements[1];
   const photoKey = keyElements[keyElements.length - 1];
 
   // Download file from S3 to local environment of Lambda function
   console.log("Downloading image from S3...");
   console.log(`Bucket: ${bucket} Key: ${key}`);
   const image = await s3.getObject({ Bucket: bucket, Key: key }).promise();
 
   // Get size of buffer
   const size = image.Body.length;
 
   // Generate thumbnail
   console.log("Generating thumbnail...");
   const buffer = await generateThumbnail(image);
 
   // Save thumbnail to S3
   console.log("Save thumbnail to S3...");
   await s3.putObject({ Bucket: bucket, Body: buffer, Key: `private/${userKey}/thumbnails/${photoKey}` }).promise();
 
   // Get image data from Rekognition
   console.log(`Get image labels via Rekognition`);
   const labels = await getImageLabels(image.Body);
 
   // Get Photo Metadata
   console.log("Get photo metadata...");
   const metadata = await getImageMetadata(image.Body);
 
   // Upload image data to JSON file in S3
   console.log(`Upload image data to S3`);
   const outputData = JSON.stringify({
     ...metadata,
     labels,
     size
   })
   await s3.putObject({ 
     Bucket: bucket, 
     Body: outputData, 
     ContentType:'application/json',
     Key: `private/${userKey}/${photoKey}.json` }).promise();
   
   console.log('Done!')
 };
 
