import '@/MuiClassNameSetup';
// react
import React, {useEffect, useMemo, useState} from 'react';

// third party
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { SessionProvider } from "next-auth/react";
import AppBase from 'next/app'
import Script from 'next/script'
import { useStore } from "react-redux";
import { Provider as ReactReduxProvider } from "react-redux";
import NProgress from 'nprogress'

// application
import { load, save, wrapper } from "@/store/store"
import { useApplyClientState } from "@/store/client";
import { useOriginalRouter, hrefToRouterArgs } from "@/services/router";
import theme from '@/theme';
import createEmotionCache from '@/createEmotionCache';
import Layout from '@/components/Layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps: {
            session,
            ...pageProps
        }
    } = props;

    const store = useStore()
    const applyClientState = useApplyClientState()
    const originalRouter = useOriginalRouter()

    // Loading and saving state on the client side ( cart, wishlist, etc ... )
    useEffect(()=> {
        const state = load()

        applyClientState(state || {})

        if (process.browser) {
            store.subscribe(()=>{
                save(store.getState())
            })
        }

    }, [store, applyClientState])

    // Handle route change
    useEffect(()=>{
        originalRouter.events.on('routeChangeStart', (url) => {
            NProgress.start()
        })
        originalRouter.events.on('routeChangeComplete', () => NProgress.done())
        originalRouter.events.on('routeChangeError', () => NProgress.done())
    })

    const page = useMemo(() => {
      const PageLayout = Component.Layout || Layout;

      return(
          <SessionProvider session={session} refetchInterval={5 * 60}>
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
          </SessionProvider>
      )
  }, [Component, session, emotionCache, pageProps]);

    return (
        <React.Fragment>
            {page}
        </React.Fragment>
    );
}

/*function MyApp(appProps) {
    /!*const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps: {
            session,
            ...pageProps
        }
    } = props;

    const store = useStore()*!/

    const { Component, ...rest } = appProps;
    const {
        store,
        props
    } = wrapper.useWrappedStore(rest)

    const {
        emotionCache = clientSideEmotionCache,
        pageProps: {
            session,
            ...pageProps
        }
    } = props

    const applyClientState = useApplyClientState()
    const originalRouter = useOriginalRouter()

    // Loading and saving state on the client side ( cart, wishlist, etc ... )
    useEffect(()=> {
        const state = load()

        applyClientState(state || {})

        if (process.browser) {
            store.subscribe(()=>{
                save(store.getState())
            })
        }

    }, [store, applyClientState])

    // Handle route change
    useEffect(()=>{
        originalRouter.events.on('routeChangeStart', (url) => {
            NProgress.start()
        })
        originalRouter.events.on('routeChangeComplete', () => NProgress.done())
        originalRouter.events.on('routeChangeError', () => NProgress.done())
    })

    const page = useMemo(() => {
        const PageLayout = Component.Layout || Layout;

        return(
            <ReactReduxProvider store={store}>
                <SessionProvider session={session} refetchInterval={0}>
                    <CacheProvider value={emotionCache}>
                        <Head>
                            <meta name="viewport" content="initial-scale=1, width=device-width" />
                        </Head>
                        <ThemeProvider theme={theme}>
                            {/!* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. *!/}
                            <CssBaseline />

                            <PageLayout>
                                <Component {...pageProps} />
                            </PageLayout>

                        </ThemeProvider>
                    </CacheProvider>
                </SessionProvider>
            </ReactReduxProvider>
        )
    }, [Component, session, emotionCache, pageProps]);

    return (
        <React.Fragment>
            {page}
        </React.Fragment>
    );
}*/

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
    const dispatch = store.dispatch;

    return {
        ...(await AppBase.getInitialProps(context))
    }
})

const WrappedApp = wrapper.withRedux(MyApp)

export default WrappedApp;