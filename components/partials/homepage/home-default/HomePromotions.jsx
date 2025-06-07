import React, { useEffect, useState } from 'react';

const HomePromotions = () => {
    return (
        <div className="promotions">
            <div className="container">
                <div className="row">
                    <div className=" col-12 col-lg-3 pr-3">
                        <div className="card">
                            <h4>Sell on yashra.in With New Compare Price </h4>
                            <div class="card-box">
                                <a href="http://yashra.in/category/Smart%20Watches&category_id=21">
                                    <img
                                        className="card-img"
                                        src={
                                            'https://yashra.azureedge.net/images/section1/watch.webp'
                                        }
                                        alt="watch"
                                    />
                                </a>
                            </div>
                            <div className="card-link">
                                <a href="http://yashra.in/category/Smart%20Watches&category_id=21">
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 pr-3">
                        <div className="card">
                            <h4>Upgrade Your Shopping This New Year</h4>
                            <div
                                className="card-box"
                                style={{ marginTop: '15px' }}>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div className="products-grade">
                                            <a
                                                target="_blank"
                                                href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=3797">
                                                <img
                                                    src={
                                                        'https://yashra.azureedge.net/images/section1/mixer.webp'
                                                    }
                                                    className="product-img"
                                                    alt="mixer"
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=3797">
                                                Mixer Grinder
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a
                                                target="_blank"
                                                href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=1601">
                                                <img
                                                    src={
                                                        'https://yashra.azureedge.net/images/section1/iron.webp'
                                                    }
                                                    className="product-img"
                                                    alt="iron"
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=1601">
                                                Iron
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a
                                                target="_blank"
                                                href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=1599">
                                                <img
                                                    src={
                                                        'https://yashra.azureedge.net/images/section1/dryer.webp'
                                                    }
                                                    className="product-img"
                                                    alt="dryer"
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=1599">
                                                Hair Dryer
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a
                                                target="_blank"
                                                href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=3799">
                                                <img
                                                    src={
                                                        'https://yashra.azureedge.net/images/section1/kettle.webp'
                                                    }
                                                    className="product-img"
                                                    alt="kettle"
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=3799">
                                                Electric Kettle
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-12 col-lg-3 pr-3">
                        <div className="card">
                            <h4>
                                {' '}
                                Get More Offers On Home & Kitchen Appliances{' '}
                            </h4>
                            <div class="card-box">
                                <a
                                    href="http://yashra.in/category/Refrigerators&category_id=3220"
                                    target="_blank"
                                    style={{ position: 'balnk;' }}>
                                    <img
                                        className="card-img"
                                        src={
                                            'https://yashra.azureedge.net/images/section1/appliances.webp'
                                        }
                                        alt="appliances"
                                    />
                                </a>
                            </div>
                            <div className="card-link">
                                <a href="http://yashra.in/category/Refrigerators&category_id=3220">
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className=" col-12 col-lg-3">
                        <div className="card">
                            <h4>Sell on yashra.in with Saving Price </h4>
                            <div
                                className="card-box"
                                style={{ marginTop: '15px' }}>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a
                                                target="_blank"
                                                href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=93">
                                                <img
                                                    src={
                                                        'https://yashra.azureedge.net/images/section1/monitor.webp'
                                                    }
                                                    className="product-img"
                                                    alt="monitor"
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=93">
                                                Monitor
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a
                                                target="_blank"
                                                href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=3798">
                                                <img
                                                    src={
                                                        'https://yashra.azureedge.net/images/section1/induction.webp'
                                                    }
                                                    className="product-img"
                                                    alt="induction"
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=3798">
                                                Induction Cooktop
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a
                                                target="_blank"
                                                href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=443">
                                                <img
                                                    src={
                                                        'https://yashra.azureedge.net/images/section1/Headphones.webp'
                                                    }
                                                    className="product-img"
                                                    alt="Headphones"
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=443">
                                                Headphone
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a
                                                target="_blank"
                                                href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=3112">
                                                <img
                                                    src={
                                                        'https://yashra.azureedge.net/images/section1/AC.webp'
                                                    }
                                                    className="product-img"
                                                    alt="AC"
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/category/Mobiles%20&%20Accessories&category_id=3112">
                                                AC
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePromotions;
