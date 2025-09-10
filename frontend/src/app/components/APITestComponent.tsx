'use client';

import { useState } from 'react';
import { 
  uploadFileViaAPI, 
  summarizeViaAPI, 
  askQuestionViaAPI, 
  checkAPIHealth 
} from '../utils/client-api';
import { 
  uploadFile, 
  summarizeText, 
  askQuestion, 
  checkBackendHealth 
} from '../utils/api';

export default function APITestComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [question, setQuestion] = useState('');
  const [results, setResults] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (useNextAPI: boolean = true) => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result;
      if (useNextAPI) {
        // Use Next.js API route
        result = await uploadFileViaAPI(file);
      } else {
        // Use direct backend API
        result = await uploadFile(file);
      }
      
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async (type: 'brief' | 'detailed', useNextAPI: boolean = true) => {
    if (!text.trim()) {
      setError('Please enter text to summarize');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result;
      if (useNextAPI) {
        // Use Next.js API route
        result = await summarizeViaAPI(text, type);
      } else {
        // Use direct backend API
        result = await summarizeText(text, type);
      }
      
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Summarization failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (useNextAPI: boolean = true) => {
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result;
      if (useNextAPI) {
        // Use Next.js API route
        result = await askQuestionViaAPI(question, text);
      } else {
        // Use direct backend API
        result = await askQuestion(question, text);
      }
      
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Question failed');
    } finally {
      setLoading(false);
    }
  };

  const handleHealthCheck = async (useNextAPI: boolean = true) => {
    setLoading(true);
    setError(null);

    try {
      let result;
      if (useNextAPI) {
        // Use Next.js API route
        result = await checkAPIHealth();
      } else {
        // Use direct backend API
        result = await checkBackendHealth();
      }
      
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Health check failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Test Component</h1>
      
      {/* File Upload Section */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">File Upload</h2>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <div className="space-x-2">
          <button 
            onClick={() => handleFileUpload(true)}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Upload via Next.js API
          </button>
          <button 
            onClick={() => handleFileUpload(false)}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Upload via Direct API
          </button>
        </div>
      </div>

      {/* Text Summarization Section */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">Text Summarization</h2>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to summarize..."
          className="w-full p-2 border rounded mb-3"
          rows={4}
        />
        <div className="space-x-2 mb-2">
          <button 
            onClick={() => handleSummarize('brief', true)}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Brief Summary (Next.js)
          </button>
          <button 
            onClick={() => handleSummarize('detailed', true)}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Detailed Summary (Next.js)
          </button>
        </div>
        <div className="space-x-2">
          <button 
            onClick={() => handleSummarize('brief', false)}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Brief Summary (Direct)
          </button>
          <button 
            onClick={() => handleSummarize('detailed', false)}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Detailed Summary (Direct)
          </button>
        </div>
      </div>

      {/* Ask Question Section */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">Ask Question</h2>
        <input 
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question..."
          className="w-full p-2 border rounded mb-3"
        />
        <div className="space-x-2">
          <button 
            onClick={() => handleAskQuestion(true)}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Ask via Next.js API
          </button>
          <button 
            onClick={() => handleAskQuestion(false)}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Ask via Direct API
          </button>
        </div>
      </div>

      {/* Health Check Section */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">Health Check</h2>
        <div className="space-x-2">
          <button 
            onClick={() => handleHealthCheck(true)}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Check via Next.js API
          </button>
          <button 
            onClick={() => handleHealthCheck(false)}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Check Direct Backend
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-700">Loading...</p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {/* Results Display */}
      {results && (
        <div className="p-4 bg-gray-50 border rounded">
          <h3 className="text-lg font-semibold mb-2">Results:</h3>
          <pre className="bg-white p-4 rounded border overflow-auto text-sm">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
