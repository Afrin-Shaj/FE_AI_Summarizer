// API utility functions for communicating with the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// File upload function
export async function uploadFile(file: File): Promise<{
  filename: string;
  content_type: string;
  size: number;
}> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }
  
  return await response.json();
}

// Text summarization function
export async function summarizeText(
  text: string,
  summaryType: 'brief' | 'detailed' = 'brief'
): Promise<{
  summary: string;
  original_length: number;
  summary_length: number;
  summary_type: string;
}> {
  return apiRequest('/summarize', {
    method: 'POST',
    body: JSON.stringify({
      text,
      summary_type: summaryType,
    }),
  });
}

// Ask question function
export async function askQuestion(
  question: string,
  context?: string
): Promise<{
  question: string;
  answer: string;
  confidence: number;
  context_used: boolean;
}> {
  return apiRequest('/ask', {
    method: 'POST',
    body: JSON.stringify({
      question,
      context,
    }),
  });
}

// Health check function
export async function checkBackendHealth(): Promise<{ message: string }> {
  return apiRequest('/');
}