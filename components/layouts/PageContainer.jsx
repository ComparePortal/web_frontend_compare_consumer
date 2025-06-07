import React from 'react';
import Head from 'next/head';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';
import HeaderElectronic from '../shared/headers/HeaderElectronic';
import HeaderMobileElectronic from '../shared/headers/HeaderMobileElectronic';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import FooterMarketPlace2 from '../shared/footers/FooterMarketPlace2';
import FooterSecond from '../shared/footers/FooterSecond';
const initHeaders = (
    <>
        {/* <HeaderDefault /> */}
        <HeaderElectronic />
        <HeaderMobileElectronic />
        {/* <HeaderMobile /> */}
    </>
);
const initFooters = (
    <>
        {/* <FooterFullwidth /> */}
        {/* <FooterMarketPlace2 /> */}
        <FooterSecond classes="ps-footer--electronic" />
    </>
);

const PageContainer = ({
    header = initHeaders,
    footer = initFooters,
    children,
    title = 'Page',
}) => {
    let titleView;

    if (title !== '') {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    return (
        <>
            <Head>
                <title>{titleView}</title>
            </Head>
            {header}
            {children}
            {footer}
        </>
    );
};

export default PageContainer;
