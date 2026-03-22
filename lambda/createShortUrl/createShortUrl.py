"""
CreateShortUrl Lambda:=
1)Recieves a long Url
2)Generate a 6-character alphanumeric short Code
3)Stores ShortCode -> longUrl mapping in DynamoDB
4)Returns the full Short URL to DynamoDB
"""


import json
import boto3
import random
import string
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('urlShortner')

BASE_URL = os.environ['BASE_URL']

def lambda_handler(event, context):
    print(event)  # visible in CloudWatch Logs
    
    body = json.loads(event['body'])  # parse the JSON string first
    long_url = body['longUrl']     
    short_code = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
    
    table.put_item(Item={        # fixed: put_item not putItems, Item keyword required
        'shortCode': short_code,
        'longUrl': long_url      # fixed: long_url not longUrl
    })
    
    return {
        'statusCode': 200,       # fixed: lowercase s
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'shortUrl': f'{BASE_URL}/{short_code}'   # fixed: lowercase s
        })
    }