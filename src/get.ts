import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient, TABLE_NAME } from './utils/dynamodb';
import { successResponse, errorResponse } from './utils/response';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return errorResponse(400, 'ID is required');
    }

    const result = await dynamoClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    if (!result.Item) {
      return errorResponse(404, 'Item not found');
    }

    return successResponse({
      item: result.Item,
    });
  } catch (error) {
    console.error('Error getting item:', error);
    return errorResponse(500, 'Failed to get item', error);
  }
};
