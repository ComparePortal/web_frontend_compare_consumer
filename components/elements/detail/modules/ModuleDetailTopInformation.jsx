import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
import {
    FacebookIcon,
    GooglePlusShareButton,
    GooglePlusIcon,
    InstapaperShareButton,
    InstapaperIcon,
    LinkedinIcon,
    PinterestIcon,
    TelegramIcon,
    LinkedinShareButton,
    PinterestShareButton,
    TelegramShareButton,
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share';

const ModuleDetailTopInformation = ({ product }) => {
    // Views
    let priceView;

    if (product.is_sale) {
        priceView = (
            <h4 className="ps-product__price sale">
                <del className="mr-2">&{product.product_savings_price}</del>
                &#8377;
                {product.product_price}
            </h4>
        );
    } else {
        priceView = (
            <h4 className="ps-product__price">
                &#8377;{product.product_price}
            </h4>
        );
    }
    return (
        <header>
            {/* <div
                id="myPortal"
                style={{
                    position: 'absolute',
                    top: '230px',
                    zIndex: '999999',
                    // width: '800px',
                    // height: '100px',
                    // width: '100%',
                    // background: '#fff',
                }}
            /> */}
            <div id="myresult" class="img-zoom-result"></div>

            <h1>{product.product_title}</h1>
            <div className="ps-product__meta">
                <p>
                    Brand:
                    {/* <Link href=""> */}
                    {/* <a className="ml-2 text-capitalize">
                        {product.product_brand}
                    </a> */}
                    <span
                        className="ml-2 text-capitalize"
                        style={{ color: '#06c' }}>
                        {product.product_brand}
                    </span>
                    {/* </Link> */}
                </p>
               
                <div  className='ps-product__share'>
                        <p >Share:
                       
                   </p>
                   {/* <div className='ps-product-share-icon' style={{
                        float:'right',
                    }}> */}
                < WhatsappShareButton
                    url={window.location.href}
                    title={product.product_title && product.product_title}
                    className="share-button">
                    <WhatsappIcon size={30} round />
                </ WhatsappShareButton>
                <TwitterShareButton
                    url={window.location.href}
                    title={product.product_title && product.product_title}
                    className="share-button">
                    <TwitterIcon size={30} round />
                </TwitterShareButton>
                <FacebookShareButton
                    url={window.location.href}
                    quote={product.product_title && product.product_title}
                    className="share-button">
                    <FacebookIcon size={30} round />
                </FacebookShareButton>
                {/* <GooglePlusShareButton
                    url={window.location.href}
                    className="share-button">
                    <GooglePlusIcon size={iconSize} round />
                </GooglePlusShareButton> */}
                 <LinkedinShareButton
                    url={window.location.href}
                    title={product.product_title && product.product_title}
                    className="share-button">
                    <LinkedinIcon size={30} round />
                </LinkedinShareButton>
                <PinterestShareButton
                    url={window.location.href}
                    media="/favicon.ico"
                    className="share-button">
                    <PinterestIcon size={30} round />
                </PinterestShareButton>
                <TelegramShareButton
                    url={window.location.href}
                    title={product.product_title && product.product_title}
                    className="share-button">
                    <TelegramIcon size={30} round />
                </TelegramShareButton> 
                {/* </div> */}
                </div>
                <div className="ps-product__rating">
                    <Rating />
                </div>
            </div>
            {/* {priceView} */}
        </header>
    );
};

export default ModuleDetailTopInformation;
