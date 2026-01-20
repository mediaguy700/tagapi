# Exact Changes Needed in Your Application

## The Only Change Required

Add the `x-api-key` header to ALL API requests.

## Step-by-Step Instructions

### Step 1: Find Your API Call

Look for code that makes requests to:
```
https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items
```

This is likely in a file like:
- `people-tracker.js` (based on your error)
- `main.js`
- `api.js`
- Or wherever you're making fetch/axios/XMLHttpRequest calls

### Step 2: Add the API Key Header

Find this code pattern and add the header:

#### If Using `fetch()`:

**BEFORE:**
```javascript
fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items')
```

**AFTER:**
```javascript
fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
  headers: {
    'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk',
    'Content-Type': 'application/json'
  }
})
```

#### If Using `fetch()` with Options Already:

**BEFORE:**
```javascript
fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
```

**AFTER:**
```javascript
fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk'  // ADD THIS LINE
  }
})
```

#### If Using Axios:

**BEFORE:**
```javascript
axios.get('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items')
```

**AFTER:**
```javascript
axios.get('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
  headers: {
    'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk'
  }
})
```

#### If Using XMLHttpRequest:

**BEFORE:**
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();
```

**AFTER:**
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('x-api-key', '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk');  // ADD THIS LINE
xhr.send();
```

## Complete Example Based on Your Error

Based on your error mentioning `people-tracker.js`, here's what your code should look like:

### In `people-tracker.js`:

**BEFORE (what you probably have now):**
```javascript
async function fetchPeopleLocations() {
  const response = await fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items');
  const data = await response.json();
  return data;
}
```

**AFTER (what you need):**
```javascript
async function fetchPeopleLocations() {
  const response = await fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
    headers: {
      'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk',
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}
```

## Better: Create a Reusable Function

Instead of adding the header everywhere, create one function:

### Create `api.js` or add to your existing file:

```javascript
const API_KEY = '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk';
const API_BASE = 'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod';

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...options.headers,  // Allow overriding headers if needed
    },
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

// Export for use in other files
// If using modules:
export { apiRequest };

// If not using modules, make it global:
window.apiRequest = apiRequest;
```

### Then in `people-tracker.js`:

**BEFORE:**
```javascript
const response = await fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items');
const data = await response.json();
```

**AFTER:**
```javascript
// If using modules:
import { apiRequest } from './api.js';

// Or if global:
// (no import needed)

const data = await apiRequest('/items');
```

## Quick Checklist

- [ ] Find all places where you call the API URL
- [ ] Add `'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk'` to headers
- [ ] Test the application
- [ ] Check browser console for errors

## Exact Header Format

**Header Name:** `x-api-key` (lowercase, with hyphen)  
**Header Value:** `2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk`

**Important:**
- Header name is case-sensitive: use `x-api-key` not `X-API-Key`
- Must be in the `headers` object
- Must be included in EVERY request (GET, POST, PUT, DELETE)

## Testing After Changes

1. Save your file
2. Refresh your browser (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)
3. Open browser DevTools (F12)
4. Go to Network tab
5. Make your API request
6. Click on the request
7. Check "Request Headers" - you should see `x-api-key`
8. Check "Response" - should return 200 with data

## If You Still Get Errors

1. **Check the Network tab:**
   - Does the request show `x-api-key` in Request Headers?
   - What's the status code? (should be 200, not 403)

2. **Check the Console:**
   - Any specific error messages?
   - Copy the exact error and share it

3. **Verify the API key:**
   - Make sure there are no extra spaces
   - Make sure it's the exact value: `2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk`

## Summary

**The ONLY change you need to make:**

Add this one line to your headers:
```javascript
'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk'
```

That's it! Everything else stays the same.
