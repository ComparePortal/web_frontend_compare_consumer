import React, { useEffect, useState } from 'react';
import monitor from '../../../../public/static/img/monitor.jpg';
import two_in_one from '../../../../public/static/img/two_in_one.jpg';

const PromotionCategory = () => {
    return (
        <div className="promotions">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-3 pr-3">
                        <div className="card">
                            <h4>Top Deals on Headphones Product </h4>
                            <div
                                className="card-box"
                                style={{ marginTop: '15px' }}>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div className="products-grade">
                                            <a href="http://yashra.in/product/245369">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/bass.webp"
                                                    alt='bass'
                                                    className="product-img"
                                                    style={{
                                                        width: '75px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/245369">
                                                Headset
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/244760">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/headphones.webp"
                                                    alt='headphones'
                                                    className="product-img"
                                                    style={{
                                                        width: '94px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>{' '}
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/244760">
                                                Airdopes
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/366">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/earbuds.webp"
                                                    className="product-img"
                                                    alt='earbuds'
                                                    style={{
                                                        width: '130px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>{' '}
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/366">
                                                Earbuds
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/244764">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/neckband.webp"
                                                    className="product-img"
                                                    alt='neckband'
                                                    style={{
                                                        width: '92px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/244764">
                                                Neckband Headphone
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 pr-3">
                        <div className="card">
                            <h4>Top Deals On Computer Accessories</h4>
                            <div
                                className="card-box"
                                style={{ marginTop: '15px' }}>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div className="products-grade">
                                            <a href="http://yashra.in/product/751935">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/mouse.webp"
                                                    className="product-img"
                                                    alt='mouse'
                                                    style={{
                                                        width: '87px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>{' '}
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/751935">
                                                Mouse
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/3173">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/router.webp"
                                                    className="product-img"
                                                    alt='router'
                                                    style={{
                                                        width: '95px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>{' '}
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/3173">
                                                Wireless Router
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/232751">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/printer.webp"
                                                    className="product-img"
                                                    alt='printer'
                                                    style={{
                                                        width: '100px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/232751">
                                                Printer
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/228298">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/laptop.webp"
                                                    className="product-img"
                                                    alt='laptop'
                                                    style={{
                                                        width: '130px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/228298">
                                                Tablet
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 pr-3">
                        <div className="card">
                            <h4>
                                Upgrade your gadgets with Electronics Product
                            </h4>
                            <div
                                className="card-box"
                                style={{ marginTop: '15px' }}>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div className="products-grade">
                                            <a href="http://yashra.in/product/102075">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/camera.webp"
                                                    className="product-img"
                                                    alt='camera'
                                                    style={{
                                                        width: '108px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>{' '}
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/102075">
                                                Camera
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/2948">
                                                <img
                                                    src={
                                                        'https://yashra.azureedge.net/images/section2/two_in_one_laptop.webp'
                                                    }
                                                    className="product-img"
                                                    alt='two in one laptop'
                                                    style={{
                                                        width: '130px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>{' '}
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/2948">
                                                {' '}
                                                2 in 1 Laptop
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/1347">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/watch1.webp"
                                                    className="product-img"
                                                    alt='watch1'
                                                    style={{
                                                        width: '95px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>{' '}
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/1347">
                                                Smart Watch
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/98649">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/speaker.webp"
                                                    className="product-img"
                                                    alt='speaker'
                                                    style={{
                                                        width: '85px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>{' '}
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/98649">
                                                Bluetooth Speaker
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-12 col-lg-3">
                        <div className="card">
                            <h4>Get New Product For Home and Kitchen</h4>
                            <div
                                className="card-box"
                                style={{ marginTop: '15px' }}>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/735737">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/oven.webp"
                                                    className="product-img"
                                                    alt='oven'
                                                    style={{
                                                        width: '120px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>{' '}
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/735737">
                                                Oven
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/2979">
                                                <img
                                                    src={
                                                        'https://yashra.azureedge.net/images/section2/monitor.webp'
                                                    }
                                                    className="product-img"
                                                    alt='monitor'
                                                    style={{
                                                        width: '100px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/2979">
                                                Monitor
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/5388">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/geyser.webp"
                                                    className="product-img"
                                                    alt='geyser'
                                                    style={{
                                                        width: '95px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>{' '}
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/5388">
                                                Geyser
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6">
                                        <div class="products-grade">
                                            <a href="http://yashra.in/product/732983">
                                                <img
                                                    src="https://yashra.azureedge.net/images/section2/vacuum.webp"
                                                    className="product-img"
                                                    alt='vacuum'
                                                    style={{
                                                        width: '95px',
                                                        height: '87px',
                                                    }}
                                                />
                                            </a>{' '}
                                        </div>
                                        <div class="product-link">
                                            <a href="http://yashra.in/product/732983">
                                                Vaccum Cleaner
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
export default PromotionCategory;
