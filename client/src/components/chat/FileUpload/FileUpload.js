import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';

const FileUpload = ({ onFileUpload, maxFiles = 5, maxSize = 10 * 1024 * 1024 }) => {
  const onDrop = useCallback((acceptedFiles) => {
    onFileUpload(acceptedFiles);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'application/*': ['.pdf', '.doc', '.docx', '.txt', '.zip']
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className={`file-upload ${isDragActive ? 'active' : ''}`}
    >
      <input {...getInputProps()} />
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
    </div>
  );
};

export default FileUpload;