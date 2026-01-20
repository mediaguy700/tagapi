# API Security Guide

## API Key Authentication

The API is secured with API Key authentication. All endpoints require a valid API key to access.

## API Key

**API Key ID:** `kmskg1kh6g`  
**API Key Value:** `2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk`

⚠️ **IMPORTANT:** Keep your API key secure and never commit it to version control!

## Usage Plan Limits

- **Rate Limit:** 5 requests per second
- **Burst Limit:** 10 requests
- **Monthly Quota:** 10,000 requests per month

## How to Use the API Key

### HTTP Header (Recommended)

Include the API key in the `x-api-key` header:

```bash
curl -X GET https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items \
  -H "x-api-key: 2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk"
```

### JavaScript/Node.js

```javascript
fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
  headers: {
    'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk',
    'Content-Type': 'application/json'
  }
});
```

### Python

```python
import requests

headers = {
    'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items',
    headers=headers
)
```

## Error Responses

### Missing API Key (403 Forbidden)
```json
{
  "message": "Forbidden"
}
```

### Invalid API Key (403 Forbidden)
```json
{
  "message": "Forbidden"
}
```

### Rate Limit Exceeded (429 Too Many Requests)
```json
{
  "message": "Too Many Requests"
}
```

## Retrieving the API Key

If you need to retrieve the API key value again:

```bash
aws apigateway get-api-key \
  --api-key kmskg1kh6g \
  --include-value \
  --region us-east-2
```

## Security Best Practices

1. **Never expose API keys in client-side code** - Use environment variables or secure configuration
2. **Rotate API keys regularly** - Generate new keys and update applications
3. **Monitor usage** - Check CloudWatch metrics for unusual activity
4. **Use HTTPS only** - All API calls must use HTTPS
5. **Store keys securely** - Use AWS Secrets Manager or environment variables

## CORS Configuration

The API supports CORS with the following headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, X-API-Key`
