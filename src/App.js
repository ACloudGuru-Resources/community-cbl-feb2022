import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { getPhotos, uploadPhoto } from './services/';
import AppRoutes from './AppRoutes';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import Footer from './Footer';

import './App.css';

const App = () => {

  // List of photos
  const [photos, setPhotos] = useState([]);

  // Fetch the list of photos
  const fetchPhotos = async () => {
    let photos = await getPhotos();
    setPhotos(photos);
  }

  // Get the preview of image the user is uploading
  const getPreviewImageURL = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e => {
        resolve(reader.result)
      })
    })
  }

  // Kick off the upload process once a user selects a file
  const upload = async (evt) => {
    const { files } = evt.target;
    const file = files[0];
    const photo = {
      isLoading: true,
      url: await getPreviewImageURL(file),
      key: file.name,
      filename: file.name
    }
    const newPhotos = [ ...photos];
    newPhotos.push(photo);
    newPhotos.sort((a,b) => a.key.toLowerCase().localeCompare(b.key.toLowerCase()))
    setPhotos(newPhotos);
    await uploadPhoto(file);
    // Wait for the time of thumbnail creation
    setTimeout(() => {
      fetchPhotos()
    }, 7000)
  }

  // Open the user upload dialog
  const triggerUpload = (_) => {
    inputFile.current.click();
  }

  // Ref to the hidden file input
  const inputFile = useRef(null) 

  // Get photos on launch
  useEffect(() => {
    (async function() {
      await fetchPhotos();
    })();
  }, []);

  return (
    <div className="App">
      {/* Hidden input for file upload */}
      <input 
        type="file" 
        id="file"
        ref={inputFile}
        className="hidden"
        onChange={upload}
        accept=".jpg,.jpeg"
        multiple={false}/>
      <Header 
        uploadPhoto={triggerUpload} 
        signOut={() => ({})} />
      <Router>
        <Breadcrumbs />
        <section className="content-area">
          <div className="content-wrapper">
              <AppRoutes 
                photos={photos} 
                refreshPhotos={fetchPhotos}
                uploadPhoto={triggerUpload} />
          </div>
        </section>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
