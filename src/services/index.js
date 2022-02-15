import { delayedResult, photos, photoDetail } from '../fixtures/';
import { Storage } from 'aws-amplify';

let urlCache = {};

export const getPhotos = async () => {
  // Get list of all files
  const rawPhotos = await Storage.list('thumbnails/', { level: 'private' });
  // Get signed URL for each of the files in the list
  const photos = await Promise.all(rawPhotos.map(async (photo) => {
    if(!urlCache.hasOwnProperty(photo.key)) {
      urlCache[photo.key] = await Storage.get(photo.key, {
        level: 'private',
        download: false,
        expires: 7200,
        contentType: 'image/jpeg'
      });
    }
    photo.url = urlCache[photo.key];
    const pathElements = photo.key.split('/');
    photo.key = pathElements[pathElements.length - 1]
    return photo;
  }));
  return photos;
}

export const uploadPhoto = async (file) => {
  await Storage.put(file.name, file, {
    contentType: file.type,
    level: "private",
  });
}

export const getPhoto = async (key) => {
  // Get photo URL
  const url = await Storage.get(key, {
    level: 'private',
    download: false,
    expires: 900,
    contentType: 'image/jpeg'
  });
  // Get JSON metadata
  const rawMetadata = await Storage.get(`${key}.json`, {
    level: 'private',
    download: true,
    cacheControl: 'no-cache'
  });
  const metadataText = await (new Response(rawMetadata.Body)).text();
  const metadata = JSON.parse(metadataText);
  // Return it all in a single object
  return {
    metadata,
    url
  }
}

export const deletePhoto = async (key) => {
  const files = [
    key,
    `${key}.json`,
    `thumbnails/${key}`
  ]
  await Promise.all(files.map(async (fileKey) => {
    await Storage.remove(fileKey, {
      level: 'private'
    })
  }));
}

// Function from Amplify documentation
// see https://docs.amplify.aws/lib/storage/download/q/platform/js/#get
const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener('click', clickHandler);
    }, 150);
  };
  a.addEventListener('click', clickHandler, false);
  a.click();
  return a;
}

export const downloadPhoto = async (key) => {
  const image = await Storage.get(key, {
    level: 'private',
    download: true,
    cacheControl: 'no-cache'
  });
  downloadBlob(image.Body, key)
}
