import random
import boto3
import os

dynamodb = boto3.resource('dynamodb')

def handler(event, context):

  random_number = str(random.randint(1, 100))

  table_name = os.environ['RANDOMDATA_TABLE_NAME']
  table = dynamodb.Table(table_name)

  table.put_item(
    Item={
      'id': random_number
    }
  )

  return {
    'statusCode': 200
  }