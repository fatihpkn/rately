import { ApolloClient, InMemoryCache } from "@apollo/client";

const Client = new ApolloClient({
  uri: "https://whttmp.asuscomm.com/rately-api/graphql",
  cache: new InMemoryCache(),
  ssrMode: true,
});

export default Client;
