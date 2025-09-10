// Type definitions for API responses and requests

// Backend API Types
export interface BackendUploadResponse {
  filename: string;
  content_type: string;
  size: number;
}

export interface BackendSummarizeRequest {
  text: string;
  summary_type: 'brief' | 'detailed';
}

export interface BackendSummarizeResponse {
  summary: string;
  original_length: number;
  summary_length: number;
  summary_type: string;
}

export interface BackendAskRequest {
  question: string;
  context?: string;
}

export interface BackendAskResponse {
  question: string;
  answer: string;
  confidence: number;
  context_used: boolean;
}

export interface BackendHealthResponse {
  message: string;
}

// Frontend API Types (Next.js routes)
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
  details?: string;
}

export interface APIHealthResponse {
  status: string;
  backend?: BackendHealthResponse;
  timestamp: string;
  error?: string;
}

// Error Types
export interface APIError {
  error: string;
  details?: string;
  status?: number;
}

// Request Types
export interface SummarizeRequest {
  text: string;
  summary_type?: 'brief' | 'detailed';
}

export interface AskQuestionRequest {
  question: string;
  context?: string;
}

// File Upload Types
export interface FileUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadedFile {
  filename: string;
  content_type: string;
  size: number;
  upload_date?: string;
}

// API Configuration
export interface APIConfig {
  baseURL: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

// Service Status Types
export type ServiceStatus = 'ready' | 'unavailable' | 'error' | 'loading';

export interface ServiceHealth {
  status: ServiceStatus;
  service: string;
  timestamp: string;
  error?: string;
}
