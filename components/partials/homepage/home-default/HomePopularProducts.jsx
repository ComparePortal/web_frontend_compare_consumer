import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import { carouselStandard1 } from '~/utilities/carousel-helpers';
import Product from '~/components/elements/products/Product';

const HomePopularProducts = ({ popularProducts }) => {
    const Router = useRouter();
    const [popularProductView, setPopularProductView] = useState(null);

    useEffect(() => {
        popularProductSlider();
    }, [popularProducts]);

    function popularProductSlider() {
        let productItemsView;
        if (popularProducts) {
            if (popularProducts && popularProducts.length > 0) {
                const items = popularProducts.map((item) => (
                    <Product product={item} key={item.id} />
                ));
                productItemsView = (
                    <Slider
                        {...carouselStandard1}
                        infinite={false}
                        lazyLoad={'ondemand'}
                        slidesToShow={6}
                        speed={800}
                        autoplay={false}
                        arrows={true}
                        className="ps-carousel outside">
                        {items}
                    </Slider>
                );
            } else {
                productItemsView = <p>No product found.</p>;
            }

            setPopularProductView(productItemsView);
        }
    }

    return (
        <div className="popular-product-list  popular_cat_parent">
            <div className="container" style={{ background: '#fff' }}>
                <div class="row">
                    <div
                        class="col-6 col-lg-2"
                        style={{
                            paddingRight: '0px',
                            paddingLeft: '0px',
                        }}>
                        <div
                            className="popular-list-title popular-products"
                            style={{ height: '345px' }}>
                            <h3>{'Popular products'}</h3>
                        </div>
                    </div>
                    <div class="col-6 col-lg-10" style={{ paddingLeft: '0px' }}>
                        <div className="ps-section__content">
                            {popularProductView}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePopularProducts;
