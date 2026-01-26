const https = require('https');

const API_KEY = '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk';
const API_BASE = 'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod';

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    const options = {
      hostname: 'dxpsn25dt0.execute-api.us-east-2.amazonaws.com',
      path: '/Prod' + path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    };

    if (postData) {
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ statusCode: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 API Test Suite\n');
  console.log('='.repeat(60));

  try {
    // Test 1: GET all items
    console.log('\n1️⃣  Testing GET /items (List All)');
    const listResult = await makeRequest('GET', '/items');
    console.log('   Status:', listResult.statusCode);
    if (listResult.statusCode === 200) {
      const count = listResult.data.count || listResult.data.items?.length || 0;
      console.log('   ✅ Success - Retrieved', count, 'items');
    } else {
      console.log('   ❌ Failed:', listResult.data);
    }

    if (listResult.data.items && listResult.data.items.length > 0) {
      const testId = listResult.data.items[0].id;

      // Test 2: GET specific item
      console.log('\n2️⃣  Testing GET /items/{id}');
      const getResult = await makeRequest('GET', '/items/' + testId);
      console.log('   Status:', getResult.statusCode);
      if (getResult.statusCode === 200) {
        const name = getResult.data.item?.name || getResult.data.name || 'Unknown';
        console.log('   ✅ Success - Retrieved item:', name);
      } else {
        console.log('   ❌ Failed:', getResult.data);
      }

      // Test 3: Error handling
      console.log('\n3️⃣  Testing GET /items/{invalid-id} (Error Handling)');
      const errorResult = await makeRequest('GET', '/items/invalid-id-123');
      console.log('   Status:', errorResult.statusCode);
      if (errorResult.statusCode === 404) {
        console.log('   ✅ Success - Correctly returns 404 for invalid ID');
      } else {
        console.log('   ⚠️  Unexpected status:', errorResult.statusCode);
      }

      // Test 4: PUT update
      console.log('\n4️⃣  Testing PUT /items/{id} (Update)');
      const updateData = { name: 'Test Update', lat: '40.7128', lng: '-74.0060' };
      const updateResult = await makeRequest('PUT', '/items/' + testId, updateData);
      console.log('   Status:', updateResult.statusCode);
      if (updateResult.statusCode === 200) {
        console.log('   ✅ Success - Item updated');
      } else {
        console.log('   ❌ Failed:', updateResult.data);
      }
    }

    // Test 5: API Key authentication
    console.log('\n5️⃣  Testing API Key Authentication (Missing Key)');
    await new Promise((resolve) => {
      const noKeyReq = https.request({
        hostname: 'dxpsn25dt0.execute-api.us-east-2.amazonaws.com',
        path: '/Prod/items',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }, (res) => {
        let data = '';
        res.on('data', (c) => data += c);
        res.on('end', () => {
          console.log('   Status:', res.statusCode);
          if (res.statusCode === 403) {
            console.log('   ✅ Success - Correctly rejects requests without API key');
          } else {
            console.log('   ⚠️  Unexpected status:', res.statusCode);
          }
          resolve();
        });
      });
      noKeyReq.on('error', () => resolve());
      noKeyReq.end();
    });

  } catch (error) {
    console.error('\n❌ Test error:', error);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ API tests completed!');
}

runTests();
