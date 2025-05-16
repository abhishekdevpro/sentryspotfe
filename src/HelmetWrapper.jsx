import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

// Create a wrapper component to ensure proper Helmet initialization
const HelmetWrapper = ({ children }) => {
  return (
    <HelmetProvider context={{}}>
      {children}
    </HelmetProvider>
  );
};

export default HelmetWrapper;