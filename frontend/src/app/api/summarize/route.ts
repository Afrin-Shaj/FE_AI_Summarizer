import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

// POST handler for text summarization
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, summary_type = 'brief' } = body;

    // Validate required fields
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required for summarization' },
        { status: 400 }
      );
    }

    // Validate summary_type
    if (!['brief', 'detailed'].includes(summary_type)) {
      return NextResponse.json(
        { error: 'summary_type must be either "brief" or "detailed"' },
        { status: 400 }
      );
    }

    // Forward request to backend
    const backendResponse = await fetch(`${BACKEND_URL}/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        summary_type,
      }),
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend error: ${backendResponse.status}`);
    }

    const data = await backendResponse.json();
    
    return NextResponse.json({
      success: true,
      data,
      message: 'Text summarized successfully',
    });
  } catch (error) {
    console.error('Summarize API route error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Summarization failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET handler to check summarization service status
export async function GET() {
  try {
    const backendResponse = await fetch(`${BACKEND_URL}/`);
    
    if (!backendResponse.ok) {
      throw new Error(`Backend unreachable: ${backendResponse.status}`);
    }
    
    return NextResponse.json({
      status: 'ready',
      service: 'text-summarization',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Summarization service check failed:', error);
    return NextResponse.json(
      { 
        status: 'unavailable', 
        service: 'text-summarization',
        error: 'Backend unreachable',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
