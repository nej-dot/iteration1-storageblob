import React, { useEffect, useState } from 'react';
import { Blob } from '@vercel/blob';

const blob = new Blob({
  token: 'BLOB_READ_WRITE_TOKEN', // Use your Vercel access token
});

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await blob.list(); // This will list all blob items
      setImages(fetchedImages.items);
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
