import React, { useEffect, useState } from 'react';
import ad1 from '../../../../public/static/img/ad1.jpg';
import ad2 from '../../../../public/static/img/ad2.jpg';
import ad3 from '../../../../public/static/img/ad3.jpg';

const PromotionBanner2 = () => {
    return (
        <div className="promotions2">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4 pr-3">
                        <div className="card">
                            <a href="http://yashra.in/category/Vacuum%20Cleaners&category_id=3217">
                                <img
                                    src={
                                        'https://yashra.azureedge.net/images/section3/oven1.webp'
                                    }
                                    className="ad-banner"
                                    alt='oven1'
                                    style={{
                                        width: '100%',
                                        height: '290px',
                                    }}></img>
                            </a>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 pr-3">
                        <div className="card">
                            <a href="http://yashra.in/category/Vacuum%20Cleaners&category_id=191">
                                <img
                                    src={
                                        'https://yashra.azureedge.net/images/section3/camera1.webp'
                                    }
                                    className="ad-banner"
                                    alt='camera1'
                                    style={{
                                        width: '100%',
                                        height: '290px',
                                    }}></img>
                            </a>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 pl-3">
                        <div className="card">
                            <a href="http://yashra.in/category/Vacuum%20Cleaners&category_id=3213">
                                <img
                                    src={
                                        'https://yashra.azureedge.net/images/section3/vacuum1.webp'
                                    }
                                    className="ad-banner"
                                    alt='vacuum1'
                                    style={{
                                        width: '100%',
                                        height: '290px',
                                    }}></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PromotionBanner2;
