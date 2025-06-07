import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';

const ElectronicPromotions2 = (promotionBanner) => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        let bannerVal = promotionBanner || [];
        // console.log("useEddecr", bannerVal.banner)
        // console.log("nammer", banners.length)
        if (banners.length == 0) {
            // console.log("bannerVal", bannerVal)
            if (bannerVal.banner != null) {
                setBanners(bannerVal);
            }
        }
    }, [promotionBanner]);

    let promotionView = null;
    if (banners && banners.banner && banners.banner.length > 0) {
        promotionView = (
            <Link
                href={
                    banners && banners.banner && banners.banner.length > 0
                        ? banners.banner[3].cat_url
                        : ''
                }>
                <a className="ps-collection">
                    <img
                        src={
                            banners &&
                            banners.banner &&
                            banners.banner.length > 0
                                ? banners.banner[3].img
                                : ''
                        }
                        alt="martfury"
                    />
                </a>
            </Link>
        );
    }
    return (
        <div className="ps-promotions">
            <div className="container">{promotionView}</div>
        </div>
    );
};

export default ElectronicPromotions2;
