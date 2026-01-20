import { ApiResponse } from '../types';

export const createResponse = (
  statusCode: number,
  body: any,
  headers: Record<string, string> = {}
): ApiResponse => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...headers,
    },
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
