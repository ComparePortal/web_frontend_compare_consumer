import React from 'react';
import Link from 'next/link';

const WidgetShopAds = () => {
    return (
        <aside className="widget widget_ads">
            <Link href="/category/category_id=2&page=1&items_per_page=20">
                <a>
                    <img src="/static/img/ads/product-ads.png" alt="martfury" />
                </a>
            </Link>
        </aside>
    );
};

export default WidgetShopAds;
