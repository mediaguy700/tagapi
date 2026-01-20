import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DeleteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
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

    // First check if item exists
    const getResult = await dynamoClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    if (!getResult.Item) {
      return errorResponse(404, 'Item not found');
    }

    await dynamoClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    return successResponse({
      message: 'Item deleted successfully',
      id,
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    return errorResponse(500, 'Failed to delete item', error);
  }
};
