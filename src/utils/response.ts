import { ApiResponse } from '../types';

export const createResponse = (
  statusCode: number,
  body: any,
  headers: Record<string, string> = {}
): ApiResponse => {
  const responseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    ...headers,
  };
  
  // Remove undefined values
  Object.keys(responseHeaders).forEach(key => {
    if (responseHeaders[key] === undefined) {
      delete responseHeaders[key];
    }
  });

  return {
    statusCode,
    headers: responseHeaders,
    body: JSON.stringify(body),
  };
};

export const successResponse = (data: any): ApiResponse => {
  return createResponse(200, data);
};

export const errorResponse = (statusCode: number, message: string, error?: any): ApiResponse => {
  return createResponse(statusCode, {
    message,
    error: error?.message || error,
  });
};
