import React from 'react';

export default function Avatar({ src, alt = "Sai Nikhil Vukka", className = "" }) {
  const [imageError, setImageError] = React.useState(false);

  if (src && !imageError) {
    return (
      <div className={`avatar-container ${className}`}>
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="avatar-img"
        />
      </div>
    );
  }

  // Premium interactive SVG placeholder
  return (
    <div className={`avatar-container avatar-placeholder group ${className}`}>
      {/* Dynamic background gradient */}
      <div className="avatar-gradient" />
      
      {/* Animated glowing lines */}
      <svg className="avatar-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-grad)" />
        <circle cx="50%" cy="50%" r="40%" stroke="url(#grid-grad)" strokeWidth="1.5" fill="none" strokeDasharray="5,5" className="avatar-circle" />
      </svg>

      {/* Abstract geometric design representing Data Science and AI */}
      <div className="avatar-content">
        <div className="avatar-badge">
          <span className="avatar-initials">SN</span>
        </div>
        <span className="avatar-subtitle">
          AI & DS Research
        </span>
      </div>
    </div>
  );
}
