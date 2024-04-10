// pages/api/blobs.ts

import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function blobs(request: Request) {
  const { blobs } = await list({
    token: process.env.BLOB_READ_WRITE_TOKEN, // Ensure your token is available in environment variables
    limit: 1000, // Adjust the limit as needed
    prefix: '', // Use this to filter blobs by a specific folder
    cursor: '', // Pagination cursor if applicable
    mode: 'expanded', // Choose between 'expanded' and 'folded'
  });
  return NextResponse.json(blobs);
}
