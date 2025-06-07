import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';
import { baseUrl } from '~/repositories/Repository';
import { getItemBySlug } from '~/utilities/product-helper';
import Promotion from '~/components/elements/media/Promotion';
import { carouselStandard ,  carouselStandard1} from '~/utilities/carousel-helpers';
import LazyLoad from 'react-lazyload';
import Image from 'next/image';

const HomeDefaultBanner = ({ banner, promotionBanner }) => {
    const [bannerItems, setBannerItems] = useState(null);
    const [promotion1, setPromotion1] = useState(null);
    const [promotion2, setPromotion2] = useState(null);
    const [banners, setBanners] = useState([]);
    async function getBannerItems() {
        const responseData = await MediaRepository.getBannersBySlug(
            'banner-home-fullwidth'
        );
        if (responseData) {
            setBannerItems(responseData);
        }
    }

    async function getPromotions() {
        const responseData = await MediaRepository.getPromotionsBySlug(
            'home_fullwidth_promotions'
        );
        if (responseData) {
            setPromotion1(getItemBySlug(responseData, 'main_1'));
            setPromotion2(getItemBySlug(responseData, 'main_2'));
        }
    }
    let bannerVal = banner || [];
    let promotionBaner = promotionBanner || [];

    if (banners.length == 0) {
        if (bannerVal.length > 0) {
            setBanners(bannerVal);
        }
    }

    if (promotion1 == null) {
        if (promotionBaner.length > 0) {
            setPromotion1(promotionBaner);
        }
    }

    // useEffect(() => {
    //     getBannerItems();
    //     getPromotions();
    // }, []);

    const carouselSetting = {
        dots: false,
        infinite: true,
        speed: 750,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
    };

    const imageLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`;
    };
    // Views
    let mainCarouselView, promotionalView;
    if (banners && banners.length > 0) {
        const carouseItems = banners.map((item) => (
            <div className="slide-item" key={item.id}>
                <a
                    className="web-banner-cover bg--cover"
                    href={`category/category_id=${item.category_id}&page=1&items_per_page=20`}>
                    {/* <img
                        src={item.banner_image}
                        // src="/static/img/instagram (1).jpg"
                    /> */}
                    <Image
                        loader={imageLoader}
                        // src="http://151.106.35.158:8000/media/category_images/Home-Kitchen-removebg-preview.png"
                        src={item.banner_image.toString()}
                        // width={1800}
                        layout="fill"
                        priority={true}
                        // height={300}
                        placeholder="blur"
                        blurDataURL="/static/img/linkinLogo.jpg"
                        alt="abcd"
                    />
                </a>

                <a
                    className="mob-banner-cover bg--cover"
                    href={`category/category_id=${item.category_id}&page=1&items_per_page=20`}>
                    {/* <img
                        src={item.mob_banner_image}
                        // src="/static/img/instagram (1).jpg"
                    /> */}
                    <Image
                        loader={imageLoader}
                        src={item.mob_banner_image.toString()}
                        // width={1800}
                        layout="fill"
                        priority={true}
                        // height={300}
                        placeholder="blur"
                        blurDataURL="/static/img/linkinLogo.jpg"
                        alt="abcd"
                    />
                </a>
            </div>
        ));
        mainCarouselView = (
            <Slider {...carouselSetting} className="ps-carousel">
                {carouseItems}
            </Slider>
        );
        mainCarouselView = (
            <Slider
                {...carouselStandard}
                infinite={true}
                lazyLoad={true}
                slidesToShow={1}
                speed={750}
                slidesToScroll={1}
                autoplay={true}
                arrows={true}
                className="ps-carousel">
                {carouseItems}
            </Slider>
        );
        
    }
    if (promotion1 != null && promotion1.length > 0) {
        promotionalView = promotion1.slice(0, 2).map((promotion) => {
            {
            }
            return (
                <Promotion
                    link={promotion.img != null ? promotion.cat_url : ''}
                    image={promotion.img != null ? promotion.img : ''}
                />
            );
        });
    }
    return (
        <div className="ps-home-banner ps-home-banner--1">
            <div className="ps-container">
                <div className="ps-section__left">{mainCarouselView}</div>
                <div className="ps-section__right">
                    {promotionalView}
                    {/* <Promotion
                        link={
                            banners &&
                            banners.banner &&
                            banners.banner.length > 0 &&
                            banners.banner[2]
                                ? banners.banner[2].cat_url
                                : ''
                        }
                        image={
                            banners &&
                            banners.banner &&
                            banners.banner.length > 0 &&
                            banners.banner[2]
                                ? banners.banner[2].img
                                : ''
                        }
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default HomeDefaultBanner;
