// pages/api/upload.ts

import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function upload(request) {
  const form = await request.formData();
  const file = form.get('file') as File;
  const blob = await put(file.name, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN, // Ensure your token is available in environment variables
    addRandomSuffix: true, // Set to false if you do not want a random suffix
    contentType: file.type, // Automatically determined from the file's MIME type
  });

  return NextResponse.json(blob);
}
