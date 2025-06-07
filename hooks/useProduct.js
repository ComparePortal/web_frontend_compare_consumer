import React from 'react';
import LazyLoad from 'react-lazyload';
import { baseUrl } from '~/repositories/Repository';
import { formatCurrency } from '~/utilities/product-helper';
import Link from 'next/link';

function getImageURL(source, size) {
    let image, imageURL;

    if (source) {
        if (size && size === 'large') {
            if (source.formats.large) {
                image = source.formats.large.url;
            } else {
                image = source.url;
            }
        } else if (size && size === 'medium') {
            if (source.formats.medium) {
                image = source.formats.medium.url;
            } else {
                image = source.url;
            }
        } else if (size && size === 'thumbnail') {
            if (source.formats.thumbnail) {
                image = source.formats.source.url;
            } else {
                image = source.url;
            }
        } else if (size && size === 'small') {
            if (source.formats.small !== undefined) {
                image = source.formats.small.url;
            } else {
                image = source.url;
            }
        } else {
            if (source[0] != null) {
                if (source[0]) image = source[0];
            } else {
                image = `/static/img/not-found.jpg`;
            }
        }

        imageURL = `${image}`;
    } else {
        imageURL = `/static/img/not-found.jpg`;
    }
    return imageURL;
}

export default function useProduct() {
    return {
        thumbnailImage: (payload) => {
            if (payload) {
                // if (payload.product_images) {
                return (
                    <img
                        src={
                            getImageURL(payload.product_images) ||
                            '/static/img/not-found.jpg'  
                            
                        } alt={(payload.product_title)}
                        // onError={(e) => {
                        //     e.currentTarget.src = '/static/img/not-found.jpg';
                        // }}
                        // alt={'getImageURL(payload.product_images)'}
                    />
                );
                // }
            }
        },
        price: (payload) => {
            let view;
            // console.log('payload', payload.product_price.replace(",", ''));
            let actual_price = 0;

            // if (payload.product_savings_price != null) {
            //     actual_price =
            //         parseFloat(payload.product_price.replace(',', '')) +
            //         parseFloat(payload.product_savings_price.replace(',', ''));
            //     // actual_price = 1000;
            //     // console.log("acrrr", actual_price)
            // }
            if (payload.product_display_price != null) {
                view = (
                    <p className="ps-product__price sale">
                        &#8377;
                        {payload.product_source == 'Amazon'
                            ? formatCurrency(
                                  parseInt(
                                      payload?.product_display_price
                                          .toString()
                                          .replaceAll(',', '')
                                  )
                              )
                            : formatCurrency(
                                  parseInt(
                                      payload?.product_display_price
                                          .toString()
                                          .replaceAll(',', '')
                                  )
                              )}
                        {/* {payload.product_savings_price != null && (
                            <del className="ml-2">
                                <span>&#8377;</span>
                                {formatCurrency(actual_price)}
                            </del>
                        )} */}
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        NA
                        {/* {formatCurrency(payload.product_savings_display_price)} */}
                    </p>
                );
            }
            return view;
        },
        bagde_brand: (payload) => {
            if (
                payload.product_source != null &&
                payload.product_source == 'Amazon'
            ) {
                return (
                    <div class="badge_main_div">
                        <i class="_stor _amazon"></i>
                    </div>
                );
            } else if (
                payload.product_source != null &&
                payload.product_source == 'Flipkart'
            ) {
                return (
                    <div class="badge_main_div">
                        <i class="_stor _flipkart"></i>
                    </div>
                );
            }
        },
        //  bagde_brand: (payload) => {
        //      if (
        //         payload.product_source != null &&
        //         payload.product_source == 'Flipkart'
        //     ) {
        //         return (
        //             <div class="badge_main_div">
        //                 <i class="_stor _flipkart"></i>
        //             </div>
        //         );
        //     }

        // },
        badges: (payload) => {
            let view = null;
            if (payload.badges && payload.badges.length > 0) {
                const items = payload.badges.map((item) => {
                    if (item.value === 'hot') {
                        return (
                            <span
                                className="ps-product__badge hot"
                                key={item.id}>
                                Hot
                            </span>
                        );
                    }
                    if (item.value === 'new') {
                        return (
                            <span
                                className="ps-product__badge new"
                                key={item.id}>
                                New
                            </span>
                        );
                    }
                    if (item.value === 'sale') {
                        return (
                            <span
                                className="ps-product__badge sale"
                                key={item.id}>
                                Sale
                            </span>
                        );
                    }
                });
                view = <div className="ps-product__badges">{items}</div>;
            }
            return view;
        },
        badge: (payload) => {
            let view;
            let actual_price = null;
            if (payload.product_savings_price != null) {
                actual_price =
                    parseFloat(payload.product_price) +
                    parseFloat(payload.product_savings_price);
            }
            if (payload.badge && payload.badge !== null) {
                view = payload.badge.map((badge) => {
                    if (badge.type === 'sale') {
                        return (
                            <div className="ps-product__badge">
                                {badge.value}
                            </div>
                        );
                    } else if (badge.type === 'outStock') {
                        return (
                            <div className="ps-product__badge out-stock">
                                {badge.value}
                            </div>
                        );
                    } else {
                        return (
                            <div className="ps-product__badge hot">
                                {badge.value}
                            </div>
                        );
                    }
                });
            }
            if (payload.product_savings_price) {
                const discountPercent = (
                    ((actual_price - payload.product_price) /
                        payload.product_price) *
                    100
                ).toFixed(0);
                return (
                    <div className="ps-product__badge">
                        -{payload.product_savings_percentage}%
                    </div>
                );
            }
            return view;
        },
        brand: (payload) => {
            let view;
            if (payload.brands && payload.brands.length > 0) {
                view = (
                    <Link href="/shop">
                        <a className="text-capitalize">
                            {payload.brands[0].name}
                        </a>
                    </Link>
                );
            } else {
                view = (
                    <Link href="/shop">
                        <a className="text-capitalize">No Brand</a>
                    </Link>
                );
            }
            return view;
        },
        title: (payload) => {
            let view = '';
            if (payload.id) {
                view = (
                    <a
                        href={`/product/${payload.id}`}
                        target="_blank"
                        // rel="noopener noreferrer"
                        as={`/product/${payload.id}`}
                        className="ps-product__content ps-product__title">
                        {/* <a className="ps-product__title"> */}
                        {payload.product_title}
                        {/* </a> */}
                    </a>
                );
            }

            if (payload.url) {
                view = (
                    <Link href={payload.url} target="_blank">
                        <a className="ps-product__title">
                            {payload.product_title}
                        </a>
                    </Link>
                );
            }

            return view;
        },
    };
}
