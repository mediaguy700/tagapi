export interface Item {
  id: string;
  name: string;
  lat?: string; // Latitude as string
  lng?: string; // Longitude as string
  floor?: string;
  timestamp?: string;
  Status?: string;
  [key: string]: any; // Allow additional fields
}

export interface ApiResponse {
  statusCode: number;
  headers: {
    [key: string]: string;
  };
  body: string;
}
