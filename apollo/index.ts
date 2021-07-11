import { ApolloClient, InMemoryCache } from "@apollo/client";

const Client = new ApolloClient({
  uri: "https://fatihpkn-rately-api.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  ssrMode: true,
});

export default Client;
