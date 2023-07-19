import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ images, slideInterval = 5000, slideDuration = 1000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = () => {
      Promise.all(images.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image;
          img.onload = resolve;
          img.onerror = reject;
        });
      }))
      .then(() => setIsLoading(false))
      .catch((error) => console.error('Error preloading images:', error));
    };

    preloadImages();

    const slideTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, slideInterval);

    return () => clearInterval(slideTimer);
  }, [images, slideInterval]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel">
     
      <div className="carousel__image-container">
        {images.map((image, index) => (
          <img
            key={index}
            className={`carousel__image ${index === currentIndex ? 'active' : ''}`}
            src={image}
            alt={`Image ${index + 1}`}
            style={{
              animationDuration: `${slideDuration}ms`,
              opacity: index === currentIndex ? 1 : 0,
              position: index === currentIndex ? 'relative' : 'absolute'
            }}
          />
        ))}
      </div>
    
    </div>
  );
};

export default Carousel;