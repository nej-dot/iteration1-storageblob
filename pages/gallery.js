import React, { useEffect, useState } from 'react';
import { list } from '@vercel/blob'; // Direct import of the list function
import Image from 'next/image';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN }); // Direct use of list function
        setImages(blobs);
      } catch (error) {
        console.error('Failed to fetch images:', error);
        setImages([]); // Handle errors gracefully
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      <div>
        {images.map((img, index) => (
          <div key={index} style={{ width: '100px', height: '100px', position: 'relative' }}>
            <Image src={img.url} alt="Gallery Image" layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
