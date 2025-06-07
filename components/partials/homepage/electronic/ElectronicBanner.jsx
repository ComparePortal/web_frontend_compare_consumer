import React, { Component } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';

class ElectronicBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
        };
    }

    render() {
        let banners = this.props.banner || [];
        const carouselSettings = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
        };

        if (this.state.banners.length == 0) {
            if (banners.length > 0) {
                this.setState({ banners: banners });
            }
        }
        if (this.state.banners[0] && this.state.banners[0].img) {
        }

        return (
            <section className="ps-home-banner">
                <div className="container">
                    <div className="ps-section__left">
                        <Slider {...carouselSettings}>
                            <div className="item">
                                <Link
                                    href={
                                        this.state.banners[0] &&
                                        this.state.banners[0].cat_url
                                            ? this.state.banners[0].cat_url
                                            : ''
                                    }>
                                    <a>
                                        <img
                                            src={
                                                this.state.banners[0] &&
                                                this.state.banners[0].img
                                                    ? this.state.banners[0].img
                                                    : ''
                                            }
                                            alt="martfury"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="item">
                                <Link href="/shop">
                                    <a>
                                        <img
                                            src="/static/img/slider/home-7/2.jpg"
                                            alt="martfury"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="item">
                                <Link href="/category/category_id=90&page=1&items_per_page=20">
                                    <a>
                                        <img
                                            src="/static/img/slider/home-7/3.jpg"
                                            alt="martfury"
                                        />
                                    </a>
                                </Link>
                            </div>
                        </Slider>
                    </div>
                    <div className="ps-section__right">
                        <Link
                            href={
                                this.state.banners[1] &&
                                this.state.banners[1].cat_url
                                    ? this.state.banners[1].cat_url
                                    : ''
                            }>
                            <a className="ps-collection">
                                <img
                                    src={
                                        this.state.banners[1] &&
                                        this.state.banners[1].img
                                            ? this.state.banners[1].img
                                            : ''
                                    }
                                    alt="martfury"
                                />
                            </a>
                        </Link>
                        <Link
                            href={
                                this.state.banners[2] &&
                                this.state.banners[2].cat_url
                                    ? this.state.banners[2].cat_url
                                    : ''
                            }>
                            <a className="ps-collection">
                                <img
                                    src={
                                        this.state.banners[2] &&
                                        this.state.banners[2].img
                                            ? this.state.banners[2].img
                                            : ''
                                    }
                                    alt="camera & videos"
                                />
                            </a>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default ElectronicBanner;
