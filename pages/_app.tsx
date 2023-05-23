import { ReactElement, ReactNode, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import MainLayout from '../common/layouts/Main/MainLayout';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '../styles/global.scss';
import { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    useEffect(() => {
        updateViewportHeightProp();
        window.addEventListener('resize', updateViewportHeightProp);
    }, []);

    const updateViewportHeightProp = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    return (
        <>
            <Head>
                <title>STEM-Центр</title>
                <link rel="icon" href="/images/brgu-logo.png" />
            </Head>
            <Provider store={store}>
                {getLayout(<Component {...pageProps} />)}
            </Provider>
        </>
    );
}
