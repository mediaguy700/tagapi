# Migration Guide: Updating Applications to Use API Key

## Overview

The API now requires an API key for all requests. You need to add the `x-api-key` header to all API calls.

## API Key

**API Key:** `2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk`

## Base URL

```
https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod
```

## Step-by-Step Migration

### 1. JavaScript/TypeScript (Browser or Node.js)

#### Before (No API Key):
```javascript
fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
```

#### After (With API Key):
```javascript
const API_KEY = '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk';

fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
})
```

#### Using Environment Variables (Recommended):
```javascript
// .env file
// API_KEY=2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk

// In your code
const API_KEY = process.env.API_KEY || import.meta.env.VITE_API_KEY;

fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
})
```

### 2. Axios (JavaScript/TypeScript)

#### Before:
```javascript
import axios from 'axios';

axios.get('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items')
```

#### After:
```javascript
import axios from 'axios';

const API_KEY = '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk';

// Option 1: Per request
axios.get('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
  headers: {
    'x-api-key': API_KEY
  }
})

// Option 2: Global interceptor (recommended)
axios.defaults.headers.common['x-api-key'] = API_KEY;
axios.get('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items')
```

### 3. Python (requests library)

#### Before:
```python
import requests

response = requests.get(
    'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items'
)
```

#### After:
```python
import requests
import os

API_KEY = os.getenv('API_KEY', '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk')

headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
}

response = requests.get(
    'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items',
    headers=headers
)
```

### 4. Python (with Session - Recommended)

```python
import requests
import os

API_KEY = os.getenv('API_KEY', '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk')

session = requests.Session()
session.headers.update({
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
})

# All requests will automatically include the API key
response = session.get('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items')
response = session.post('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', json={...})
```

### 5. cURL

#### Before:
```bash
curl https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items
```

#### After:
```bash
curl -H "x-api-key: 2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk" \
     https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items
```

### 6. Postman

1. Open your request in Postman
2. Go to the **Headers** tab
3. Add a new header:
   - **Key:** `x-api-key`
   - **Value:** `2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk`
4. Save the request

### 7. React Application

```javascript
// utils/api.js
const API_BASE = 'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod';
const API_KEY = process.env.REACT_APP_API_KEY || '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk';

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...options.headers,
    },
  });
  return response.json();
};

// Usage in component
import { apiRequest } from './utils/api';

const MyComponent = () => {
  useEffect(() => {
    const fetchItems = async () => {
      const data = await apiRequest('/items');
      console.log(data);
    };
    fetchItems();
  }, []);
};
```

### 8. Vue.js Application

```javascript
// services/api.js
import axios from 'axios';

const API_BASE = 'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod';
const API_KEY = import.meta.env.VITE_API_KEY || '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
});

export default apiClient;

// Usage in component
import apiClient from '@/services/api';

export default {
  async mounted() {
    const response = await apiClient.get('/items');
    console.log(response.data);
  },
};
```

### 9. Angular Application

```typescript
// services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBase = 'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod';
  private apiKey = environment.apiKey || '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    });
  }

  getItems() {
    return this.http.get(`${this.apiBase}/items`, { headers: this.getHeaders() });
  }
}
```

### 10. Swift (iOS)

```swift
let apiKey = "2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk"
let url = URL(string: "https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items")!

var request = URLRequest(url: url)
request.setValue(apiKey, forHTTPHeaderField: "x-api-key")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")

URLSession.shared.dataTask(with: request) { data, response, error in
    // Handle response
}.resume()
```

### 11. Kotlin (Android)

```kotlin
val apiKey = "2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk"
val url = "https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items"

val client = OkHttpClient()
val request = Request.Builder()
    .url(url)
    .addHeader("x-api-key", apiKey)
    .addHeader("Content-Type", "application/json")
    .build()

client.newCall(request).enqueue(object : Callback {
    override fun onResponse(call: Call, response: Response) {
        // Handle response
    }
    override fun onFailure(call: Call, e: IOException) {
        // Handle error
    }
})
```

## Common Errors and Solutions

### Error: 403 Forbidden
**Cause:** Missing or invalid API key  
**Solution:** Ensure the `x-api-key` header is included with the correct value

### Error: 429 Too Many Requests
**Cause:** Rate limit exceeded  
**Solution:** You've exceeded 5 requests/second. Implement request throttling or caching.

### Error: CORS issues
**Cause:** Browser blocking the request  
**Solution:** The API supports CORS. Ensure you're including the `x-api-key` header in your CORS preflight request.

## Testing Your Changes

Test your updated application with this simple request:

```bash
curl -H "x-api-key: 2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk" \
     https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items
```

You should receive a JSON response with your items.

## Security Best Practices

1. **Never hardcode API keys in client-side code** - Use environment variables
2. **Use environment variables** - Store keys in `.env` files (and add `.env` to `.gitignore`)
3. **Rotate keys if exposed** - If a key is accidentally committed, generate a new one
4. **Use HTTPS only** - Never make API calls over HTTP

## Quick Checklist

- [ ] Add `x-api-key` header to all API requests
- [ ] Store API key in environment variables (not in code)
- [ ] Test all endpoints (GET, POST, PUT, DELETE)
- [ ] Update documentation for your team
- [ ] Verify error handling for 403/429 responses
