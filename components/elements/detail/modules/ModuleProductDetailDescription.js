import React from 'react';
import Link from 'next/link';

const ModuleProductDetailDescription = ({ product }) => {
    let descriptions = [];
    let featureList = [];

    if (typeof product.product_features == 'string') {
        // console.log('x1');
        // descriptions = product.product_features;
        // // for (let i in descriptions) {
        // //     console.log('iiiiiiiiiiii', i);
        // // }
    } else {
        // console.log('x2');
        // descriptions = product.product_features.replace(/'/g, '"');
        // descriptions = JSON.parse(descriptions);
        // console.log('desss', descriptions);
    }

    return (
        <div className="ps-product__desc">
            <p>
                Sold By:
                {/* <Link href="/shop"> */}
                <a>
                    <strong> {product.merchant_name}</strong>
                </a>
                {/* </Link> */}
            </p>
            <ul className="ps-list--dot">
                {descriptions.map((description) => {
                    return <li>{description}</li>;
                })}

                {/* <li>Unrestrained and portable active stereo speaker</li>
                <li> Free from the confines of wires and chords</li>
                <li> 20 hours of portable capabilities</li>
                <li>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</li>
                <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li> */}
            </ul>
        </div>
    );
};

export default ModuleProductDetailDescription;
