const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const dynamoClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME || 'tagalong';

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
    if (error.name === 'ResourceNotFoundException') {
      console.error('\n⚠️  Table "tagalong" not found. Make sure:');
      console.error('   1. The table exists in your AWS account');
      console.error('   2. You have the correct AWS credentials configured');
      console.error('   3. You are in the correct AWS region');
    }
    process.exit(1);
  }
}

insertTestRecord();
