import React from 'react';
import NoPhotos from './NoPhotos';
import PhotoCard from './PhotoCard';

const PhotoList = ({ photos, uploadPhoto }) => {

  return (
    <div className="page-container">
        { photos.length > 0 &&
        <ul className="image-list">
            {photos.map((photo, i) => (
               <PhotoCard
                key={ photo.key } 
                photo={photo} />
            ))}
        </ul> }
        { photos.length === 0 &&
          <NoPhotos uploadPhoto={uploadPhoto} />
        }
    </div>
  )

}

export default PhotoList;
