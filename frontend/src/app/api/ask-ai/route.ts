import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

// POST handler for asking questions to AI
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, context } = body;

    // Validate required fields
    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Forward request to backend
    const backendResponse = await fetch(`${BACKEND_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        context,
      }),
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend error: ${backendResponse.status}`);
    }

    const data = await backendResponse.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET handler for health check
export async function GET() {
  try {
    const backendResponse = await fetch(`${BACKEND_URL}/`);
    
    if (!backendResponse.ok) {
      throw new Error(`Backend unreachable: ${backendResponse.status}`);
    }
    
    const data = await backendResponse.json();
    
    return NextResponse.json({
      status: 'ok',
      backend: data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        error: 'Backend unreachable',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}