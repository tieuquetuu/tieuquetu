import '@/MuiClassNameSetup';
import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '@/theme';
import createEmotionCache from '@/createEmotionCache';
import { SessionProvider } from "next-auth/react";
import Layout from '@/components/Layout';

// import '@/styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const {
      Component,
      emotionCache = clientSideEmotionCache,
      pageProps: {
          session,
          ...pageProps
      }
  } = props;

  const page = useMemo(() => {
      const PageLayout = Component.Layout || Layout;

      return(<SessionProvider session={session} refetchInterval={0}>
          <CacheProvider value={emotionCache}>
              <Head>
                  <meta name="viewport" content="initial-scale=1, width=device-width" />
              </Head>
              <ThemeProvider theme={theme}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />

                  <PageLayout>
                      <Component {...pageProps} />
                  </PageLayout>

              </ThemeProvider>
          </CacheProvider>
      </SessionProvider>)
  }, [Component, session, emotionCache, pageProps]);

  return (
      <React.Fragment>
          {page}
      </React.Fragment>
  );
}