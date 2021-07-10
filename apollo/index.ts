import { ApolloClient, InMemoryCache } from "@apollo/client";

const Client = new ApolloClient({
  uri: "http://localhost:9002/graphql",
  cache: new InMemoryCache({ addTypename: true, resultCaching: true }),
  ssrMode: true,
});

export default Client;
