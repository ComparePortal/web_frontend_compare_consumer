import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

import {
    getProductsByCategoriesHelper,
    getProductsByCollectionHelper,
} from '~/utilities/strapi-fetch-data-helpers';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setBreadcrumb } from '~/store/breadcrumb/action';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import Product from '~/components/elements/products/Product';
import { carouselStandard, carouselStandard2 } from '~/utilities/carousel-helpers';
import useGetProducts from '~/hooks/useGetProducts';
import PromotionCategory from '../home-default/PromotionCategory';
import PromotionBanner2 from '../home-default/PromotionBanner2';

const ElectronicProductGroupWithCarousel = ({
    collectionSlug,
    categorySlug,
    links,
    title,
    products,
    category_id,
    isViewAll,
    speed,
    counter,
}) => {
    const {
        productItems,
        loading,
        getProductsByCategory,
        getProductsByCollection,
    } = useGetProducts();

    let productList = products;
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClick = (e, data) => {
        e.preventDefault();

        if (data && data.id != null) {
            if (data.id == 1) {
                data.id = 145;
            }
            let makeBreadcrumbItem = [
                {
                    id: 0,
                    url: '/',
                    text: 'Home',
                    isLast: false,
                },
                {
                    id: data.id,
                    url: `/category/${data.title}&category_id=${data.id}`,
                    text: data.name,
                    isLast: true,
                },
            ];
            dispatch(setBreadcrumb(makeBreadcrumbItem));
            window.sessionStorage.setItem(
                'breadcrumbs',
                JSON.stringify(makeBreadcrumbItem)
            );
            router.push(e.target.id);
        }
    };

    // useEffect(() => {

    //     if (categorySlug != "") {
    //         getProductsByCategory(categorySlug);
    //     }
    //     if (collectionSlug != "") {
    //         getProductsByCollection(collectionSlug);
    //     }
    // }, [categorySlug, collectionSlug]);

    let productItemsView, linksView;
    let items = [];
    // let i = 1;
    if (products) {
        for (let single_prod in products) {
            products[single_prod].id = single_prod;
            items.push(products[single_prod]);
            //         for (let product in productItems[single_prod].products) {
            //             if (i < 21)
            //
            //             else break;
            //             i++;
            //         }
        }
    }
    // console.log('productItems', productItems);
    if (!loading) {
        if (items && items.length > 0) {
            let i = 0;
            const slideItems = items.map((item) => (
                <Product product={item} key={item.id} />
            ));
            productItemsView = (
                <Slider
                    {...carouselStandard2}
                    lazyLoad={true}
                    infinite={false}
                    slidesToShow={items.length > 6 ? 6 : items.length}
                    speed={speed || 750}
                    autoplay={false}
                    arrows={true}
                    className="ps-carousel outside">
                    {slideItems}
                </Slider>
            );
            // linksView = links.map((item) => (
            //     <li key={item}>
            //         <Link href="/shop">
            //             <a>{item}</a>
            //         </Link>
            //     </li>
            // ));
        } else {
            productItemsView = <p>No product found.</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }

    let promotionView;
    if (counter == 2) {
        promotionView = <PromotionCategory />;
    }
    if (counter == 4) {
        promotionView = <PromotionBanner2 />;
    }

    return (
        <>
            {promotionView}
            <div className="ps-product-list">
                <div class="container" style={{ background: '#fff' }}>
                    <div class="row">
                        <div
                            class="col-6 col-lg-2 "
                            style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                            <div className="ps-section__header">
                                <h3>{title}</h3>
                                <ul className="ps-section__links">
                                    {/* {linksView} */}
                                    <li>
                                        {/* <Link href="/shop">
                                            <a>View All</a>
                                        </Link> */}
                                        {isViewAll && (
                                            // <Link
                                            //     href={`/category/category_id=${
                                            //         category_id == 1
                                            //             ? 145
                                            //             : category_id
                                            //     }&items_per_page=${20}`}
                                            //     as={`/category/category_id=${
                                            //         category_id == 1
                                            //             ? 145
                                            //             : category_id
                                            //     }&items_per_page=${20}`}>
                                            <a
                                                onClick={(e) =>
                                                    handleClick(e, {
                                                        name: title,
                                                        id: category_id,
                                                    })
                                                }
                                                href={`/category/${title}&category_id=${
                                                    category_id == 1
                                                        ? 145
                                                        : category_id
                                                }`}
                                                id={`/category/${title}&category_id=${
                                                    category_id == 1
                                                        ? 145
                                                        : category_id
                                                }`}
                                                as={`/category/${title}&category_id=${
                                                    category_id == 1
                                                        ? 145
                                                        : category_id
                                                }`}
                                                className="category-view-all">
                                                VIEW ALL
                                            </a>
                                            // </Link>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            class="col-6 col-lg-10 mob"
                            style={{ paddingLeft: '0px' }}>
                            <div className="ps-section__content">
                                {productItemsView}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ElectronicProductGroupWithCarousel;
