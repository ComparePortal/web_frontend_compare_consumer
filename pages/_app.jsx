import React, { useEffect } from 'react';
import { wrapper } from '~/store/store';
import { CookiesProvider } from 'react-cookie';
import MasterLayout from '~/components/layouts/MasterLayout';
import '~/public/static/fonts/Linearicons/Font/demo-files/demo.css';
import '~/public/static/fonts/font-awesome/css/font-awesome.min.css';
import '~/public/static/css/bootstrap.min.css';
import '~/public/static/css/slick.min.css';
import '~/scss/style.scss';
import '~/scss/resolution.scss';
import '~/scss/home-default.scss';
import '~/scss/electronic.scss';
import Head from 'next/head';
function App({ Component, pageProps }) {
    useEffect(() => {
        setTimeout(function () {
            document.getElementById('__next').classList.add('loaded');
        }, 100);
    });

    return (
        <>
            <Head>
                <title>Comparor - Compare Products</title>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="format-detection" content="telephone=no" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="author" content="nouthemes" />
                <meta
                    name="keywords"
                    content="yashra, Online Product Price Comparison Website "
                />
                <meta
                    name="description"
                    content="yashra - Online Product Price Comparison Website"
                />
                <link rel="preconnect" href="https://yashra.in:8050" />
                {/* <script
                    type="text/javascript"
                    src="https://cdn.rawgit.com/igorlino/elevatezoom-plus/1.1.6/src/jquery.ez-plus.js"></script>
                <script
                    type="text/javascript"
                    src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script> */}
            </Head>
            <CookiesProvider>
                <MasterLayout>
                    <Component {...pageProps} />
                </MasterLayout>
            </CookiesProvider>
        </>
    );
}

export default wrapper.withRedux(App);
