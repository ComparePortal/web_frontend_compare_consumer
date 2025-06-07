import React, { Component, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import Product from '~/components/elements/products/Product';
import { carouselStandard } from '~/utilities/carousel-helpers';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';

const RelatedProduct = ({
    collectionSlug,
    boxed,
    layout,
    products,
    productSpecification,
    keyFeatureList,
}) => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getProducts() {
        setLoading(true);
        // const responseData = await getProductsByCollectionHelper(
        //     collectionSlug
        // );
        // if (responseData) {
        setProductItems(products);
        setTimeout(
            function () {
                setLoading(false);
            }.bind(this),
            250
        );
        // }
    }

    useEffect(() => {
        getProducts();
    }, [products]);

    const carouselFullwidth = {
        dots: false,
        infinite: productItems && productItems.length > 7 ? true : false,
        speed: 750,
        slidesToShow:
            productItems && productItems.length < 7 ? productItems.length : 7,
        slidesToScroll: 3,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        lazyload: true,
        responsive: [
            {
                breakpoint: 1750,
                settings: {
                    slidesToShow:
                        productItems && productItems.length < 6
                            ? productItems.length
                            : 6,
                    slidesToScroll: 3,
                    dots: false,
                    arrows: true,
                },
            },

            {
                breakpoint: 1366,
                settings: {
                    slidesToShow:
                        productItems && productItems.length < 5
                            ? productItems.length
                            : 5,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false,
                    arrows: true,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    dots: false,
                    arrows: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    dots: false,
                    arrows: true,
                },
            },
        ],
    };

    // Views
    let carouselView;
    if (!loading) {
        if (productItems) {
            if ((layout = 'fullwidth')) {
                carouselView = (
                    <Slider
                        {...carouselFullwidth}
                        className="ps-carousel outside">
                        {productItems.map((item, index) => {
                            if (index < 8) {
                                return <Product product={item} key={item.id} />;
                            }
                        })}
                    </Slider>
                );
            } else {
                carouselView = (
                    <Slider
                        {...carouselStandard}
                        className="ps-carousel outside">
                        {productItems.map((item, index) => {
                            if (index < 8) {
                                return <Product product={item} key={item.id} />;
                            }
                        })}
                    </Slider>
                );
            }
        } else {
            carouselView = <p>No product found.</p>;
        }
    } else {
        carouselView = <p>Loading...</p>;
    }

    return (
        <>
            {productItems && productItems.length > 0 && (
                <div
                    className={`ps-section--default ps-related-products ${
                        boxed === true ? 'boxed' : ''
                    }`}
                    style={{
                        marginBottom: '50px',
                    }}>
                    <div className="ps-section__header ">
                        <h3>Related & Recommended Products</h3>
                    </div>
                    <div className="ps-section__content related_products">
                        {carouselView}
                    </div>
                </div>
            )}
            <div style={{ marginTop: '20px' }}></div>

            {/* {productSpecification && productSpecification.length > 0 && (
                    <div>
                        <h3 className="product-detail-header">
                            Specifications
                        </h3>
                        <div className="product-detail-container">
                            {productSpecification.map((product) => (
                                <div class="product-detail-item">
                                    <div class="product-details-key">
                                        {Object.keys(product)[0]}
                                    </div>
                                    <div class="product-details-value">
                                        {Object.values(product)[0]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}

            {productSpecification && productSpecification.length > 0 ? (
                <div>
                    <h3
                        id="specificationList"
                        className="product-detail-header">
                        Specifications
                    </h3>
                    {/* <p></p> */}
                    <div className="product-detail-container">
                        {productSpecification.map((product) => (
                            <div class="product-detail-item">
                                <div class="product-details-key">
                                    {Object.keys(product)[0]}
                                </div>
                                <div class="product-details-value">
                                    {Object.values(product)[0]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                keyFeatureList &&
                keyFeatureList.length > 0 && (
                    <div>
                        <h3
                            id="specificationList"
                            className="product-detail-header">
                            Specifications
                        </h3>
                        {/* <p></p> */}
                        <div className="product-detail-container">
                            {keyFeatureList.map((product) => (
                                <div class="product-detail-item product-detail-item-feature">
                                    <div class="product-details-key">
                                        {product}
                                    </div>
                                    {/* <div class="product-details-value">
                                            {Object.values(product)[0]}
                                        </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default RelatedProduct;
