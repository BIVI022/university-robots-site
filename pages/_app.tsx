import type { AppProps } from 'next/app';
import Head from 'next/head';
import MainLayout from '../common/layouts/Main/MainLayout';
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>STEM-Центр</title>
                <link rel="icon" href="/images/brgu-logo.png" />
            </Head>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </>
    );
}
