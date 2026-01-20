#!/bin/bash

# Generate a unique beacon ID with timestamp
BEACON_ID="beacon-test-$(date +%s)"
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Create the JSON payload
cat > /tmp/test-record.json <<EOF
{
  "beaconid": {
    "S": "${BEACON_ID}"
  },
  "name": {
    "S": "Test Beacon"
  },
  "description": {
    "S": "This is a test record inserted via script"
  },
  "createdAt": {
    "S": "${TIMESTAMP}"
  },
  "updatedAt": {
    "S": "${TIMESTAMP}"
  },
  "status": {
    "S": "active"
  },
  "location": {
    "S": "Test Location"
  }
}
EOF

echo "Inserting test record into tagalong table..."
echo "Beacon ID: ${BEACON_ID}"
echo ""

# Insert the record
aws dynamodb put-item \
  --table-name tagalong \
  --item file:///tmp/test-record.json \
  --return-consumed-capacity TOTAL

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Test record inserted successfully!"
  echo "Beacon ID: ${BEACON_ID}"
else
  echo ""
  echo "❌ Failed to insert test record"
  exit 1
fi
