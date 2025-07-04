import React, { useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import ProductDealOfDay from '~/components/elements/products/ProductDealOfDay';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';

import {
    carouselStandard,
    carouselInSidebar,
    carouselFullwidth,
} from '~/utilities/carousel-helpers';
import CountDownSimple from '~/components/elements/CountDownSimple';
import useGetProducts from '~/hooks/useGetProducts';

const ProductGroupDealOfDay = ({
    collectionSlug,
    categorySlug,
    boxed = false,
    links,
}) => {
    const {
        productItems,
        loading,
        getProductsByCategory,
        getProductsByCollection,
    } = useGetProducts();

    useEffect(() => {
        if (categorySlug) {
            // console.log("catSlug", cate)
            getProductsByCategory(categorySlug);
        }
        if (collectionSlug) {
            getProductsByCollection(collectionSlug);
        }
    }, [categorySlug, collectionSlug]);

    // Views
    let productItemsView, linkView;
    let items = [];
    let i = 1;
    for (let single_prod in productItems) {
        if (i < 21) items.push(productItems[single_prod]);
        else break;
        i++;
    }
    if (!loading) {
        if (items) {
            const slideItems = items.map((item) => (
                <ProductDealOfDay product={item} key={item.id} />
            ));
            productItemsView = (
                <Slider {...carouselStandard} className="ps-carousel outside">
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

    return (
        <div className="ps-deal-of-day">
            <div className={boxed ? 'container' : 'ps-container'}>
                <div className="ps-section__header">
                    <div className="ps-block--countdown-deal">
                        <div className="ps-block__left">
                            <h3>Deal of the day</h3>
                        </div>
                        <div className="ps-block__right">
                            <figure>
                                <figcaption>End in:</figcaption>
                                <CountDownSimple
                                    timeTillDate="12 31 2021, 6:00 am"
                                    timeFormat="MM DD YYYY, h:mm a"
                                />
                            </figure>
                        </div>
                    </div>
                    <Link href="/shop">
                        <a>View all</a>
                    </Link>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};

export default ProductGroupDealOfDay;
