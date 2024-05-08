import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
	GraphqlApi,
	SchemaFile,
	AuthorizationType,
	AppsyncFunction,
	Code,
	FunctionRuntime,
	Resolver,
} from 'aws-cdk-lib/aws-appsync'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { join } from 'path'
import { Runtime } from 'aws-cdk-lib/aws-lambda'


import { CfnSchedule, CfnScheduleGroup } from 'aws-cdk-lib/aws-scheduler';
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Duration, aws_dynamodb as dynamodb, aws_iam as iam, aws_lambda as lambdaFull  } from 'aws-cdk-lib';
import { StreamViewType } from 'aws-cdk-lib/aws-dynamodb';
import { DynamoEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export class MainStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props)

		const api = new GraphqlApi(this, 'Api', {
			name: 'TriggeredByLambda',
			schema: SchemaFile.fromAsset(
				join(__dirname, '../graphql/schema.graphql')
			),
			authorizationConfig: {
				defaultAuthorization: {
					authorizationType: AuthorizationType.API_KEY,
				},
			},
		})

		const createTodoFunc = new AppsyncFunction(this, 'createTodoFunction', {
			name: 'createTodoFunction',
			api,
			dataSource: api.addNoneDataSource('none'),
			code: Code.fromAsset(
				join(__dirname, '../graphql/Mutation.createTodo.js')
			),
			runtime: FunctionRuntime.JS_1_0_0,
		})

		new Resolver(this, 'PipelineResolver', {
			api,
			typeName: 'Mutation',
			fieldName: 'createTodo',
			code: Code.fromInline(`
        // The before step
        export function request(...args) {
          console.log(args);
          return {}
        }
    
        // The after step
        export function response(ctx) {
          return ctx.prev.result
        }
      `),
			runtime: FunctionRuntime.JS_1_0_0,
			pipelineConfig: [createTodoFunc],
		})

		const lambda = new NodejsFunction(this, 'trigger', {
			runtime: Runtime.NODEJS_16_X,
			bundling: {
				target: 'es2020',

				commandHooks: {
					beforeInstall: (inputDir: string, outputDir: string) => [],
					beforeBundling: (inputDir: string, outputDir: string) => [
						`cd graphql`,
						`amplify codegen`,
					],
					afterBundling: (inputDir: string, outputDir: string) => [],
				},
			},
			environment: {
				GRAPHQL_URL: api.graphqlUrl,
			},
		})
		api.grantMutation(lambda)


		 // Dynamodb Table
		 const table = new dynamodb.Table(this, 'RandomDataTable', {
			billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
			partitionKey: {
			  name: 'id', 
			  type:dynamodb.AttributeType.STRING
			},
			stream: StreamViewType.NEW_AND_OLD_IMAGES // stream
		  });
	  
		  // Define IAM role
		  const role = new iam.Role(this, 'LambdaExecutionRole', {
			assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
		  });
	  
		  // Define IAM policy
		  const policy = new iam.PolicyStatement({
			actions: ['dynamodb:PutItem', 'dynamodb:GetItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem'],
			resources: [table.tableArn]
		  });
	  
		  // Add policy to role
		  role.attachInlinePolicy(new iam.Policy(this, 'AccessPolicy', {
			statements: [policy]
		  }));
	  
	  
		  //Lambda function to run the scheduled task
		  const myFunction = new lambdaFull.Function(this, 'myFunction', {
			runtime: lambdaFull.Runtime.PYTHON_3_9,
			memorySize: 128,
			timeout: Duration.seconds(30),
			handler: 'handler.handler',
			code: lambdaFull.Code.fromAsset(join(__dirname, '/../src/Function')),
			role: role,
			// create environment variable with the interval assigned with --context
			environment: {
			  interval_in_minutes: "5",
			  RANDOMDATA_TABLE_NAME: table.tableName,
			  RANDOMDATA_TABLE_ARN: table.tableArn
			}
		  });

	// ******************************************************************
    // Schedule task
    // ******************************************************************
    // need to create role and policy for scheduler to invoke the lambda function
    const schedulerRole = new Role(this, 'scheduler-role', {
		assumedBy: new ServicePrincipal('scheduler.amazonaws.com'),
	  });
  
	  new Policy(this, 'schedule-policy', {
		policyName: 'ScheduleToInvokeLambdas',
		roles: [schedulerRole],
		statements: [
		  new PolicyStatement({
			effect: Effect.ALLOW,
			actions: ['lambda:InvokeFunction'],
			resources: [myFunction.functionArn],
		  }),
		],
	  });
  
	  // Create a group for the schedule (maybe you want to add more scheudles to this group the future?)
	  const group = new CfnScheduleGroup(this, 'schedule-group', {
		name: 'SchedulesForLambda',
	  });
  
	  // Creates the schedule to invoke every 5 minutes
	  new CfnSchedule(this, 'my-schedule', {
		groupName: group.name,
		flexibleTimeWindow: {
		  mode: 'OFF',
		},
		scheduleExpression: 'rate(5 minute)',
		target: {
		  arn: myFunction.functionArn,
		  roleArn: schedulerRole.roleArn,
		},
	  });

	  // stream
	  lambda.addEventSource(new DynamoEventSource(table, {
		startingPosition: lambdaFull.StartingPosition.LATEST,
	  }));

		new CfnOutput(this, 'graphqlUrl', { value: api.graphqlUrl })
		new CfnOutput(this, 'apiId', { value: api.apiId })
		new CfnOutput(this, 'functionArn', { value: lambda.functionArn })
		new CfnOutput(this, 'functionName', { value: lambda.functionName })
	}
}
