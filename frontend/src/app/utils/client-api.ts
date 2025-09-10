// Client-side API functions that use Next.js API routes
// These functions are meant to be used from React components

// Type definitions
interface UploadResponse {
  filename: string;
  content_type: string;
  size: number;
}

interface SummarizeResponse {
  summary: string;
  original_length: number;
  summary_length: number;
  summary_type: string;
}

interface HealthResponse {
  message: string;
}

// Upload file using Next.js API route
export async function uploadFileViaAPI(file: File): Promise<{
  success: boolean;
  data?: UploadResponse;
  message: string;
  error?: string;
}> {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    console.error('Upload via API failed:', error);
    return {
      success: false,
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Summarize text using Next.js API route
export async function summarizeViaAPI(
  text: string,
  summaryType: 'brief' | 'detailed' = 'brief'
): Promise<{
  success: boolean;
  data?: SummarizeResponse;
  message: string;
  error?: string;
}> {
  try {
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        summary_type: summaryType,
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Summarize via API failed:', error);
    return {
      success: false,
      message: 'Summarization failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Ask question using Next.js API route
export async function askQuestionViaAPI(
  question: string,
  context?: string
): Promise<{
  question?: string;
  answer?: string;
  confidence?: number;
  context_used?: boolean;
  error?: string;
}> {
  try {
    const response = await fetch('/api/ask-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        context,
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Ask question via API failed:', error);
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Health check using Next.js API route
export async function checkAPIHealth(): Promise<{
  status: string;
  backend?: HealthResponse;
  timestamp: string;
  error?: string;
}> {
  try {
    const response = await fetch('/api/ask-ai', {
      method: 'GET',
    });
    
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    return {
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Generic API call helper
export async function callAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }
  
  return await response.json();
}
