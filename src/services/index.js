import { delayedResult, photos, photoDetail } from '../fixtures/';

export const getPhotos = async () => {
  return await delayedResult(photos, 500);
}

export const uploadPhoto = async (file) => {
  return await delayedResult(null, 3000);
}

export const getPhoto = async (key) => {
  return await delayedResult(photoDetail, 500);
}

export const deletePhoto = async (key) => {
  return await delayedResult(null, 1000);
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
  return await delayedResult(null, 1000);
}
