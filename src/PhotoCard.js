import { Link } from 'react-router-dom';
import { bytesToSize } from './util/';

const PhotoCard = ({ photo }) => {

  return (
    <li className="image-card">
      <div className="group">
        { photo.isLoading &&
        <>
        <img src={ photo.url } 
          alt={ photo.key } 
          className="opacity-50" />
        <svg 
          className="animate-spin -ml-1 mr-3 h-5 w-5 p-20 text-neutral-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" 
            cx="12" cy="12" r="10" 
            stroke="currentColor" 
            strokeWidth="4"></circle>
          <path className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        </> }
        { !photo.isLoading &&
        <>
        <img src={ photo.url } 
          alt={ photo.key } 
          className="group-hover:opacity-75" />
        <Link to={`/photos/${photo.key}`} 
          type="button"
          className="">
          <span className="sr-only">{ photo.filename }</span>
        </Link>
        </> }
      </div>
      <p className="title">{ photo.key }</p>
      {photo.isLoading &&
        <p className="subtitle">Uploading...</p> }
      {!photo.isLoading &&
      <p className="subtitle">{ bytesToSize(photo.size, 1) }</p> }
    </li>
  )

}

export default PhotoCard;