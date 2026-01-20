import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient, TABLE_NAME } from '../src/utils/dynamodb';

async function insertTestRecord() {
  try {
    const testRecord = {
      beaconid: `beacon-test-${Date.now()}`,
      name: 'Test Beacon',
      description: 'This is a test record inserted via script',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      location: 'Test Location',
    };

    console.log('Inserting test record...');
    console.log('Table:', TABLE_NAME);
    console.log('Record:', JSON.stringify(testRecord, null, 2));

    await dynamoClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: testRecord,
      })
    );

    console.log('\n✅ Test record inserted successfully!');
    console.log(`Beacon ID: ${testRecord.beaconid}`);
  } catch (error) {
    console.error('❌ Error inserting test record:', error);
    process.exit(1);
  }
}

insertTestRecord();
