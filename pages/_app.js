import React from "react";
import Script from "next/script";
import PropTypes from "prop-types";
import "../styles/custom.scss";
import "../styles/blur.css";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "styles/react-tagsinput.css";

function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-71KVWKKN0L"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-71KVWKKN0L');
    `}
      </Script>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default App;
