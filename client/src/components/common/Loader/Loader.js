import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', variant = 'primary' }) => {
  const sizeClasses = {
    small: 'loader-small',
    medium: 'loader-medium',
    large: 'loader-large'
  };

  const variantClasses = {
    primary: 'loader-primary',
    secondary: 'loader-secondary',
    white: 'loader-white'
  };

  const classes = `loader ${sizeClasses[size]} ${variantClasses[variant]}`.trim();

  return <div className={classes}></div>;
};

export default Loader;