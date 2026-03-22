"""
redirectFunction Lambda:=
1)Gets the request from Lambda
2)Checks whether its there in DynamoDB
3)If its there returns the old Url with 301 Status
"""


import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE_NAME'])

def lambda_handler(event, context):
    print(json.dumps(event,default=str))
    short_code = event['pathParameters']['shortCode']  # fixed typo + case
    
    response = table.get_item(
        Key={
            'shortCode': short_code  # must match DynamoDB partition key exactly
        }
    )
    
    print(response)  # visible in CloudWatch Logs → /aws/lambda/your-function-name
    
    if 'Item' not in response:
        return {
            'statusCode': 404,          # fixed — quotes around statusCode
            'body': json.dumps('URL not found')
        }
    
    long_url = response['Item']['longUrl']
    
    return {
        'statusCode': 301,
        'headers': {
            'Location': long_url
        },
        'body': ''
    }