const https = require('https');

const API_URL = 'https://fg559se7ok.execute-api.us-east-1.amazonaws.com/Prod/items';

const testRecord = {
  name: 'Test Beacon with Location',
  lat: '40.7128',
  lng: '-74.0060',
  floor: '1',
  timestamp: new Date().toISOString(),
  Status: 'active'
};

const postData = JSON.stringify(testRecord);

const options = {
  hostname: 'fg559se7ok.execute-api.us-east-1.amazonaws.com',
  path: '/Prod/items',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Submitting test record to API...');
console.log('Record:', JSON.stringify(testRecord, null, 2));
console.log('');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Response:', data);
    
    if (res.statusCode === 200 || res.statusCode === 201) {
      try {
        const response = JSON.parse(data);
        console.log('\n✅ Test record submitted successfully!');
        if (response.item) {
          console.log(`ID: ${response.item.id}`);
        }
      } catch (e) {
        console.log('\n✅ Test record submitted successfully!');
      }
    } else {
      console.error('\n❌ Failed to submit test record');
      try {
        const error = JSON.parse(data);
        console.error('Error:', error);
      } catch (e) {
        console.error('Error response:', data);
      }
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error);
  process.exit(1);
});

req.write(postData);
req.end();
