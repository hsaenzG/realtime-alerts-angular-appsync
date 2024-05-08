import { generateClient } from 'aws-amplify/api';
import * as subscriptions from '../graphql/subscriptions';

const client = generateClient();

// Subscribe to creation of Todo
const createSub = client
  .graphql({ query: subscriptions.onCreateTodo })
  .subscribe({
    next: ({ data }) => console.log(data),
    error: (error) => console.warn(error)
  });

// Subscribe to update of Todo
const updateSub = client
  .graphql({ query: subscriptions.onUpdateTodo })
  .subscribe({
    next: ({ data }) => console.log(data),
    error: (error) => console.warn(error)
  });

// Subscribe to deletion of Todo
const deleteSub = client
  .graphql({ query: subscriptions.onDeleteTodo })
  .subscribe({
    next: ({ data }) => console.log(data),
    error: (error) => console.warn(error)
  });

// Stop receiving data updates from the subscription
createSub.unsubscribe();
updateSub.unsubscribe();
deleteSub.unsubscribe();