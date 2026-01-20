import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient, TABLE_NAME } from './utils/dynamodb';
import { successResponse, errorResponse } from './utils/response';
import { Item } from './types';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return errorResponse(400, 'Request body is required');
    }

    const body = JSON.parse(event.body);
    const { name, lat, lng, floor, timestamp, Status, ...otherFields } = body;

    if (!name) {
      return errorResponse(400, 'Name is required');
    }

    const id = body.id || `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    const item: Item = {
      id,
      name,
      lat: lat || undefined,
      lng: lng || undefined,
      floor: floor || undefined,
      timestamp: timestamp || now,
      Status: Status || undefined,
      ...otherFields,
    };

    await dynamoClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );

    return successResponse({
      message: 'Item created successfully',
      item,
    });
  } catch (error) {
    console.error('Error creating item:', error);
    return errorResponse(500, 'Failed to create item', error);
  }
};
