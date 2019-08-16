// import { ApolloLink } from 'apollo-link';
// import { setContext } from 'apollo-link-context';
// import { onError } from 'apollo-link-error';
// import { HttpLink } from 'apollo-link-http';
// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';
//
// import { SubscriptionClient } from 'subscriptions-transport-ws';

import { map } from 'rxjs/operators';

import { Config } from '../../environment/environment';

// import { authService } from '../services/auth.service';

const authMiddleware = setContext(() => {
  return authService
    .getToken()
    .pipe(
      map((userToken) => {
        return {
          headers: {
            authorization: `Bearer ${userToken}` || null,
          },
        };
      }),
    )
    .toPromise();
});

const errorMiddleware = onError(({  networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }

  if (networkError) {
    console.log(`Network error: ${networkError}`);
  }
});

const getConnectionParams = async () => {
  const token = await authService.getToken().toPromise();

  return {
    authorization: `Bearer ${token}`,
  };
};

export const subscriptionClient = new SubscriptionClient(Config.apiWSEndpoint, {
  lazy: true,
  reconnect: true,
  connectionParams: () => getConnectionParams(),
});

const httpLink = new HttpLink({ uri: Config.apiEndpoint });
const wsLink = new WebSocketLink(subscriptionClient);

const combinedLink = ApolloLink.split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([authMiddleware, errorMiddleware, combinedLink]);

export default link;
