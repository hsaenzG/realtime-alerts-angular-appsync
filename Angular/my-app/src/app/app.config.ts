import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import * as subscriptions from '../graphql/subscriptions';


Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'AppSyncAPI/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'API-KEY'
    }
  }
});



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

/* // Stop receiving data updates from the subscription
createSub.unsubscribe();
updateSub.unsubscribe();
deleteSub.unsubscribe(); */

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
