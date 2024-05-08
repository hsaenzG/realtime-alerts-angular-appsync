import { createTodo } from '../graphql/codegen/graphql/mutations'
import { CreateTodoMutationVariables } from '../graphql/codegen/graphql/API'
import request from './appsyncRequest'

const appsyncURL = process.env.GRAPHQL_URL!

export const handler = async (event: any) => {

	// Process each record in the event
	for (const record of event['Records']) {
		// Get the type of the event (INSERT, MODIFY, REMOVE)
		const eventType = record['eventName'];

		// Get the data of the current record
		if (eventType !== 'REMOVE') { // If the event is not a deletion, it means there is a new state of the item
			const newImage = record['dynamodb']['NewImage'];
			// Example of how to access the values of an item in the table
			const itemId = newImage['id']['S'];
			// const itemName = newImage['name']['S'];

			// Log the item ID (you would usually do this inside the loop after getting the itemId)
			console.log(itemId);
			const variables: CreateTodoMutationVariables = {
				name: 'a new todo', //event.name || 'a new todo',
				description: itemId || 'with a description' //event.description || 'with a description',
			}
			const result = await request({ query: createTodo, variables }, appsyncURL)

			if (result.errors) {
				return console.log('Errors in mutation', result.errors)
			}

			console.log(result.data)


		}
	}

	
}
