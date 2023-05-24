import React from "react";
import PropTypes from "prop-types";
import "../styles/custom.scss";
import "../styles/blur.css";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "styles/react-tagsinput.css";

function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default App;
