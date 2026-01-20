# AWS API with DynamoDB CRUD Operations

This project provides a complete AWS API implementation with CRUD (Create, Read, Update, Delete) operations on DynamoDB using AWS Lambda and API Gateway.

## Architecture

- **AWS Lambda**: Serverless functions for each CRUD operation
- **API Gateway**: RESTful API endpoints
- **DynamoDB**: NoSQL database for storing items
- **AWS SAM**: Infrastructure as Code for deployment

## Project Structure

```
.
├── src/
│   ├── create.ts          # Create item Lambda function
│   ├── get.ts             # Get item Lambda function
│   ├── update.ts          # Update item Lambda function
│   ├── delete.ts          # Delete item Lambda function
│   ├── list.ts            # List items Lambda function
│   ├── types.ts           # TypeScript type definitions
│   └── utils/
│       ├── dynamodb.ts    # DynamoDB client setup
│       └── response.ts    # API response utilities
├── template.yaml          # AWS SAM template
├── package.json           # Node.js dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## API Endpoints

### Create Item
- **Method**: `POST`
- **Path**: `/items`
- **Body**:
  ```json
  {
    "name": "Item Name",
    "description": "Item description",
    "lat": "40.7128",  // Latitude as string (optional)
    "long": "-74.0060", // Longitude as string (optional)
    "beaconid": "optional-custom-beaconid" // Auto-generated if not provided
  }
  ```

### Get Item
- **Method**: `GET`
- **Path**: `/items/{beaconid}`
- **Response**: Returns the item with the specified beacon ID

### Update Item
- **Method**: `PUT`
- **Path**: `/items/{beaconid}`
- **Body**:
  ```json
  {
    "name": "Updated Name",
    "description": "Updated description",
    "lat": "40.7128",  // Latitude as string (optional)
    "long": "-74.0060" // Longitude as string (optional)
  }
  ```

### Delete Item
- **Method**: `DELETE`
- **Path**: `/items/{beaconid}`
- **Response**: Confirms deletion

### List Items
- **Method**: `GET`
- **Path**: `/items`
- **Query Parameters**:
  - `limit`: Maximum number of items to return (optional)
  - `lastKey`: Pagination token for next page (optional)

## Prerequisites

1. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```

2. **AWS SAM CLI** installed
   ```bash
   # macOS
   brew install aws-sam-cli
   
   # Or follow instructions at: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
   ```

3. **Node.js** (v20.x or later) and npm

## Setup and Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build TypeScript**:
   ```bash
   npm run build
   ```

## Deployment

1. **Build the SAM application**:
   ```bash
   sam build
   ```

2. **Deploy to AWS** (guided mode for first deployment):
   ```bash
   sam deploy --guided
   ```
   
   This will prompt you for:
   - Stack name
   - AWS Region
   - Confirm changes before deploy
   - Allow SAM CLI IAM role creation
   - Disable rollback
   - Save arguments to configuration file

3. **After deployment**, you'll receive an API Gateway URL in the outputs.

## Testing the API

After deployment, you can test the API using curl or any HTTP client:

### Create an item:
```bash
curl -X POST https://YOUR_API_URL/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item", "description": "This is a test", "lat": "40.7128", "long": "-74.0060"}'
```

### Get an item:
```bash
curl https://YOUR_API_URL/items/{beaconid}
```

### Update an item:
```bash
curl -X PUT https://YOUR_API_URL/items/{beaconid} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'
```

### Delete an item:
```bash
curl -X DELETE https://YOUR_API_URL/items/{beaconid}
```

### List all items:
```bash
curl https://YOUR_API_URL/items
```

## Local Development

You can test Lambda functions locally using SAM:

```bash
# Start local API
sam local start-api

# Test a specific function
sam local invoke CreateItemFunction -e events/create-event.json
```

## DynamoDB Table

The DynamoDB table is automatically created with:
- **Table Name**: `tagalong`
- **Partition Key**: `beaconid` (String)
- **Billing Mode**: Pay per request (no capacity planning needed)

## Response Format

All API responses follow this format:

**Success**:
```json
{
  "message": "Operation message",
  "item": { ... } // or "items": [ ... ]
}
```

**Error**:
```json
{
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Cleanup

To delete all AWS resources:

```bash
sam delete
```

## License

ISC
