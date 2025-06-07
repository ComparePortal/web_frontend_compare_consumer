import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import {
    carouselStandard,
    carouselStandard1,
} from '~/utilities/carousel-helpers';
import Image from 'next/image';

const HomePopularCategory = ({ popularCategories }) => {
    const Router = useRouter();
    const [popularCategoriesListView, setPpopularCategoriesListView] =
        useState(null);

    useEffect(() => {
        popularCatUi();
    }, [popularCategories]);

    function handlePopularCategoryClick(e, data) {
        window.sessionStorage.setItem('page', 1);
        e.preventDefault();
        if (data.url != null) {
            let makeBreadcrumbItem = [
                {
                    id: 0,
                    url: '/',
                    text: 'Home',
                    isLast: false,
                },
                {
                    id: data.id,
                    url: `/category/${data.name}&category_id=${data.id}`,
                    text: data.name,
                    isLast: true,
                },
            ];
            window.sessionStorage.setItem(
                'breadcrumbs',
                JSON.stringify(makeBreadcrumbItem)
            );
            Router.push(data.url);
        }
    }

    const imageLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`;
    };
    async function popularCatUi() {
        if (popularCategories && popularCategories.length > 0) {
            const slideItems = popularCategories.map((item) => (
                <a
                    href={`/category/${item.category_name}&category_id=${item.category_id}`}
                    id={`/category/${item.category_name}&category_id=${item.category_id}`}
                    onClick={(e) =>
                        handlePopularCategoryClick(e, {
                            name: item.category_name,
                            id: item.category_id,
                            url: `/category/${item.category_name}&category_id=${item.category_id}`,
                            fullName: item.category_full_name,
                        })
                    }
                    className="popular_cat_icon popular_icon popular-icon-flex">
                    <Image
                        loader={imageLoader}
                        src={item.category_small_image.toString()}
                        width={67}
                        height={67}
                        placeholder="blur"
                        blurDataURL="/static/img/linkinLogo.jpg"
                        alt="abcd"
                    />
                    <div className="popular_cat_name">
                        {item.category_full_name}
                    </div>
                </a>
            ));

            setPpopularCategoriesListView(
                <Slider
                    {...carouselStandard}
                    infinite={false}
                    lazyLoad={true}
                    slidesToShow={9}
                    speed={1000}
                    autoplay={false}
                    arrows={true}
                    className="ps-carousel outside">
                    {slideItems}
                </Slider>
            );
            // popularCategoriesListView = (
            //     <Slider
            //         {...carouselStandard1}
            //         infinite={false}
            //         lazyLoad={true}
            //         slidesToShow={9}
            //         speed={1000}
            //         autoplay={false}
            //         arrows={true}
            //         className="ps-carousel outside">
            //         {slideItems}
            //     </Slider>
            // );
        }
    }

    return (
        <div className="popular-product-list popular_cat_parent">
            <div class="container" style={{ background: '#fff' }}>
                <div class="row">
                    <div
                        class="col-6 col-lg-2 popular-category-parent"
                        style={{ paddingRight: '0px' }}>
                        <div className="popular-list-title popular-category-title-homepage">
                            <h3>{'Popular Category'}</h3>
                        </div>
                    </div>
                    <div class="col-6 col-lg-10" style={{ paddingLeft: '0px' }}>
                        <div className="ps-section__content">
                            {popularCategoriesListView}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePopularCategory;
