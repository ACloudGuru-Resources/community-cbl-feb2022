import { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import PhotoMetadata from './PhotoMetadata';
import { getPhoto } from './services';

const Photo = ({ refreshPhotos }) => {

  // Get photoId from the URL
  let { photoId } = useParams();

  // Current photo details
  const [photo, setPhoto] = useState({});

  // Get photo details based on photo ID (from URL)
  useEffect(() => {
    let mounted = true;
    (async function() {
      const photo = await getPhoto(photoId);
      if(mounted) {
        setPhoto(photo)
      }
    })();
    return () => mounted = false
  }, [photoId]);

  return (
    <div className="page-container photo-detail">
      <div className="flex-container">
        <div className="left-side">
          <div className="image-container">
            <img src={ photo.url } 
              className="image-preview"
              alt={ photo.key } />
          </div>
        </div>
        <div className="right-side">
          <PhotoMetadata photoId={photoId}
            photoMetadata={photo.metadata}
            refreshPhotos={refreshPhotos} />
        </div>
      </div>
    </div>
  )

}

export default Photo;
