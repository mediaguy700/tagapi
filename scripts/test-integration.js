const https = require('https');

const API_BASE = 'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod';
let createdItemId = null;

const API_KEY = process.env.API_KEY || '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk';

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    
    const options = {
      hostname: 'dxpsn25dt0.execute-api.us-east-2.amazonaws.com',
      path: `/Prod${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
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
          resolve({
            statusCode: res.statusCode,
            data: parsed
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing API Integration\n');
  console.log('='.repeat(60));

  try {
    // Test 1: CREATE
    console.log('\n1️⃣  Testing CREATE endpoint (POST /items)');
    const createData = {
      name: 'Integration Test Item',
      lat: '40.7128',
      lng: '-74.0060',
      floor: '3',
      Status: 'active'
    };
    const createResult = await makeRequest('POST', '/items', createData);
    console.log(`   Status: ${createResult.statusCode}`);
    if (createResult.statusCode === 200 && createResult.data.item) {
      createdItemId = createResult.data.item.id;
      console.log(`   ✅ Created item with ID: ${createdItemId}`);
      console.log(`   Item data:`, JSON.stringify(createResult.data.item, null, 2));
    } else {
      console.log(`   ❌ Failed:`, createResult.data);
      return;
    }

    // Test 2: GET
    console.log('\n2️⃣  Testing GET endpoint (GET /items/{id})');
    const getResult = await makeRequest('GET', `/items/${createdItemId}`);
    console.log(`   Status: ${getResult.statusCode}`);
    if (getResult.statusCode === 200 && getResult.data.item) {
      console.log(`   ✅ Retrieved item successfully`);
      console.log(`   Item:`, JSON.stringify(getResult.data.item, null, 2));
    } else {
      console.log(`   ❌ Failed:`, getResult.data);
    }

    // Test 3: LIST
    console.log('\n3️⃣  Testing LIST endpoint (GET /items)');
    const listResult = await makeRequest('GET', '/items');
    console.log(`   Status: ${listResult.statusCode}`);
    if (listResult.statusCode === 200 && listResult.data.items) {
      console.log(`   ✅ Retrieved ${listResult.data.count} item(s)`);
      console.log(`   Items:`, JSON.stringify(listResult.data.items, null, 2));
    } else {
      console.log(`   ❌ Failed:`, listResult.data);
    }

    // Test 4: UPDATE
    console.log('\n4️⃣  Testing UPDATE endpoint (PUT /items/{id})');
    const updateData = {
      name: 'Updated Integration Test Item',
      lat: '40.7580',
      lng: '-73.9855',
      floor: '5',
      Status: 'inactive'
    };
    const updateResult = await makeRequest('PUT', `/items/${createdItemId}`, updateData);
    console.log(`   Status: ${updateResult.statusCode}`);
    if (updateResult.statusCode === 200 && updateResult.data.item) {
      console.log(`   ✅ Updated item successfully`);
      console.log(`   Updated item:`, JSON.stringify(updateResult.data.item, null, 2));
    } else {
      console.log(`   ❌ Failed:`, updateResult.data);
    }

    // Test 5: DELETE
    console.log('\n5️⃣  Testing DELETE endpoint (DELETE /items/{id})');
    const deleteResult = await makeRequest('DELETE', `/items/${createdItemId}`);
    console.log(`   Status: ${deleteResult.statusCode}`);
    if (deleteResult.statusCode === 200) {
      console.log(`   ✅ Deleted item successfully`);
      console.log(`   Response:`, JSON.stringify(deleteResult.data, null, 2));
    } else {
      console.log(`   ❌ Failed:`, deleteResult.data);
    }

    // Verify deletion
    console.log('\n6️⃣  Verifying deletion (GET /items/{id})');
    const verifyResult = await makeRequest('GET', `/items/${createdItemId}`);
    console.log(`   Status: ${verifyResult.statusCode}`);
    if (verifyResult.statusCode === 404) {
      console.log(`   ✅ Item successfully deleted (404 as expected)`);
    } else {
      console.log(`   ⚠️  Unexpected response:`, verifyResult.data);
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ Integration tests completed!');

  } catch (error) {
    console.error('\n❌ Test failed with error:', error);
    process.exit(1);
  }
}

runTests();
