import React from 'react';
import {
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import { useState } from 'react'; 
import PhotoList from './PhotoList';
import Photo from './Photo';
import NotFound from './NotFound';
import { TransitionGroup, CSSTransition } from "react-transition-group";

const AppRoutes = ({ photos, refreshPhotos, uploadPhoto }) => {

  const location = useLocation();

  // Toggle transition type (between next, prev)
  const [transition, setTransition] = useState('next');
  const toggleTransition = () => {
    setTransition((transition === 'next') ? 'prev' : 'next');
  }

  return (
    <TransitionGroup component={null}>
      <CSSTransition 
        key={location.key} 
        classNames={ transition } 
        timeout={500} 
        onExited={toggleTransition}>
        <Routes location={location}>
          <Route path="/photos/:photoId" element={<Photo refreshPhotos={refreshPhotos} />} />
          <Route index element={<PhotoList photos={photos} uploadPhoto={uploadPhoto} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default AppRoutes;
