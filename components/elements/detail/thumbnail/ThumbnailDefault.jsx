// import React, { useEffect, useRef, useState } from 'react';
// import Slider from 'react-slick';
// import Lightbox from 'react-image-lightbox';
// import { baseUrl } from '~/repositories/Repository';
// import NextArrow from '~/components/elements/carousel/NextArrow';
// import PrevArrow from '~/components/elements/carousel/PrevArrow';
// import SimpleImageSlider from 'react-simple-image-slider';
// import Script from 'next/script';

// // import {
// //     Magnifier,
// //     GlassMagnifier,
// //     SideBySideMagnifier,
// //     PictureInPictureMagnifier,
// //     MOUSE_ACTIVATION,
// //     TOUCH_ACTIVATION
// //   } from "react-image-magnifiers";
// // import ReactImageMagnify from 'react-image-magnify';
// // import ReactImageZoom from 'react-image-zoom';

// const ThumbnailDefault = ({
//     product,
//     vertical = true,
//     isQuickoverview = false,
// }) => {
//     const galleryCarousel = useRef(null);
//     const variantCarousel = useRef(null);
//     const [gallery, setGallery] = useState(null);
//     const [variant, setVariant] = useState(null);
//     const [isOpen, setIsOpen] = useState(false);
//     const [photoIndex, setPhotoIndex] = useState(0);
//     const [productImages, setProductImages] = useState([]);
//     const [productImagesUrl, setProductImagesUrl] = useState([]);

//     const handleOpenLightbox = (e, imageIndex) => {
//         e.preventDefault();
//         setPhotoIndex(imageIndex);
//         setIsOpen(true);
//     };

//     useEffect(() => {
//         let images = [];
//         let imagesUrl = [];

//         console.log('imagesssss', product.product_images);
//         if (product && product.product_images.length > 0) {
//             product.product_images.map((item) => {
//                 console.log('item', item);
//                 // images.push(`${item.url}`);
//                 images.push(`${item}`);
//                 imagesUrl.push({ url: item });
//             });
//             setProductImages(images);
//             setProductImagesUrl(imagesUrl);
//         }
//         setGallery(galleryCarousel.current);
//         setVariant(variantCarousel.current);
//     }, [product]);

//     const gallerySetting = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         nextArrow: <NextArrow />,
//         prevArrow: <PrevArrow />,
//     };
//     const variantSetting = {
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 4,
//                     dots: false,
//                     arrows: false,
//                     vertical: false,
//                     infinite: false,
//                 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 4,
//                     dots: false,
//                     arrows: false,
//                     vertical: false,
//                     infinite: false,
//                 },
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 4,
//                     dots: false,
//                     arrows: false,
//                     vertical: false,
//                     infinite: false,
//                 },
//             },
//         ],
//     };
//     function srcSet() {
//         return images
//             .map((image) => {
//                 return `${imageBaseUrl}${image.name} ${image.vw}`;
//             })
//             .join(', ');
//     }

//     //Views
//     let lightboxView, variantCarouselView, imagesView, galleryImagesView;
//     if (productImages.length > 0) {
//         imagesView = productImages.map((item) => (
//             <div className="item side-img-carousel side-img-product" key={item}>
//                 <img src={item} alt={item} />
//             </div>
//         ));
//         galleryImagesView = productImages.map((item, index) => (
//             <div className="item" key={item}>
//                 <a
//                     href="#"
//                     className="product-detail-image"
//                     onClick={(e) => handleOpenLightbox(e, index)}>
//                     {isQuickoverview ? (
//                         <img src={item} alt={item} />
//                     ) : (
//                         <img
//                             src={item}
//                             style={{ margin: '0 auto', maxHeight: '460px' }}
//                             alt={item}
//                         />
//                     )}
//                 </a>
//             </div>
//         ));
//     }

//     // function SamplePrevArrow(props) {
//     //     const { className, style, onClick } = props;
//     //     return (
//     //         <div
//     //             className={className}
//     //             style={{ ...style, display: 'block', background: 'green' }}
//     //             onClick={onClick}
//     //         />
//     //     );
//     // }

//     // function SampleNextArrow(props) {
//     //     const { className, style, onClick } = props;
//     //     return (
//     //         <div
//     //             className={className}
//     //             style={{ ...style, display: 'block', background: 'red' }}
//     //             onClick={onClick}
//     //         />
//     //     );
//     // }
//     if (vertical) {
//         variantCarouselView = (
//             <Slider
//                 asNavFor={gallery}
//                 ref={(slider) => (variantCarousel.current = slider)}
//                 swipeToSlide={true}
//                 arrows={false}
//                 slidesToShow={
//                     productImages.length > 4 ? 4 : productImages.length
//                 }
//                 vertical={true}
//                 infinite={true}
//                 focusOnSelect={true}
//                 {...variantSetting}
//                 className="ps-product__variants">
//                 {imagesView}
//             </Slider>
//         );
//     } else {
//         variantCarouselView = (
//             <Slider
//                 asNavFor={gallery}
//                 ref={(slider) => (variantCarousel.current = slider)}
//                 swipeToSlide={true}
//                 slidesToShow={
//                     productImages.length > 3 ? 3 : productImages.length
//                 }
//                 vertical={false}
//                 arrows={false}
//                 centered={true}
//                 infinite={false}
//                 focusOnSelect={true}
//                 className="ps-product__variants">
//                 {imagesView}
//             </Slider>
//         );
//     }
//     if (isOpen) {
//         lightboxView = (
//             <Lightbox
//                 mainSrc={productImages[photoIndex]}
//                 nextSrc={productImages[(photoIndex + 1) % productImages.length]}
//                 prevSrc={
//                     productImages[
//                         (photoIndex + productImages.length - 1) %
//                             productImages.length
//                     ]
//                 }
//                 onCloseRequest={() => {
//                     setIsOpen(false);
//                 }}
//                 onMovePrevRequest={() => {
//                     setPhotoIndex(
//                         (photoIndex + productImages.length - 1) %
//                             productImages.length
//                     );
//                 }}
//                 onMoveNextRequest={() => {
//                     setPhotoIndex((photoIndex + 1) % productImages.length);
//                 }}
//             />
//         );
//     }

//     return (
//         <>
//             <div className="ps-product__thumbnail">
//                 <figure className="product-detail-img">
//                     <div className="ps-wrapper">
//                         <Slider
//                             {...gallerySetting}
//                             ref={(slider) => (galleryCarousel.current = slider)}
//                             asNavFor={variant}
//                             className="ps-product__gallery ps-carousel inside coder">
//                             {galleryImagesView}
//                         </Slider>
//                     </div>
//                 </figure>
//                 {variantCarouselView}
//                 {lightboxView}
//             </div>
//         </>
//     );
// };

// export default ThumbnailDefault;

import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import { baseUrl } from '~/repositories/Repository';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';

const ThumbnailDefault = ({
    product,
    vertical = true,
    isQuickoverview = false,
}) => {
    const galleryCarousel = useRef(null);
    const variantCarousel = useRef(null);
    const [gallery, setGallery] = useState(null);
    const [variant, setVariant] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [productImages, setProductImages] = useState([]);
    const [productImageSingle, setProductImageSingle] = useState('');
    const [productImageWidth, setProductImageWidth] = useState('');
    const [variantCarouselView, setVariantCarouselView] = useState('');

    const handleOpenLightbox = (e, imageIndex) => {
        e.preventDefault();
        setPhotoIndex(imageIndex);
        setIsOpen(true);
    };

    useEffect(() => {
        let images = [];

        if (product && product.product_images.length > 0) {
            let images = product.product_images.map((item, index) => {
                console.log('itemsss', item);
                // images.push(`${item}`);
                if (item != null) {
                    return item.toString();
                } else {
                    return '/static/img/not-found.jpg';
                }
            });
            // setProductImages(images);
            setProductImages((prevMovies) => [...prevMovies, ...images]);
            productImagesCollect(images);
        }
        setGallery(galleryCarousel.current);
        setVariant(variantCarousel.current);
        // document.addEventListener('.img-zoom-container', function () {
        //     console.log('aaaaaaa');
        //     var myElement =
        //         document.getElementsByClassName('img-zoom-container');
        //     myElement.addEventListener('mouseenter', function () {
        //         console.log('111111111111111111');
        //         $('.img-zoom-result').css('visibility', 'visible');

        //         // myElement.style.backgroundColor = 'lightblue';
        //         // myElement.style.visibility = 'visible';
        //         // myElement.textContent = 'Hovering!';
        //     });
        //     myElement.addEventListener('mouseleave', function () {
        //         console.log('222222222222');

        //         $('.img-zoom-result').css('visibility', 'hidden');
        //         // myElement.style.backgroundColor = 'initial';
        //         // myElement.style.visibility = 'hidden';
        //         // myElement.textContent = 'Hover over me';
        //     });
        // });
        // $('.img-zoom-container').hover(
        //     function (event) {
        //         $('.img-zoom-result').css('visibility', 'visible');
        //     },
        //     function () {
        //         $('.img-zoom-result').css('visibility', 'hidden');
        //     }
        // );
    }, [product]);
    var img, lens, result, cx, cy;
    function removeEventListner(imgSrc) {
        try {
            lens.removeEventListener('mousemove', moveLens);
            img.removeEventListener('mousemove', moveLens);
            /*and also for touch screens:*/
            lens.removeEventListener('touchmove', moveLens);
            img.removeEventListener('touchmove', moveLens);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                imageZoom('myimage', 'myresult', imgSrc);
            }, 200);
        }
    }
    function imageZoom(imgID, resultID, imgSrc) {
        try {
            (img = undefined),
                (lens = undefined),
                (result = undefined),
                (cx = undefined),
                (cy = undefined);
            img = document.getElementById(imgID);
            result = document.getElementById(resultID);
            /*create lens:*/
            let parentZoomContainer =
                document.getElementById('imgZoomContainer');
            if (parentZoomContainer) {
                let element = document.getElementsByClassName('img-zoom-lens');

                if (element.length > 0) {
                    parentZoomContainer.removeChild(element[0]);
                }
            }

            lens = document.createElement('DIV');
            lens.setAttribute('class', 'img-zoom-lens');
            /*insert lens:*/
            img.parentElement.insertBefore(lens, img);
            /*calculate the ratio between result DIV and lens:*/
            cx = result.offsetWidth / lens.offsetWidth;
            cy = result.offsetHeight / lens.offsetHeight;
            /*set background properties for the result DIV:*/
            result.style.removeProperty('backgroundImage');
            result.style.removeProperty('backgroundSize');
            result.style.removeProperty('background-position');
            result.style.backgroundImage = "url('" + imgSrc + "')";
            result.style.backgroundSize =
                img.width * cx + 'px ' + img.height * cy + 'px';
            /*execute a function when someone moves the cursor over the image, or the lens:*/
            lens.addEventListener('mousemove', moveLens);
            img.addEventListener('mousemove', moveLens);
            /*and also for touch screens:*/
            lens.addEventListener('touchmove', moveLens);
            img.addEventListener('touchmove', moveLens);
        } catch (error) {
            console.log('Errorr', error);
        }
    }
    function moveLens(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        /*calculate the position of the lens:*/
        x = pos.x - lens.offsetWidth / 2;
        y = pos.y - lens.offsetHeight / 2;
        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - lens.offsetWidth) {
            x = img.width - lens.offsetWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > img.height - lens.offsetHeight) {
            y = img.height - lens.offsetHeight;
        }
        if (y < 0) {
            y = 0;
        }
        /*set the position of the lens:*/
        lens.style.left = x + 'px';
        lens.style.top = y + 'px';
        /*display what the lens "sees":*/
        result.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';
    }
    function getCursorPos(e) {
        var a,
            x = 0,
            y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }

    const gallerySetting = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    const variantSetting = {
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
        ],
    };
    function srcSet() {
        return images
            .map((image) => {
                return `${imageBaseUrl}${image.name} ${image.vw}`;
            })
            .join(', ');
    }

    //Views
    let lightboxView, imagesView, galleryImagesView;

    function productImagesCollect(images) {
        if (images.length > 0) {
            imagesView = images.map((item, index) => {
                return (
                    <div
                        className="item side-img-product"
                        key={item}
                        onClick={() => {
                            setProductImageSingle(item);
                            getImgWidth(false, item);
                        }}>
                        <img className="tempImg" src={item} alt={item} />
                    </div>
                );
            });
            galleryImagesView = images.map((item, index) => {
                if (index == 0) setProductImageSingle(item);
                // 'd'
            });

            setTimeout(() => {
                getImgWidth(true, images[0]);
            }, 500);
        }
        sideImages(images);
    }

    function getImgWidth(isFirstTime = true, imgSrc) {
        const img = new Image();
        img.src = productImageSingle;

        img.onload = () => {
            setProductImageWidth(img.width + 'px');
            // console.log('iiiiiiiiiii', img.width);
        };
        if (isFirstTime) {
            imageZoom('myimage', 'myresult', imgSrc);
        } else {
            removeEventListner(imgSrc);
        }
    }

    // function SamplePrevArrow(props) {
    //     const { className, style, onClick } = props;
    //     return (
    //         <div
    //             className={className}
    //             style={{ ...style, display: 'block', background: 'green' }}
    //             onClick={onClick}
    //         />
    //     );
    // }

    // function SampleNextArrow(props) {
    //     const { className, style, onClick } = props;
    //     return (
    //         <div
    //             className={className}
    //             style={{ ...style, display: 'block', background: 'red' }}
    //             onClick={onClick}
    //         />
    //     );
    // }

    function sideImages(productImages) {
        if (vertical) {
            setVariantCarouselView(
                <Slider
                    asNavFor={gallery}
                    ref={(slider) => (variantCarousel.current = slider)}
                    swipeToSlide={true}
                    arrows={false}
                    slidesToShow={
                        productImages.length > 4 ? 4 : productImages.length
                    }
                    vertical={true}
                    infinite={true}
                    focusOnSelect={true}
                    {...variantSetting}
                    className="ps-product__variants">
                    {imagesView}
                </Slider>
            );
        } else {
            setVariantCarouselView(
                <Slider
                    asNavFor={gallery}
                    ref={(slider) => (variantCarousel.current = slider)}
                    swipeToSlide={true}
                    slidesToShow={
                        productImages.length > 3 ? 3 : productImages.length
                    }
                    vertical={false}
                    arrows={false}
                    centered={true}
                    infinite={false}
                    focusOnSelect={true}
                    className="ps-product__variants">
                    {imagesView}
                </Slider>
            );
        }
        if (isOpen) {
            lightboxView = (
                <Lightbox
                    mainSrc={productImages[photoIndex]}
                    nextSrc={
                        productImages[(photoIndex + 1) % productImages.length]
                    }
                    prevSrc={
                        productImages[
                            (photoIndex + productImages.length - 1) %
                                productImages.length
                        ]
                    }
                    onCloseRequest={() => {
                        setIsOpen(false);
                    }}
                    onMovePrevRequest={() => {
                        setPhotoIndex(
                            (photoIndex + productImages.length - 1) %
                                productImages.length
                        );
                    }}
                    onMoveNextRequest={() => {
                        setPhotoIndex((photoIndex + 1) % productImages.length);
                    }}
                />
            );
        }
    }

    const handleMouseEnter = () => {
        document.getElementsByClassName('img-zoom-result')[0].style.visibility =
            'visible';
    };

    const handleMouseLeave = () => {
        document.getElementsByClassName('img-zoom-result')[0].style.visibility =
            'hidden';
    };

    return (
        <>
            <div className="ps-product__thumbnail">
                <figure className="product-detail-img">
                    <div
                        className="ps-wrapper"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyCenter: 'center',
                            height: '500px',
                        }}>
                        {/* <Slider
                            {...gallerySetting}
                            ref={(slider) => (galleryCarousel.current = slider)}
                            asNavFor={variant}
                            className="ps-product__gallery ps-carousel inside coder">
                            {galleryImagesView}
                        </Slider> */}
                        <div
                            class="img-zoom-container"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            id="imgZoomContainer"
                            style={{
                                width: productImageWidth.toString(),
                                maxWidth: '550px',
                                margin: '0 auto',
                            }}>
                            <img
                                id="myimage"
                                src={productImageSingle}
                                width="auto"
                                height="auto"
                            />
                        </div>
                    </div>
                </figure>
                {variantCarouselView}
                {lightboxView}
            </div>
        </>
    );
};

export default ThumbnailDefault;
