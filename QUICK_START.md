# Quick Start: Using the Secured API

## API Key Required

All requests now require an API key in the `x-api-key` header.

**API Key:** `2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk`

## Quick Examples

### cURL
```bash
curl -H "x-api-key: 2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk" \
     https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items
```

### JavaScript (fetch)
```javascript
fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
  headers: {
    'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk'
  }
})
```

### Python
```python
import requests

headers = {'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk'}
response = requests.get(
    'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items',
    headers=headers
)
```

## All Endpoints

- **GET** `/items` - List all items
- **GET** `/items/{id}` - Get item by ID
- **POST** `/items` - Create item
- **PUT** `/items/{id}` - Update item
- **DELETE** `/items/{id}` - Delete item

## Base URL
```
https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod
```

## Need More Details?

See `MIGRATION_GUIDE.md` for detailed migration instructions for your specific technology stack.
