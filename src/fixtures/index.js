export const delayedResult = async (data, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

export const photos = [
  {
    url: 'https://cbl-sample-photos.s3.amazonaws.com/image-1.jpg',
    key: 'image-1.jpg',
    size: 2020300
  },{
    url: 'https://cbl-sample-photos.s3.amazonaws.com/image-2.jpg',
    key: 'image-2.jpg',
    size: 2020300
  },{
    url: 'https://cbl-sample-photos.s3.amazonaws.com/image-3.jpg',
    key: 'image-3.jpg',
    size: 2020300
  },{
    url: 'https://cbl-sample-photos.s3.amazonaws.com/image-4.jpg',
    key: 'image-4.jpg',
    size: 2020300
  },{
    url: 'https://cbl-sample-photos.s3.amazonaws.com/image-5.jpg',
    key: 'image-5.jpg',
    size: 2020300
  },{
    url: 'https://cbl-sample-photos.s3.amazonaws.com/image-6.jpg',
    key: 'image-6.jpg',
    size: 2020300
  },{
    url: 'https://cbl-sample-photos.s3.amazonaws.com/image-7.jpg',
    key: 'image-7.jpg',
    size: 2020300
  },{
    url: 'https://cbl-sample-photos.s3.amazonaws.com/image-8.jpg',
    key: 'image-8.jpg',
    size: 2020300
  }
];

export const photoDetail = {
  url: 'https://cbl-sample-photos.s3.amazonaws.com/image-1.jpg',
  key: 'image-1.jpg',
  metadata: {
    size: 1020304,
    exif: {
      ExifImageWidth: 1200,
      ExifImageHeight: 1200
    },
    image: {
      Make: 'Apple',
      Model: 'iPhone 13 Max Plus',
      ModifyDate: '2020:06:13 13:01:22'
    },
    labels: [
      'test',
      'sample',
      'tree',
      'stuff'
    ]
  }
}