import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
};

const FooterSecond = ({ classes }) => (
    <footer className={`ps-footer ps-footer--2 ${classes}`}>
        <div className="container">
            <div className="ps-footer__content">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Categories</h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link href="http://yashra.in/category/Electronics&category_id=1&items_per_page=20">
                                                <a>Electronics</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="http://yashra.in/category/Mobile&category_id=2&items_per_page=20">
                                                <a>Mobile</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="http://yashra.in/category/Laptops&category_id=90&items_per_page=20">
                                                <a>Laptops</a>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link href="http://yashra.in/category/Appliances&category_id=3200&items_per_page=20">
                                                <a>Appliances</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="http://yashra.in/category/Health&category_id=3682&items_per_page=20">
                                                <a>Health</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="http://yashra.in/category/Kitchen&category_id=3076&items_per_page=20">
                                                <a>Kitchen</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="http://yashra.in/category/Books%20&%20Stationary&category_id=2743&items_per_page=20">
                                                <a>Books & Stationary</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="http://yashra.in/category/Toys&category_id=2302&items_per_page=20">
                                                <a>Toys</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="http://yashra.in/category/Beauty&category_id=1513&items_per_page=20">
                                                <a>Beauty</a>
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <Link href="http://yashra.in/category/Speakers&category_id=186">
                                                <a>Soundbar Speakers</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="http://yashra.in/category/Camera&category_id=191">
                                                <a>Camera</a>
                                            </Link>
                                        </li> */}
                                        <li>
                                            <Link href="http://yashra.in/category/Fashion&category_id=3810&items_per_page=20">
                                                <a>Fashion</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            {/* <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Brands</h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link href="#">
                                                <a>Apple</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>OnePlus</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Samsung</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Redmi</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>HP</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Dell</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Sony</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Canon</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Godrej</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Whirlpool</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Wipro</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>boAt</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div> */}
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">
                                        {' '}
                                        Get to know
                                    </h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link href="/page/about-us">
                                                <a>About yashraa</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/policy">
                                                <a>Policy</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/termscondtion">
                                                <a>Term & Condition</a>
                                            </Link>
                                        </li>

                                        {/* <li>
                                            <Link href="/404">
                                                <a>Contact Us</a>
                                            </Link>
                                        </li> */}
                                    </ul>
                                </aside>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <aside className="widget widget_newletters">
                            <a
                                className="widget-title"
                                href="http://yashra.in/">
                                <img
                                    alt="yashraa"
                                    src="/static/img/New Project(5).png"
                                    style={{
                                        width: '150px',
                                        height: '50px',
                                        marginBottom: '10px',
                                    }}></img>
                            </a>
                            <form
                                className="ps-form--newletter"
                                action="#"
                                method="get">
                                {/* <div className="form-group--nest">
                                     <input
                                        className="form-control"
                                        type="text"
                                       
                                    /> 
                                    <button className="ps-btn">
                                        Subscribe
                                    </button>
                                </div> */}
                                <ul className="ps-list--social">
                                    <li>
                                        <a
                                            className="facebook"
                                            href="https://www.facebook.com/profile.php?id=100089219363859"
                                            target="_blank">
                                            {/* <i className="fa fa-facebook"></i> */}
                                            {/* <img
                                                src="/static/img/facebook (1).jpg"
                                                style={{
                                                    width: '35px',
                                                    height: '35px',
                                                }}></img> */}
                                            <Image
                                                // loader={imageLoader}
                                                src={
                                                    'https://yashra.azureedge.net/images/social-icons/facebook.png'
                                                }
                                                width={45}
                                                height={45}
                                                // priority={true}
                                                // placeholder="blur"
                                                // blurDataURL="/static/img/linkinLogo.jpg"
                                                alt="facebook"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="twitter"
                                            href="https://twitter.com/YashraaComparor"
                                            target="_blank">
                                            {/* <img
                                                src="/static/img/twitter.jpg"
                                                style={{
                                                    width: '35px',
                                                    height: '35px',
                                                }}></img> */}

                                            <Image
                                                // loader={imageLoader}
                                                src={
                                                    'https://yashra.azureedge.net/images/social-icons/twitter.png'
                                                }
                                                width={45}
                                                height={45}
                                                // priority={true}
                                                // placeholder="blur"
                                                // blurDataURL="/static/img/linkinLogo.jpg"
                                                alt="twitter"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="linkin-logo"
                                            href="https://www.linkedin.com/in/yashraa-pricecomparisonsite-795284265/"
                                            target="_blank">
                                            {/* <img
                                                src="/static/img/linkinLogo.jpg"
                                                style={{
                                                    width: '35px',
                                                    height: '35px',
                                                }}></img> */}

                                            <Image
                                                // loader={imageLoader}
                                                src={
                                                    'https://yashra.azureedge.net/images/social-icons/linkin.webp'
                                                }
                                                width={45}
                                                height={45}
                                                // priority={true}
                                                // placeholder="blur"
                                                // blurDataURL="/static/img/linkinLogo.jpg"
                                                alt="linkinLogo"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="yt-logo"
                                            href="https://www.youtube.com/@yashraapricecomparisonsite3377"
                                            target="_blank">
                                            {/* <img
                                                src="/static/img/ytLogo.jpg"
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                }}></img> */}
                                            <Image
                                                // loader={imageLoader}
                                                src={
                                                    'https://yashra.azureedge.net/images/social-icons/youtube.webp'
                                                }
                                                width={45}
                                                height={45}
                                                // priority={true}
                                                // placeholder="blur"
                                                // blurDataURL="/static/img/linkinLogo.jpg"
                                                alt="ytLogo"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="instagram"
                                            href="https://www.instagram.com//images/yashraapricecomparisonsite/"
                                            target="_blank">
                                            {/* <img
                                                src="/static/img/instagram (1).jpg"
                                                style={{
                                                    width: '35px',
                                                    height: '35px',
                                                }}></img> */}
                                            <Image
                                                // loader={imageLoader}
                                                src={
                                                    'https://yashra.azureedge.net/images/social-icons/instagram.png'
                                                }
                                                width={45}
                                                height={45}
                                                // priority={true}
                                                // placeholder="blur"
                                                // blurDataURL="/static/img/linkinLogo.jpg"
                                                alt="instagram"
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </form>
                        </aside>
                    </div>
                </div>
            </div>

            {/* <p>
                    <span>We Using Safe Payment For:</span>
                    <Link href="/page/blank">
                        <a>
                            <img
                                src="/static/img/payment-method/1.jpg"
                                alt="martfury"
                            />
                        </a>
                    </Link>
                    <Link href="/page/blank">
                        <a>
                            <img
                                src="/static/img/payment-method/2.jpg"
                                alt="martfury"
                            />
                        </a>
                    </Link>
                    <Link href="/page/blank">
                        <a>
                            <img
                                src="/static/img/payment-method/3.jpg"
                                alt="martfury"
                            />
                        </a>
                    </Link>
                    <Link href="/page/blank">
                        <a>
                            <img
                                src="/static/img/payment-method/4.jpg"
                                alt="martfury"
                            />
                        </a>
                    </Link>
                    <Link href="/page/blank">
                        <a>
                            <img
                                src="/static/img/payment-method/5.jpg"
                                alt="martfury"
                            />
                        </a>
                    </Link>
                </p> */}
        </div>
        <div className="ps-footer__copyright">
            <p style={{ textAlign: 'center' }}>
                &copy;{new Date().getFullYear()} yashraa. All Rights Reserved
            </p>
        </div>
    </footer>
);

export default FooterSecond;
