import { ApolloProvider } from "@apollo/client";
import { StoreProvider } from "easy-peasy";
import type { AppContext, AppProps } from "next/app";
import Client from "../apollo";
import Header from "../components/header";
import { initializeStore, initStore, useStore } from "../store";
import "../styles/globals.sass";

let store = initStore();

function RatelyApp({ Component, pageProps }: AppProps) {
  store = useStore(pageProps.ssrStoreState);

  return (
    <ApolloProvider client={Client}>
      <StoreProvider store={store}>
        <Header />
        <Component {...pageProps} />
      </StoreProvider>
    </ApolloProvider>
  );
}

export default RatelyApp;
