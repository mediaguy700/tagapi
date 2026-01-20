export interface Item {
  beaconid: string;
  name: string;
  description?: string;
  lat?: string; // Latitude as string
  long?: string; // Longitude as string
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any; // Allow additional fields
}

export interface ApiResponse {
  statusCode: number;
  headers: {
    'Content-Type': string;
    'Access-Control-Allow-Origin': string;
  };
  body: string;
}
