import { ApolloClient, InMemoryCache } from "@apollo/client";

const Client = new ApolloClient({
  uri: "http://whttmp.asuscomm.com/rately-api/graphql",
  cache: new InMemoryCache(),
  ssrMode: true,
});

export default Client;
