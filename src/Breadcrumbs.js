import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


export default function Breadcrumbs() {

  const location = useLocation();
  const [currentKey, setCurrentKey] = useState(null);

  // Execute when the location changes to adjust the breadcrumbs
  useEffect(() => {
    const elements = location.pathname.split('/');
    if(elements.length < 2) {
      setCurrentKey(null);
    } else {
      setCurrentKey(elements[elements.length - 1]);
    }
  }, [location]);

  return (
    <nav className="breadcrumbs">
      <ol>
        <li className="flex">
          <div className="flex items-center">
            { currentKey &&
            <Link to="/" className="active-link">
              My Photos
              <span className="sr-only">Home</span>
            </Link> }
            { !currentKey &&
            <div className="inactive-link">
              My Photos
              <span className="sr-only">Home</span>
            </div> }
          </div>
        </li>
        { currentKey &&
        <li key={ currentKey } className="flex">
            <div className="flex items-center">
              <svg
                className="separator"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <div
                className="inactive-link ml-4">
                { currentKey }
              </div>
            </div>
          </li> }
          { !currentKey &&
          <li key="no-item" className="flex">
              <div className="flex items-center">
                <svg
                  className="separator"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
              </div>
            </li> }
      </ol>
    </nav>
  )
}
