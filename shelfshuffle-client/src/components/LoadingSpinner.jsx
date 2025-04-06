import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => (
  <div className={`d-flex justify-content-center ${fullPage ? 'vh-100 align-items-center' : 'my-4'}`}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner;