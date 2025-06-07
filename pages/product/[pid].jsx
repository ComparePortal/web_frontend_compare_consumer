import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import groupBy from 'lodash/groupBy';
var moment = require('moment'); // require
import ProductRepository from '~/repositories/ProductRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
// import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderElectronic from '~/components/shared/headers/HeaderElectronic';

import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import HeaderMobileProduct from '~/components/shared/header-mobile/HeaderMobileProduct';
import { Slider } from 'antd';
import { carouselStandard } from '~/utilities/carousel-helpers';
import Product from '~/components/elements/products/Product';
import CategoryRepository from '~/repositories/CategoryRepository';

const ProductDefaultPage = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productTitle, setProductTitle] = useState(null);
    const [getSimilarProducts, setSimilarProducts] = useState(null);
    const [keyFeatureList, setKeyFeatureList] = useState([]);
    const [productSpecification, setProductSpecification] = useState([]);
    const [comparePricePortal, setComparePricePortal] = useState([]);
    const [isComparePricePortalLoad, setComparePricePortalLoad] =
        useState(false);
    const [isInternetCheck, setInternetCheck] = useState(false);

    let apiCheckList = [];
    let isPricePortalAllCheck = false;
    let comparePricePortalList = [];

    async function getProduct(pid) {
        setComparePricePortal([]);
        setKeyFeatureList([]);
        setSimilarProducts([]);
        setProductSpecification([]);
        setLoading(true);
        setProduct(null);
        setProductTitle(null);
        comparePricePortalList = [];
        setComparePricePortalLoad(false);
        setInternetCheck(false);
        const responseData = await ProductRepository.getProductsById(pid);
        let similar_products_list = [];
        if (
            responseData &&
            typeof responseData == 'object' &&
            Object.entries(responseData).length != 0 &&
            responseData.data != null
        ) {
            setProduct(responseData.data);
            for (let key in responseData.data) {
                let product = responseData.data[key];
                setKeyFeatureList(product?.product_features ?? []);
                if (product && product.compared_products) {
                    let productComparePortalCopy = product.compared_products;
                    let realTimePortal = await product.compared_products.filter(
                        (item) =>
                            item.site_name == 'Flipkart' ||
                            item.site_name == 'Amazon'
                    );

                    // console.log('realTimePortal', realTimePortal);
                    let groupedPortal = groupBy(
                        realTimePortal,
                        (site) => site.site_name
                    );
                    // console.log('realTimePortal123', groupedPortal);

                    let otherPortalList =
                        await product.compared_products.filter(
                            (item) =>
                                item.site_name == 'samsung' ||
                                item.site_name == 'hp' ||
                                // item.site_name != 'samsung' &&
                                item.site_name == 'croma' ||
                                item.site_name == 'nykaa' ||
                                item.site_name == 'myntra' ||
                                item.site_name == 'vijaysales' ||
                                item.site_name == 'reliancedigital' ||
                                item.site_name == 'addmecart' ||
                                item.site_name == 'fliptwirls' ||
                                item.site_name == 'moglix' ||
                                item.site_name == 'poorvika' ||
                                item.site_name == 'newgadgetsindia' ||
                                item.site_name == 'health-mall' ||
                                item.site_name == 'ibhejo' ||
                                item.site_name == 'vlebazaar' ||
                                item.site_name == 'bidbuddy' ||
                                item.site_name == 'futureforward' ||
                                item.site_name == 'imastudent' ||
                                item.site_name == 'designinfo' ||
                                item.site_name == 'imaginext' ||
                                item.site_name == 'fotocentreindia' ||
                                item.site_name == 'dillimal' ||
                                item.site_name == 'healthkart' || 
                                item.site_name == 'wellbeingnutrition' ||
                                item.site_name == 'kiwla' || 
                                item.site_name == 'hyugalife' || 
                                item.site_name == 'shopclues'
                                
                        );

                    product.compared_products =
                        await product.compared_products.filter(
                            (item) =>
                                item.site_name != 'Amazon' &&
                                item.site_name != 'Flipkart' &&
                                item.site_name != 'mi' &&
                                item.site_name != 'redmi' &&
                                item.site_name != 'samsung' &&
                                item.site_name != 'nykaa' &&
                                item.site_name != 'myntra' &&
                                item.site_name != 'vijaysales' &&
                                item.site_name != 'reliancedigital' &&
                                item.site_name != 'hp' &&
                                item.site_name != 'croma' &&
                                item.site_name != 'addmecart' &&
                                item.site_name != 'fliptwirls' &&
                                item.site_name != 'moglix' &&
                                item.site_name != 'poorvika' &&
                                item.site_name != 'newgadgetsindia' &&
                                item.site_name != 'health-mall' &&
                                item.site_name != 'ibhejo' &&
                                item.site_name != 'vlebazaar' &&
                                item.site_name != 'bidbuddy' &&
                                item.site_name != 'futureforward' &&
                                item.site_name != 'imastudent' &&
                                item.site_name != 'designinfo' &&
                                item.site_name != 'imaginext' &&
                                item.site_name != 'fotocentreindia' &&
                                item.site_name != 'dillimal' &&
                                item.site_name != 'healthkart' && 
                                item.site_name != 'wellbeingnutrition' &&
                                item.site_name != 'kiwla' && 
                                item.site_name != 'hyugalife' &&
                                item.site_name != 'shopclues'
                        );

                    comparePricePortalList = product.compared_products;
                    // comparePricePortalList = [];
                    // console.log(
                    //     'comparePricePortalList',
                    //     comparePricePortalList,
                    //     product.compared_products
                    // );

                    setComparePricePortal(product.compared_products);
                    // setComparePricePortal([]);
                    apiCheckList = [];
                    let groupPortalCheckList = [];
                    for (let key in groupedPortal) {
                        groupPortalCheckList.push({ product_id: key });
                    }

                    for await (let item of [
                        // ...realTimePortal,
                        ...groupPortalCheckList,
                        ...otherPortalList,
                    ]) {
                        let obj = { id: item.product_id, isChecked: false };
                        apiCheckList.push(obj);
                    }
                    // console.log('apiCheckList', apiCheckList);

                    if (realTimePortal && realTimePortal.length > 0) {
                        realTimePricePortal(
                            // realTimePortal,
                            groupedPortal,
                            product.compared_products
                        );
                    }
                    if (otherPortalList && otherPortalList.length > 0) {
                        realTimePriceOtherPortal(
                            otherPortalList,
                            product.compared_products
                        );
                    }

                    // console.log(
                    //     'product.compared_products',
                    //     product.compared_products
                    // );
                    setTimeout(() => {
                        if (
                            !isPricePortalAllCheck &&
                            comparePricePortalList.length == 0
                        ) {
                            setInternetCheck(true);
                        } else {
                        }
                    }, 6000);

                    if (product.compared_products.length > 0) {
                        for (let item of product.compared_products) {
                            if (
                                item.site_name &&
                                item.url
                                // && item.price
                            ) {
                                setComparePricePortalLoad(true);
                                break;
                            }
                        }
                    }

                    for (let price of productComparePortalCopy) {
                        if (price && price.price) {
                            relatedProducts(pid, price.price);
                            break;
                        }
                    }
                }

                if (product && product.product_specification != null) {
                    setProductSpecification(product.product_specification);
                }
            }

            setLoading(false);
        } else {
            setLoading(false);
        }
    }

    async function realTimePricePortal(portalData, otherPortal) {
        console.log('qqqqqqqq_111', portalData);
        for (let key in portalData) {
            console.log('qqqqqqqq_2222', key);
            if (key == 'Flipkart') {
                let isApiRequest = false;
                let portalLength = portalData[key].length;
                let flipkartIndex = 0;
                portalData[key].map((data) => {
                    flipkartIndex++;
                    if (data['updated_on'] != null) {
                        let currentTime = moment()
                            .utc()
                            .format('YYYY-MM-DD HH:mm:ss');
                        let portalTime = moment(data['updated_on']).format(
                            'YYYY-MM-DD HH:mm:ss'
                        );
                        let checkDiff = moment(currentTime).diff(
                            portalTime,
                            'minutes'
                        );
                        console.log('flipkart', currentTime, portalTime);
                        console.log(
                            'flipkart',
                            moment(currentTime).diff(portalTime, 'minutes'),
                            checkDiff
                        );
                        if (checkDiff > 60) {
                            isApiRequest = true;
                        }
                    } else {
                        isApiRequest = true;
                    }
                    console.log(
                        'flipkart',
                        portalLength,
                        flipkartIndex,
                        isApiRequest
                    );

                    if (portalLength == flipkartIndex) {
                        if (isApiRequest) {
                            getRealPrice(portalData[key], key, true);
                        } else {
                            checkMinPricePortals(portalData[key], key, true);
                        }
                    }
                });
            } else {
                let isApiRequest = false;
                let portalLength = portalData[key].length;
                let amazonIndex = 0;
                portalData[key].map((data) => {
                    amazonIndex++;
                    if (data['updated_on'] != null) {
                        let currentTime = moment()
                            .utc()
                            .format('YYYY-MM-DD HH:mm:ss');
                        let portalTime = moment(data['updated_on']).format(
                            'YYYY-MM-DD HH:mm:ss'
                        );
                        let checkDiff = moment(currentTime).diff(
                            portalTime,
                            'minutes'
                        );
                        console.log('amazon', currentTime, portalTime);
                        console.log(
                            'amazon',
                            moment(currentTime).diff(portalTime, 'minutes'),
                            checkDiff
                        );
                        if (checkDiff > 1440) {
                            isApiRequest = true;
                        }
                    } else {
                        isApiRequest = true;
                    }
                    console.log(
                        'amazon',
                        isApiRequest,
                        portalLength,
                        amazonIndex
                    );
                    if (portalLength == amazonIndex) {
                        if (isApiRequest) {
                            console.log('amazon', 'if');
                            getRealPrice(portalData[key], key, true);
                        } else {
                            console.log('amazon', 'else');
                            checkMinPricePortals(portalData[key], key, true);
                        }
                    }
                });
            }
            console.log('qqqqqqqqqq_333333', portalData[key]);
        }
    }
    async function checkMinPricePortals(portal, product_id, isMainPortal) {
        console.log('checkMinPrice', portal[0], portal.length);
        if (portal.length == 1) {
            if (portal[0] != null) {
                console.log('checkMinPrice', 'iffffffffffff');
                getRealPriceOffline(portal[0], product_id, true);
            } else {
                console.log('checkMinPrice', 'elseeeeeeeeee');
                getRealPrice(portal, product_id, true);
            }
        } else {
            console.log('checkMinPrice', 'elseeeeeeeeee_if');
            getRealPrice(portal, product_id, true);
        }
    }

    async function realTimePriceOtherPortal(portalData, otherPortal) {
        for (let data of portalData) {
            console.log('other_portal', data);
            if (data['updated_on'] != null) {
                let currentTime = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                let portalTime = moment(data['updated_on']).format(
                    'YYYY-MM-DD HH:mm:ss'
                );
                let checkDiff = moment(currentTime).diff(portalTime, 'minutes');
                console.log('other_portal', currentTime, portalTime);
                console.log(
                    'other_portal',
                    moment(currentTime).diff(portalTime, 'minutes'),
                    checkDiff
                );
                if (checkDiff > 120) {
                    console.log('other_portal', 'real_price_if');
                    getRealPrice(data, data.product_id, false);
                } else {
                    console.log('other_portal', 'else');
                    getRealPriceOffline(data, data.product_id, false);
                }
            } else {
                console.log('other_portal', 'real_price_else_if');
                getRealPrice(data, data.product_id, false);
            }
        }
    }
    async function getRealPriceOffline(data, product_id, isMainPortal) {
        console.log('dddddddddddddddddddddd', data);
        try {
            comparePricePortalList.push(data);
            setComparePricePortal([...comparePricePortalList]);
            setInternetCheck(false);
            setComparePricePortalLoad(true);
            isPricePortalAllCheck = true;

            let objIndex = apiCheckList.findIndex(
                (obj) => obj.id == product_id
            );
            if (objIndex >= 0) {
                apiCheckList[objIndex].isChecked = true;
                const checkAllApiDone = apiCheckList.find(
                    (o) => o.isChecked == false
                );
                if (!checkAllApiDone) {
                    setInternetCheck(false);
                    setComparePricePortalLoad(true);
                    isPricePortalAllCheck = true;
                }
            }
        } catch (err) {
            let objIndex = apiCheckList.findIndex(
                (obj) => obj.id == product_id
            );
            if (objIndex >= 0) {
                apiCheckList[objIndex].isChecked = true;
                const checkAllApiDone = apiCheckList.find(
                    (o) => o.isChecked == false
                );
                if (!checkAllApiDone) {
                    setInternetCheck(false);
                    setComparePricePortalLoad(true);
                    isPricePortalAllCheck = true;
                }
            }
        }
    }

    async function getRealPrice(data, product_id, isMainPortal) {
        try {
            let responseData = null;
            // console.log('dataaaa', [data]);

            if (isMainPortal) {
                responseData =
                    await ProductRepository.getRealTimePricePortalNew(data);
            } else {
                responseData =
                    await ProductRepository.getOtherTimePricePortalNew([data]);
            }

            if (responseData && responseData.data) {
                if (
                    responseData.data.site_name &&
                    responseData.data.url
                    // && responseData.data.price
                ) {
                    // if (responseData.data.site_name == 'Amazon') {
                    //     if (
                    //         responseData.data.price &&
                    //         responseData.data.price != null &&
                    //         responseData.data.in_stock > 0
                    //     ) {
                    //         comparePricePortalList.push(responseData.data);
                    //         setComparePricePortal([...comparePricePortalList]);
                    //         setComparePricePortalLoad(true);
                    //     }
                    //     setInternetCheck(false);
                    //     isPricePortalAllCheck = true;
                    // } else {
                    comparePricePortalList.push(responseData.data);
                    setComparePricePortal([...comparePricePortalList]);
                    setInternetCheck(false);
                    setComparePricePortalLoad(true);
                    isPricePortalAllCheck = true;
                    // }
                }
            }

            let objIndex = apiCheckList.findIndex(
                (obj) => obj.id == product_id
            );
            if (objIndex >= 0) {
                apiCheckList[objIndex].isChecked = true;
                const checkAllApiDone = apiCheckList.find(
                    (o) => o.isChecked == false
                );
                if (!checkAllApiDone) {
                    setInternetCheck(false);
                    setComparePricePortalLoad(true);
                    isPricePortalAllCheck = true;
                }
            }

            // if (count == length) {
            //     setInternetCheck(false);
            //     setComparePricePortalLoad(true);
            // }
        } catch (error) {
            console.log('eeeeeeee', error);
            // if (count == length) {
            //     setInternetCheck(false);
            //     setComparePricePortalLoad(true);
            // }
            let objIndex = apiCheckList.findIndex(
                (obj) => obj.id == product_id
            );
            if (objIndex >= 0) {
                apiCheckList[objIndex].isChecked = true;
                const checkAllApiDone = apiCheckList.find(
                    (o) => o.isChecked == false
                );
                if (!checkAllApiDone) {
                    setInternetCheck(false);
                    setComparePricePortalLoad(true);
                    isPricePortalAllCheck = true;
                }
            }
        }
    }

    async function relatedProducts(categoryId, price) {
        let priceNumber = parseInt(price.toString().replaceAll(',', ''));
        let endpoint = `product_id=${categoryId}&price=${priceNumber}`;
        const responseData = await ProductRepository.getRelatedProducts(
            endpoint
        );
        if (responseData && responseData.data) {
            let similar_products_list = [];
            for (let item in responseData.data) {
                let similarProduct = responseData.data[item];
                let obj = {
                    id: item,
                    product_title: similarProduct.product_title,
                    product_display_price: similarProduct.price,
                    product_images: [similarProduct.image_url],
                };
                similar_products_list.push(obj);
            }
            setSimilarProducts(similar_products_list);
        }
    }

    useEffect(() => {
        if (pid) {
            apiCheckList = [];
            isPricePortalAllCheck = false;
            comparePricePortalList = [];
            getProduct(pid);
            getUserData(pid);
            getUserAnalyticsData(pid);
        }
    }, [pid]);

    const getUserData = async (pid) => {
        try {
            const res = await axios.get('https://api.ipify.org/?format=json');
            if (res.data && res.data.ip) {
                await ProductRepository.saveUserData(
                    res.data.ip,
                    window.location.href,
                    pid
                );
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const getUserAnalyticsData = async (pid) => {
        try {
            const res = await axios.get('https://api.ipify.org/?format=json');
            if (res.data && res.data.ip) {
                let user_data = {
                    ip: res.data.ip,
                    product_list: {
                        product_id: pid,
                    },
                };
                console.log('unigt', user_data);
                await ProductRepository.saveUserAnalyticsData(user_data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    let breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        // {
        //     text: 'Shops',
        //     url: '/shop',
        // },
        {
            text: productTitle ? productTitle : loading ? 'Loading...' : '',
        },
    ];
    // Views
    let productView, headerView;
    if (!loading) {
        if (product && Object.values(product)[0]) {
            if (productTitle == null) {
                setProductTitle(Object.values(product)[0].product_title);
            }
            // setProductTitle(Object.values(product)[0])
            productView = (
                <ProductDetailFullwidth
                    product={Object.values(product)[0]}
                    comparePricePortal={comparePricePortal}
                    isComparePricePortalLoad={isComparePricePortalLoad}
                    isInternetCheck={isInternetCheck}
                />
            );
            headerView = (
                <>
                    {/* <HeaderProduct product={product} /> */}
                    <HeaderElectronic product={product} />
                    <HeaderMobileProduct />
                </>
            );
        } else {
            productView = (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // background: 'red',
                        height: '250px',
                        fontSize: '20px',
                    }}>
                    No Product Found
                </div>
            );
            // headerView = (
            //     <>
            //         <HeaderElectronic />
            //         <HeaderMobileProduct />
            //     </>
            // );
        }
    } else {
        productView = <SkeletonProductDetail />;
    }

    let similarProductsView = [];
    if (getSimilarProducts) {
        if (getSimilarProducts && getSimilarProducts.length > 0) {
            const items = getSimilarProducts.map((item) => (
                <Product product={item} key={item.id} />
            ));
            similarProductsView = (
                <Slider
                    {...carouselStandard}
                    speed={800}
                    arrows={true}
                    className=" outside">
                    {items}
                </Slider>
            );
        } else {
            similarProductsView = <p>No product found.</p>;
        }
    }

    return (
        <PageContainer
            header={headerView}
            title={product ? productTitle : loading ? 'Loading...' : ''}>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                    </div>

                    <RelatedProduct
                        collectionSlug="shop-recommend-items"
                        products={getSimilarProducts}
                        productSpecification={productSpecification}
                        keyFeatureList={keyFeatureList}
                    />
                </div>
            </div>
            {/* <Newletters /> */}
        </PageContainer>
    );
};

export default ProductDefaultPage;
