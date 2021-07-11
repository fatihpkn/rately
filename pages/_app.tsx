import { ApolloProvider } from "@apollo/client";
import App, { AppContext } from "next/app";
import { AppProps } from "next/dist/next-server/lib/router/router";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import Client from "../apollo";
import Header from "../components/header";
import "../styles/globals.sass";

const $queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 100000000, // 24 hours
    },
  },
});

const RatelyApp = (props: AppProps) => {
  const [queryClient] = React.useState(() => $queryClient);

  const { Component, pageProps } = props;

  return (
    <ApolloProvider client={Client}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Header />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

RatelyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  return { ...appProps };
};

export default RatelyApp;
