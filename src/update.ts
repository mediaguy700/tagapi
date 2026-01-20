import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient, TABLE_NAME } from './utils/dynamodb';
import { successResponse, errorResponse } from './utils/response';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const beaconid = event.pathParameters?.beaconid;

    if (!beaconid) {
      return errorResponse(400, 'Beacon ID is required');
    }

    if (!event.body) {
      return errorResponse(400, 'Request body is required');
    }

    const body = JSON.parse(event.body);
    const { beaconid: bodyBeaconId, createdAt, ...updateFields } = body;

    // Remove undefined values
    const updateExpressionParts: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    Object.keys(updateFields).forEach((key, index) => {
      if (updateFields[key] !== undefined) {
        const nameKey = `#attr${index}`;
        const valueKey = `:val${index}`;
        updateExpressionParts.push(`${nameKey} = ${valueKey}`);
        expressionAttributeNames[nameKey] = key;
        expressionAttributeValues[valueKey] = updateFields[key];
      }
    });

    // Always update the updatedAt timestamp
    updateExpressionParts.push(`#updatedAt = :updatedAt`);
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    if (updateExpressionParts.length === 0) {
      return errorResponse(400, 'No fields to update');
    }

    const updateExpression = `SET ${updateExpressionParts.join(', ')}`;

    const result = await dynamoClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { beaconid },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      })
    );

    return successResponse({
      message: 'Item updated successfully',
      item: result.Attributes,
    });
  } catch (error) {
    console.error('Error updating item:', error);
    return errorResponse(500, 'Failed to update item', error);
  }
};
