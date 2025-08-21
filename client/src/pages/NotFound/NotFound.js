import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;