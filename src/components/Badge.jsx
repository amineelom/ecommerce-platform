import React from 'react';
import './Badge.css';

const Badge = ({ text, variant = 'primary', size = 'medium', icon }) => {
  return (
    <span className={`badge badge-${variant} badge-${size}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      {text}
    </span>
  );
};

export default Badge;
