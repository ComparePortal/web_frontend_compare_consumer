import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';

const Product = ({ product }) => {
    const { thumbnailImage, price, bagde_brand, badge, title } = useProduct();
    return (
        <div className="ps-product">
            {/* {bagde_brand(product)} */}
            {/* <div className="ps-product__thumbnail"> */}
            {/* {product.url && (
                    <Link href={product.url} target="_blank">
                        <a>{thumbnailImage(product)}</a>
                    </Link>
                )} */}
            {product.id && (
                <a
                    href={`/product/${product.id}`}
                    target="_blank"
                    as={`/product/${product.id}`}
                    className="ps-product__thumbnail">
                    {thumbnailImage(product)}
                </a>
            )}
            {/* {badge(product)}
                {product.id && <ModuleProductActions product={product} />} */}
            {/* </div> */}
            <div className="ps-product__container">
                <a className="ps-product__vendor">{product.product_brand}</a>
                {/* <div className="ps-product__content"> */}
                {title(product)}
                {price(product)}
                {/* </div> */}
                {/* <div className="ps-product__content hover">
                    {title(product)}
                    {price(product)}
                </div> */}
            </div>
        </div>
    );
};

export default Product;
