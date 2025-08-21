import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = ({ 
  trigger, 
  children, 
  position = 'bottom-left', 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const positionClasses = {
    'bottom-left': 'dropdown-bottom-left',
    'bottom-right': 'dropdown-bottom-right',
    'top-left': 'dropdown-top-left',
    'top-right': 'dropdown-top-right'
  };

  const classes = `dropdown ${positionClasses[position]} ${className}`.trim();

  return (
    <div className={classes} ref={dropdownRef}>
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        {trigger}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;