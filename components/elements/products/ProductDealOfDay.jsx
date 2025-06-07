import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Rating from '../Rating';
import { StrapiProductPriceExpanded } from '~/utilities/product-helper';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import ModuleProductProgressbar from '~/components/elements/products/modules/ModuleProductProgressbar';
import useProduct from '~/hooks/useProduct';

const ProductDealOfDay = ({ product }) => {
    const { thumbnailImage, price, badge, title } = useProduct();
    return (
        <div className="ps-product ps-product--inner">
            <div className="ps-product__thumbnail">
                <Link
                    href="/product/[pid]"
                    as={`/product/${product.product_web_id}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
                {badge(product)}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">
                        {product.product_brand}
                    </a>
                </Link>
                <div className="ps-product__content">
                    {/* {StrapiProductPriceExpanded(product)} */}
                    {price(product)}
                    {title(product)}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>{'02'}</span>
                    </div>
                    <ModuleProductProgressbar product={product} />
                </div>
            </div>
        </div>
    );
};

export default connect()(ProductDealOfDay);
