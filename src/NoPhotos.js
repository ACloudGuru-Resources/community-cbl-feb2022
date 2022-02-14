const NoPhotos = ({ uploadPhoto }) => {

  return (
    <div className="no-photos">
      <svg xmlns="http://www.w3.org/2000/svg" 
        className="photo-icon" 
        fill="none"
        viewBox="0 0 24 24" 
        stroke="currentColor">
        <path strokeLinecap="round" 
          strokeLinejoin="round" strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p>Upload your photos to get started.</p>
      <div className="mt-6">
        <button type="button"
          onClick={uploadPhoto}
          className="accent-button">
          <svg xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor">
            <path 
              fillRule="evenodd" 
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Upload Photo
        </button>
      </div>
    </div>
  )

}

export default NoPhotos;