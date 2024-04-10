import { Blob } from '@vercel/blob';
import axios from 'axios';

const blob = new Blob({
  token: 'BLOB_READ_WRITE_TOKEN', // Replace with your Vercel access token
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data: imageBuffer } = await axios.get(req.body.imageUrl, { responseType: 'arraybuffer' });
      const uploadResponse = await blob.upload({
        data: imageBuffer,
        contentType: 'image/jpeg', // Make sure to match the content type of your images
      });

      res.status(200).json({ success: true, message: 'Image uploaded successfully', url: uploadResponse.url });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to upload image', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

