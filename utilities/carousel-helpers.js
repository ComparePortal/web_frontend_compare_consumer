import NextArrow from '../components/elements/carousel/NextArrow';
import PrevArrow from '../components/elements/carousel/PrevArrow';
import React from 'react';

export const carouselStandard = {
    dots: false,
    arrows: true,
    infinite: false,
    lazyload: true,
    speed: 750,
    slidesToShow: 6,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};
export const carouselStandard1 = {
    dots: false,
    arrows: true,
    infinite: false,
    lazyload: true,
    speed: 750,
    slidesToShow: 6,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: false,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
       
        
    ]
    }
    export const carouselStandard2 = {
        dots: false,
        arrows: true,
        infinite: false,
        lazyload: true,
        speed: 750,
        slidesToShow: 6,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
           
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                   
                },
            },
           
            
        ]
        }
export const carouselInSidebar = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

export const carouselFullwidth = {
    dots: false,
    infinite: false,
    speed: 750,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    lazyload: true,
    responsive: [
        {
            breakpoint: 1750,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 3,
                dots: true,
                arrows: false,
            },
        },

        {
            breakpoint: 1366,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 2,
                infinite: false,
                dots: true,
                arrows: false,
            },
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                dots: true,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                dots: true,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                dots: true,
                arrows: false,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                dots: true,
                arrows: false,
            },
        },
    ],
};

export const carouselSingle = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};
