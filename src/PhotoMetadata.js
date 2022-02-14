import { bytesToSize, parseExifDate } from './util'
import { deletePhoto, downloadPhoto } from './services';
import { useNavigate } from 'react-router-dom';

const PhotoMetadata = ({ photoMetadata, photoId, refreshPhotos }) => {

  let navigate = useNavigate();

  const getModifyDateDescriptor = (dateString) => {
    const date = parseExifDate(dateString);
    return `${date.toLocaleString()}`
  }

  const deleteUserPhoto = async () => {
    await deletePhoto(photoId);
    navigate('/');
    await refreshPhotos();
  }

  const downloadUserPhoto = async () => {
    await downloadPhoto(photoId);
  }

  const renderMetadata = () => {
    if(photoMetadata && photoMetadata.image) {
      return (
        <div className="bg-slate-700 p-5 mb-6 lg:mb-0;">
          <div className="metadata">
            <div className="metadata-title">Filename</div>
            <div className="metadata-item">{ photoId }</div>
          </div>
          <div className="metadata">
            <div className="metadata-title">File Size</div>
            <div className="metadata-item">{  bytesToSize(photoMetadata.size) }</div>
          </div>
          { photoMetadata.exif && photoMetadata.exif.ExifImageWidth &&
            <div className="metadata">
              <div className="metadata-title">Resolution</div>
              <div className="metadata-item">{ `${photoMetadata.exif.ExifImageWidth} x ${photoMetadata.exif.ExifImageHeight}` }</div>
          </div>
          }
          { photoMetadata.image && photoMetadata.image.Make &&
            <div className="metadata">
              <div className="metadata-title">Make</div>
              <div className="metadata-item">{ `${photoMetadata.image.Make}` }</div>
          </div>
          }
          { photoMetadata.image && photoMetadata.image.Model &&
            <div className="metadata">
              <div className="metadata-title">Model</div>
              <div className="metadata-item">{ `${photoMetadata.image.Model}` }</div>
          </div>
          }
          { photoMetadata.image && photoMetadata.image.ModifyDate &&
            <div className="metadata">
              <div className="metadata-title">Date Captured</div>
              <div className="metadata-item">{ `${getModifyDateDescriptor(photoMetadata.image.ModifyDate)}` }</div>
          </div>
          }
          <div className="metadata">
            <div className="metadata-title">AI Tags</div>
            <ul className="tag-list">
              { photoMetadata.labels.map((label) => (
                <li className="tag-list-item" key={label}>
                  <span className="tag-list-badge"> { label } </span>
                </li>
              ))}
            </ul>
          </div>
          <button type="button" className="inline-flex mt-4 w-full justify-center items-center py-3 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={downloadUserPhoto}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 -ml-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Original File
          </button>
          <button type="button" className="inline-flex mt-4 w-full justify-center items-center py-3 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={deleteUserPhoto}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 -ml-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
            Delete Photo
          </button>
        </div>
      )
    } else {
      return (
        <div className="bg-slate-700 p-5">
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      )
    }
  }

  return renderMetadata()
}

export default PhotoMetadata;