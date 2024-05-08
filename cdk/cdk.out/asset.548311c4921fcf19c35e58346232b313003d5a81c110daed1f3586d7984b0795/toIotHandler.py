import boto3
import os
import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

#iotdata = boto3.client('iot-data', endpoint_url=os.environ['IOT_DATA_ENDPOINT'])
iot_client = boto3.client('iot-data', region_name='us-east-1', endpoint_url='https://' + os.environ['IOT_DATA_ENDPOINT'])
def handler(event, context):
    logger.info("****************** iot ******************")
    
    logger.info(event)
    
    # Procesar cada registro del evento
    for record in event['Records']:
        # Obtener el tipo de evento (INSERT, MODIFY, REMOVE)
        event_type = record['eventName']
        
        # Obtener los datos del registro actual
        if event_type != 'REMOVE':  # Si el evento no es de eliminación, significa que hay un nuevo estado del elemento
            new_image = record['dynamodb']['NewImage']
            # Ejemplo de cómo acceder a los valores de un elemento de la tabla
            item_id = new_image['id']['S']
           # item_name = new_image['name']['S']
    
    logger.info(item_id)
  
    params = {
        'topic': os.environ['IOT_TOPIC'],
        'qos': 1,
        'payload': json.dumps({
            'type': 'notification',
            'ramdom': item_id
        })
    }
    
    iot_client.publish(**params)

    return {
        'statusCode': 200
    }