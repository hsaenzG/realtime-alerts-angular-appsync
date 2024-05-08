# Función Lambda llama AWS AppSync GraphQl API

Este proyecto contiene un ejemplo de la aplicación del patron Lambda To AppSync (https://serverlessland.com/patterns/appsync-lambda-graphql-cdk?ref=search). Ademas implementa un sheduler de EventBridge para simular el envio de data de forma periodica a nuestra API, para esto se implementa el almacenamiento de la data de prueba en una tabla de DynamoDB la cual atraves de un Stream le envia información de los datos recibidos a la función lambda que envia los mensajes a nuestra API.

En este proyecto utilizaremos los servicios 
[AWS AppSync](https://aws.amazon.com/appsync/) 
[AWS Lambda](https://aws.amazon.com/lambda/).
[Amazon EventBridge Scheduler](https://aws.amazon.com/es/blogs/compute/introducing-amazon-eventbridge-scheduler/)
[Amazon DynamoDB Streams](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html) 

En este ejemplo, se utiliza AWS AppSync, que proporciona un esquema que permite gestionar y leer tareas pendientes (todos). Se implementa una función Lambda que puede interactuar con la API de GraphQL. Esta función es capaz de crear tareas utilizando el código generado automáticamente a partir del esquema por [Amplify CLI codegen](https://docs.amplify.aws/cli). El código generado proporciona las operaciones y los tipos de variables, facilitando la interacción con la API de GraphQL de AppSync desde la función de Typescript. Este patrón es útil en el diseño impulsado por eventos que activa su función AppSync desde el backend. Estos cambios pueden reflejarse fácilmente en los clientes de front-end en tiempo real utilizando las suscripciones de AppSync.

**Importante:** esta aplicación utiliza varios servicios de AWS y hay costos asociados con estos servicios después del uso del nivel gratuito; consulte la [página de precios de AWS](https://aws.amazon.com/pricing/) para obtener detalles. Usted es responsable de los costos de AWS incurridos. No se implica garantía en este ejemplo.

## Requisitos

* [Crea una cuenta de AWS](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) si aún no tienes una e inicia sesión. El usuario IAM que utilices debe tener suficientes permisos para realizar llamadas a servicios de AWS necesarias y gestionar recursos de AWS.
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) instalado y configurado
* [Git instalado](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node y NPM](https://nodejs.org/en/download/) instalados
* [Kit de desarrollo en la nube de AWS](https://docs.aws.amazon.com/cdk/latest/guide/cli.html) (AWS CDK) instalado

Asegúrate de instalar el CLI de Amplify:

* [Amplify CLI](https://docs.amplify.aws/cli/start/install): `npm install -g @aws-amplify/cli`

## Despliegue

1. Clona el proyecto en tu directorio de trabajo local

   ```sh
   git clone https://github.com/hsaenzG/realtime-alerts-angular-appsync

2. Cambia al directorio del patrón en tu entorno de trabajo

   ```sh
   cd appsynclambda/cdk
   ```

3. Instala las dependencias del proyecto

   ```sh
   npm install
   ```

4. Despliega el stack en tu cuenta y región de AWS predeterminadas. La salida de este comando muestra el ID de la API de GraphQL, la URL, y el ARN y nombre de la función lambda.

   ```sh
   cdk deploy
   ```

## Pruebas

Puedes probar la creación de una nueva tarea desde tu función Lambda, visitando la consola de Lambda, seleccionando tu función y ejecutando una prueba.

Alternativamente, puedes probar directamente desde tu terminal:

```sh
# reemplaza <functionName> con los valores de salida de `cdk deploy`
aws lambda invoke --function-name <functionName> --payload '{}' /tmp/response.json
```

Puedes ver tu suscripción activada por tu mutación iniciando una suscripción desde la consola como se muestra a continuación:

![Escucha las suscripciones en la consola](console.png)

Puedes ejecutar una consulta directamente desde tu terminal.

## Limpieza

Ejecuta el comando dado para eliminar los recursos que se crearon. Podría tardar algún tiempo en eliminarse la pila de CloudFormation.

```sh
cdk destroy
```

## Referencias

1. [Exporting AppSync operations to a Lambda layer for easy reuse](https://docs.amplify.aws/guides/functions/appsync-operations-to-lambda-layer/q/platform/js)
2. [Simplify access to multiple microservices with AWS AppSync and AWS Amplify](https://aws.amazon.com/blogs/mobile/appsync-microservices/)
3. [Tutorial: HTTP Resolvers](https://docs.aws.amazon.com/appsync/latest/devguide/tutorial-http-resolvers.html)
4. [Serverless Land - Lambda to AppSync](https://serverlessland.com/patterns/appsync-lambda-graphql-cdk?ref=search)

----

