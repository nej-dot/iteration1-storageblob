import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get('YOUR_BLOB_STORAGE_URL/images', {
        headers: { 'Authorization': `Bearer YOUR_API_KEY` }
      });
      setImages(response.data.images);
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      <div>
        {images.map((img, index) => (
          <img key={index} src={img.url} alt="Gallery Image" style={{ width: '100px', height: '100px' }} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
