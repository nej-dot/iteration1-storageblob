import axios from 'axios';

// Replace 'YOUR_BLOB_STORAGE_URL' and 'YOUR_API_KEY' with actual values from your Vercel project
const BLOB_STORAGE_URL = 'YOUR_BLOB_STORAGE_URL';
const API_KEY = 'YOUR_API_KEY';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data: imageBuffer } = await axios.get(req.body.imageUrl, { responseType: 'arraybuffer' });
      const response = await axios.put(BLOB_STORAGE_URL, imageBuffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      res.status(200).json({ success: true, message: 'Image uploaded successfully', data: response.data });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to upload image', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
