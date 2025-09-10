import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

// POST handler for file upload
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create new FormData for backend request
    const backendFormData = new FormData();
    backendFormData.append('file', file);

    // Forward request to backend
    const backendResponse = await fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      body: backendFormData,
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend error: ${backendResponse.status}`);
    }

    const data = await backendResponse.json();
    
    return NextResponse.json({
      success: true,
      data,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('Upload API route error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'File upload failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
