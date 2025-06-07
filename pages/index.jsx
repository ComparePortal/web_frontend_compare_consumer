import React from 'react';
import dynamic from 'next/dynamic';
import {
    carouselStandard,
    carouselStandard1,
    carouselStandard2,
    carouselFullwidth,
} from '~/utilities/carousel-helpers';
import Slider from 'react-slick';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';
// import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';
// import PageContainer from '~/components/layouts/PageContainer';
import HeaderElectronic from '~/components/shared/headers/HeaderElectronic';
import HeaderMobileElectronic from '~/components/shared/headers/HeaderMobileElectronic';
import FooterSecond from '~/components/shared/footers/FooterSecond';
import PageContainer from '~/components/layouts/PageContainer';
import CollectionRepository from '~/repositories/CollectionRepository';
import CategoryRepository from '~/repositories/CategoryRepository';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Product from '~/components/elements/products/Product';

import Modal from 'react-bootstrap/Modal';
import { CloseOutlined } from '@ant-design/icons';
// import HomePopularCategory from '~/components/partials/homepage/home-default/HomePopularCategory';
// import HomePopularProducts from '~/components/partials/homepage/home-default/HomePopularProducts';
// const HomePopularCategoryLazy = lazy(() =>
//     import('./../components/partials/homepage/home-default/HomePopularCategory')
// );
// const popularProducts = lazy(() =>
//     import('./../components/partials/homepage/home-default/HomePopularProducts')
// );
const HomePopularCategoryLazy = dynamic(
    () =>
        import(
            './../components/partials/homepage/home-default/HomePopularCategory'
        )
    // { ssr: false, loading: () => <p>Loading...</p> }
);

const HomePopularProductsLazy = dynamic(
    () =>
        import(
            './../components/partials/homepage/home-default/HomePopularProducts'
        )

    // { ssr: false, loading: () => <p>Loading...</p> }
);

const HomePromotionsLazy = dynamic(
    () =>
        import('./../components/partials/homepage/home-default/HomePromotions')

    // { ssr: false, loading: () => <p>Loading...</p> }
);

const ElectronicProductGroupWithCarouselLazy = dynamic(
    () =>
        import(
            './../components/partials/homepage/electronic/ElectronicProductGroupWithCarousel'
        )

    // { ssr: false, loading: () => <p>Loading...</p> }
);

const HomepageDefaultPage = ({ data }) => {
    // console.log('ppppppppppp', data);
    const Router = useRouter();

    const [productItems, setProductItems] = useState(null);
    const [bannerImage, setBannerImage] = useState(data.bannerImages || null);
    const [topcategories, setTopCategories] = useState(
        data.topCategories || null
    );
    const [popularCategories, setPopularCategories] = useState(
        data.popularCategories || null
    );
    const [promotionBanner, setPromotionBanner] = useState(null);
    const [getPopularProducts, setPopularProducts] = useState(
        data.popularProducts || null
    );
    const [popularProductView, setPopularProductView] = useState(null);
    const [fetchProductIdArray, setfetchProductIdArray] = useState([
        2, 90, 3810, 1, 3682, 3076, 3220, 1513, 2302, 2743,
    ]);
    const [copyFetchProductIdArray, setCopyfetchProductIdArray] = useState([
        ...fetchProductIdArray,
    ]);
    const [fetchProductIdArrayIndex, setFetchProductIdArrayIndex] = useState(0);
    const [productViewAllArray, setProductViewAllArray] = useState([]);

    const [hasMore, setHasMore] = useState(true);

    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );
    const router = useRouter();
    const [modalShow, setModalShow] = React.useState(false);

    let productIdStartIndex = 0;

    useEffect(() => {
        productLists();
        // topCategoryOfMonthAndBanner();
        handleSetColumns();
        getUserData();
        getUserAnalyticsData();
    }, []);

    const getUserData = async () => {
        try {
            const res = await axios.get('https://api.ipify.org/?format=json');
            if (res.data && res.data.ip) {
                await CollectionRepository.saveUserData(
                    res.data.ip,
                    window.location.href
                );
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const getUserAnalyticsData = async () => {
        try {
            const res = await axios.get('https://api.ipify.org/?format=json');
            if (res.data && res.data.ip) {
                let data = {
                    ip: res.data.ip,
                    home: {
                        url: window.location.href,
                    },
                };
                await CollectionRepository.saveUserAnalyticsData(data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    let columns = 6;
    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
                return 4;
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6 mb-10');
                return 6;
                break;

            default:
                setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
        }
    }

    async function viewAllProductsMap(products, counter) {
        if (products) {
            let id = Object.keys(products);
            setProductViewAllArray((post) => [
                ...post,
                {
                    id: id,
                    title: products[id].category_name,
                    counter: counter,
                    speed: 400,
                    isViewAll: true,
                    products: products[id].products,
                },
            ]);
        }
    }
    async function productLists() {
        let productListArray = [...fetchProductIdArray];
        productListArray = productListArray.splice(fetchProductIdArrayIndex, 2);
        if (productListArray.length == 0) {
            setHasMore(false);
        }
        if (hasMore) {
            for await (let productId of productListArray) {
                let prod1 =
                    await CollectionRepository.getProductsByHomepageCollectionSlug(
                        `items_per_page=10&category_id=${productId}`
                    );
                if (
                    prod1 &&
                    typeof prod1 == 'object' &&
                    Object.entries(prod1).length != 0 &&
                    Object.keys(prod1) != null
                ) {
                    viewAllProductsMap(
                        prod1,
                        copyFetchProductIdArray.indexOf(productId)
                    );
                }
                if (productId == 2743) {
                    setHasMore(false);
                }
            }
        }
    }

    async function nextProductLists() {
        setHasMore(false);
        let productListArray = [...fetchProductIdArray];
        productListArray = productListArray.splice(2);
        if (productListArray.length == 0) {
            setHasMore(false);
        }
        if (hasMore) {
            for await (let productId of productListArray) {
                // console.log('etchProductIdArray.indexOf(productId)', productId);
                let prod1 =
                    await CollectionRepository.getProductsByHomepageCollectionSlug(
                        `items_per_page=10&category_id=${productId}`
                    );
                if (
                    prod1 &&
                    typeof prod1 == 'object' &&
                    Object.entries(prod1).length != 0 &&
                    Object.keys(prod1) != null
                ) {
                    viewAllProductsMap(
                        prod1,
                        copyFetchProductIdArray.indexOf(productId)
                    );
                }
                if (productId == 2743) {
                    setHasMore(false);
                }
            }
        }
    }

    // let popular_products_list = [];
    // async function topCategoryOfMonthAndBanner() {
    //     let entries = null;
    //     const topCategoriesOfMonth =
    //         CategoryRepository.getTopCategoriesOfMonth();
    //     topCategoriesOfMonth.then((response) => {
    //         if (response && response.category_data) {
    //             if (response.category_data) {
    //                 entries = Object.entries(response.category_data);
    //                 setTopCategories(entries);
    //             }
    //             if (response.home_banner) {
    //                 setBannerImage(response.home_banner);
    //             }
    //             if (response.popular_categories) {
    //                 setPopularCategories(
    //                     response.popular_categories.sort(
    //                         (a, b) =>
    //                             parseInt(a.seq_order) - parseInt(b.seq_order)
    //                     )
    //                 );
    //             }
    //             if (response.popular_products) {
    //                 for (let item in response.popular_products) {
    //                     response.popular_products[item].id = item;
    //                     popular_products_list.push(
    //                         response.popular_products[item]
    //                     );
    //                 }
    //                 setPopularProducts(popular_products_list);
    //                 // popularProductSlider(popular_products_list);
    //             }
    //         }
    //     });
    // }

    const imageLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`;
    };

    const headers = (
        <>
            <HeaderElectronic />
            <HeaderMobileElectronic />
        </>
    );

    let bestsellerItemView;
    // console.log('getPopularProducts', getPopularProducts);
    if (getPopularProducts) {
        if (getPopularProducts && getPopularProducts.length > 0) {
            const items = getPopularProducts.map((item) => (
                <Product product={item} key={item.id} />
            ));
            bestsellerItemView = (
                <Slider
                    {...carouselStandard}
                    speed={1000}
                    autoplay={false}
                    arrows={true}
                    className="ps-carousel outside">
                    {items}
                </Slider>
            );
        } else {
            bestsellerItemView = <p>No product found.</p>;
        }
    }

    let ElectronicView = [];
    let brand = [];

    const footer = <FooterSecond classes="ps-footer--electronic" />;
    return (
        <PageContainer
            title="-- Compare Products"
            header={headers}
            footer={footer}>
            <main id="homepage-1" style={{ backgroundColor: '#f1f3f6' }}>
                <HomeDefaultBanner
                    banner={bannerImage}
                    promotionBanner={promotionBanner}
                />
                <HomePopularCategoryLazy
                    popularCategories={popularCategories}
                />
                <HomePopularProductsLazy popularProducts={getPopularProducts} />

                <HomePromotionsLazy />

                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    // centered
                    style={{ border: '0px' }}>
                    <Modal.Body style={{ background: '#560c80' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <span></span>
                            <img
                                src="/static/img/yashraa.png"
                                alt="yashraa"
                                style={{ width: '18%' }}
                            />
                            <CloseOutlined
                                style={{ fontSize: '22px', color: 'white' }}
                                onClick={(e) => {
                                    setModalShow(false);
                                }}
                            />
                        </div>
                        <p
                            style={{
                                color: 'white',
                                fontSize: '15px',
                                padding: '10px 10px 5px 10px',
                            }}>
                            Dear Customer, <br></br>Welcome to{' '}
                            <a
                                style={{ color: 'white' }}
                                href="http://yashra.in/">
                                Yashra.in
                            </a>
                            <p style={{ marginTop: '10px' }}></p>The products in
                            this category are in beta testing. You can view and
                            shop the products but comparisons are not yet
                            available.
                            <p style={{ marginTop: '10px' }}></p>Thanks for your
                            support of our project. We are very excited to hear
                            what you think. You can write your suggestions and
                            ideas and mail us at{' '}
                            <a
                                style={{ color: 'white' }}
                                href="mailto:info@yashra.in">
                                info@yashra.in
                            </a>
                            <p style={{ marginTop: '10px' }}></p>Thanks &
                            Regards
                            <br></br>Team Yashraa
                        </p>
                    </Modal.Body>
                </Modal>
                <InfiniteScroll
                    dataLength={productViewAllArray.length}
                    next={nextProductLists}
                    hasMore={hasMore} // Replace with a condition based on your data source
                    loader={<div></div>}
                    endMessage={<div></div>}>
                    {productViewAllArray.map((data) => (
                        // console.log('ddddddddd', data.counter, data.title),
                        <ElectronicProductGroupWithCarouselLazy
                            collectionSlug=""
                            title={data.title}
                            links={''}
                            products={data.products}
                            category_id={data.id}
                            isViewAll={true}
                            speed={data.speed}
                            counter={data.counter}
                        />
                    ))}
                </InfiniteScroll>

                {/* 
                {
                    (console.log('productViewAllArray', productViewAllArray),
                    productViewAllArray.map((data) => (
                        <ElectronicProductGroupWithCarousel
                            collectionSlug=""
                            title={data.title}
                            links={''}
                            products={data.products}
                            category_id={data.id}
                            isViewAll={true}
                            speed={data.speed}
                            counter={data.counter}
                        />
                    )))
                } */}
                {/* {error && <p>Error: {error.message}</p>} */}
            </main>
        </PageContainer>
    );
};

// This gets called on every request
export async function getServerSideProps() {
    async function fetchHomepage() {
        const res = await fetch(
            'https://yashra.in:8002/api/fetch_homepage_data'
        );
        return await res.json();
    }
    const [getHomepageResp] = await Promise.allSettled([fetchHomepage()]);

    let topCategories = null;
    let bannerImages = null;
    let popularCategories = null;
    let popularProducts = null;

    if (
        getHomepageResp.status == 'fulfilled' &&
        getHomepageResp.value != null
    ) {
        let response = getHomepageResp.value;
        if (response.category_data) {
            topCategories = Object.entries(response.category_data);
        }
        if (response.home_banner) {
            // setBannerImage(response.home_banner);
            bannerImages = response.home_banner;
        }
        if (response.popular_categories) {
            popularCategories = response.popular_categories.sort(
                (a, b) => parseInt(a.seq_order) - parseInt(b.seq_order)
            );
        }
        let popular_products_list = [];

        if (response.popular_products) {
            for (let item in response.popular_products) {
                response.popular_products[item].id = item;
                popular_products_list.push(response.popular_products[item]);
            }
            popularProducts = popular_products_list;
        }
    }

    let data = {
        topCategories,
        bannerImages,
        popularCategories,
        popularProducts,
    };
    return { props: { data } };
}

export default HomepageDefaultPage;
