import React, { useState, useEffect } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import useEcomerce from '~/hooks/useEcomerce';
import { formatCurrency } from '~/utilities/product-helper';
// import { VariationComponent } from './VariationComponent';

const ModuleDetailShoppingActions = ({
    ecomerce,
    product,
    comparePricePortal,
    extended = false,
    isComparePricePortalLoad,
    isInternetCheck,
}) => {
    console.log('getUserAnalyticsData', product);

    const [quantity, setQuantity] = useState(1);
    const [allPortalPriceList, setAllPortalPriceList] = useState([]);

    const [isNotAvailable, setNotAvailable] = useState(false);
    const Router = useRouter();
    const { addItem } = useEcomerce();
    function handleAddItemToCart(e) {
        e.preventDefault();
        addItem(
            { id: product.id, quantity: quantity },
            ecomerce.cartItems,
            'cart'
        );
    }

    const [isColor, setColor] = useState(true);

    const [isSize, setSize] = useState(false);

    const colorsClick =()=>{
        setColor(true);
        setSize(false);
    }

    // Send Axios request to get the variation

    const [variation, setVariation] = useState([]);

    const fetchVariationDetail = async () => {
        try {
            const url = window.location.href 
            const url_list = url.split("/")
            const product_id = url_list[url_list.length - 1] 

          const res = await axios.get(
            `https://yashra.in:8002/api/get_variation?product_id=${product_id}`
          );
          console.log("variation", res.data);
          setVariation(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    
      useEffect(() => { 
        console.log("RUNNING...");
        fetchVariationDetail();
      }, []);

    const [activeSizeVariation, setActiveSizeVariation] = useState(``);
    useEffect(() => {
        // Make sure there is at least one variation
        if (variation.length > 0) {
          setActiveSizeVariation(variation[0].variant);
        }
      }, [variation]);


    let iconSize = 35;
    function handleBuynow(e) {
        e.preventDefault();
        // addItem(
        //     { id: product.id, quantity: quantity },
        //     ecomerce.cartItems,
        //     'cart'
        // );
        // setTimeout(function () {
        Router.push(product.product_detail_page_url);
        // }, 1000);
    }

    function handleAlternateBuynow(e, url) {
        e.preventDefault();
        // Router.push(url);
        getUserAnalyticsData(e, url);
        window.open(url);
    }

    const getUserAnalyticsData = async (e, target_url) => {
        let source = e.target.innerHTML;
        source = source.replace('Go to ', '');
        let product = window.location.href;
        let product_detail = product.split('/');
        let product_id = product_detail[product_detail.length - 1];
        product_id = product_id.replace('#specificationList', '');

        try {
            const res = await axios.get('https://api.ipify.org/?format=json');
            if (res.data && res.data.ip) {
                let user_data = {
                    ip: res.data.ip,
                    redirect_list: {
                        product_id: product_detail[product_detail.length - 1],
                        source: source,
                        target_url: target_url,
                    },
                };
                console.log('buttib ', user_data);
                await ProductRepository.saveUserAnalyticsData(user_data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        // console.log('cccccccccccccccccccc', comparePricePortal);
        // if (comparePricePortal.length > 0) {
        //     arrangingPortals();
        // }
    }, [comparePricePortal, isComparePricePortalLoad, isInternetCheck]);

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to compare listing!`,
        });
        modal.update;
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This item has been added to your wishlist`,
        });
        modal.update;
    };

    function handleIncreaseItemQty(e) {
        e.preventDefault();
        setQuantity(quantity + 1);
    }

    function handleDecreaseItemQty(e) {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    let priceCompareListView;
    let allCompareListView = [];
    
    if (comparePricePortal) {
        for (let item of comparePricePortal) {
            if (
                item.site_name &&
                item.url
                // && item.price
            ) {
                let imgUrl = '',
                    actionLabel = '';
                let isOutofstock = false;
                if (item.price == null || item.price == 'null') {
                    isOutofstock = true;
                } else {
                    if (item.price) {
                        let price = formatCurrency(
                            parseInt(item?.price.toString().replaceAll(',', ''))
                        );
                        
                        
                        if (price == 'NA') {
                            isOutofstock = true;
                        }
                        
                    } else {
                        isOutofstock = true;
                    }
                }
                switch (item.site_name) {
                    case 'Amazon':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/amazon.webp';
                        // imgUrl = '/static/img/amzon.';
                        actionLabel = 'Go to Amazon';
                        break;
                    case 'Flipkart':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/flipkart.webp';
                        actionLabel = 'Go to Flipkart';
                        break;
                    case 'vijaysales':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/vijaysales.webp';
                        actionLabel = 'Go to Vijay Sales';
                        break;
                    case 'croma':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/croma.webp';
                        actionLabel = 'Go to Croma';
                        break;
                    case 'samsung':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/samsung.webp';
                        // '/static/img/sam.png';
                        actionLabel = 'Go to Samsung';
                        break;
                    case 'mi':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/mi.webp';
                        actionLabel = 'Go to Mi Store';
                        break;
                    case 'redmi':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/mi.webp';
                        actionLabel = 'Go to Mi Store';
                        break;
                    case 'hp':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/HP.webp';
                        actionLabel = 'Go to HP Store';
                        break;
                    case 'reliancedigital':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/Reliance-digital.webp';
                        actionLabel = 'Go to Reliance Digital';
                        break;
                    case 'nykaa':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/Nykaa.webp';
                        actionLabel = 'Go to Nykaa';
                        break;
                    case 'iherb':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/iHerb-logo.webp';
                        actionLabel = 'Go to iHerb';
                        break;
                    case 'Club Factory':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/Club_Factory_Logo.webp';
                        actionLabel = 'Go to Club Factory';
                        break;
                    case 'myntra':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/myntra.webp';
                        actionLabel = 'Go to Myntra';
                        break;
                    case 'jiomart':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/jio-mart.webp';
                        actionLabel = 'Go to JioMart';
                        break;
                    case 'bajajmall':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/bajaj-mall.webp';
                        actionLabel = 'Go to BajajMall';
                        break;
                    case 'addmecart':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/addmicart.webp';
                        actionLabel = 'Go to AddMeCart';
                        break;
                    case 'fliptwirls':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/fliptwirls.webp';
                        actionLabel = 'Go to FliptWirls';
                        break;
                    case 'health-mall':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/health-mall.webp';
                        actionLabel = 'Go to Health-Mall';
                        break;
                    case 'ubuy':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/Ubuy-logo.webp';
                        actionLabel = 'Go to Ubuy';
                        break;
                    case 'moglix':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/moglix.webp';
                        actionLabel = 'Go to moglix';
                        break;
                    case 'poorvika':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/poorvika.webp';
                        actionLabel = 'Go to Poorvika';
                        break;
                    case 'laptopstoreindia':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/laptop-store-india-logo.webp';
                        actionLabel = 'Go to LaptopStoreIndia';
                        break;
                    // case 'laptopstoreindia':
                    // imgUrl = '/static/img/downloadd.png';
                    // actionLabel = 'Go to LaptopStoreIndia';
                    // break;
                    case 'newgadgetsindia':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/newgadgetsindia.webp';
                        actionLabel = 'Go to NewGadgetsIndia';
                        break;
                    case 'vlebazaar':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/vlebazaar.webp';
                        actionLabel = 'Go to vlebazaar';
                        break;
                    case 'bidbuddy':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/bidbuddy.webp';
                        actionLabel = 'Go to BidBuddy';
                        break;
                    case 'dillimal':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/dillimall.webp';
                        actionLabel = 'Go to Dillimall';
                        break;
                    case 'designinfo':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/designinfo.webp';
                        actionLabel = 'Go to Designinfo';
                        break;
                    case 'futureforward':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/futurforward.webp';
                        actionLabel = 'Go to FuturForward';
                        break;
                    case 'imastudent':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/iamstudent.webp';
                        actionLabel = 'Go to Imastudent';
                        break;
                    case 'imaginext':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/imanginext.webp';
                        actionLabel = 'Go to Imanginext';
                        break;
                    case 'fotocentreindia':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/Foto-Centre-India.webp';
                        actionLabel = 'Go to FotoCentreIndia';
                        break;
                    case 'ibhejo':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/ibhejo.webp';
                        actionLabel = 'Go to iBhejo';
                        break;
                    case 'hyugalife':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/hyugalife.webp';
                        actionLabel = 'Go to Hyugalife';
                        break;
                    case 'healthkart':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/healthkart.webp';
                        actionLabel = 'Go to Healthkart';
                        break;
                    case 'wellbeingnutrition':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/wellbeingnutrition-2.webp';
                        actionLabel = 'Go to WellBeing';
                        break;
                    case 'kiwla':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/kiwla.webp';
                        actionLabel = 'Go to Kiwla';
                        break;
                    case 'nutrabay':
                        imgUrl =
                            'https://yashra.azureedge.net/portal-logos/nutrabay.webp';
                        actionLabel = 'Go to Nutrabay';
                        break;
                    default:
                        break;
                }
                console.log("outof ", isOutofstock, item.site_name)
                priceCompareListView = (
                    <tr
                        style={{
                            background: 'grey',
                        }}>
                        <td
                            className="compare-img"
                            style={{
                                opacity: isOutofstock
                                    ? 0.8
                                    : item.in_stock || item.site_name == 'croma'|| (item.site_name == "Amazon" && parseInt(item?.price.toString().replace(",", "")) > 0)
                                    ? 1
                                    : 0.8,
                            }}>
                            <img src={imgUrl} alt={item.site_name} />
                            {/* <div style={{ fontSize: '12px' }}>
                                    {item.site_name == 'croma' &&
                                        '(as per location)'}
                                </div> */}
                        </td>
                        <td
                            className="compare-title"
                            style={{
                                opacity: isOutofstock
                                    ? 0.8
                                    : item.in_stock || item.site_name == 'croma' || (item.site_name == "Amazon" && parseInt(item?.price.toString().replace(",", "")) > 0)
                                    ? 1
                                    : 0.8,
                            }}>
                            <div className="product-title-specification">
                                {item?.product_name}
                            </div>
                        </td>
                        {item.price && item.price != '' ? (
                            <td
                                className="compare-price"
                                style={{
                                    opacity: isOutofstock
                                        ? 0.8
                                        : item.in_stock ||
                                          item.site_name == 'croma' || (item.site_name == "Amazon" && parseInt(item?.price.toString().replace(",", "")) > 0)
                                        ? 1
                                        : 0.8,
                                    textAlign: 'center',
                                }}>
                                {/* <sup> */}
                                {/* {item.site_name == 'Amazon' && (
                                    <sub>
                                        <span
                                            style={{
                                                fontSize: '20px',
                                                marginRight: '1px',
                                            }}>
                                            *
                                        </span>
                                    </sub>
                                )} */}
                                {/* </sup> */}
                                &#8377;
                                {formatCurrency(
                                    parseInt(
                                        item?.price
                                            .toString()
                                            .replaceAll(',', '')
                                    )
                                )}
                                {item.site_name == 'Amazon' && (
                                    <sub>
                                        <span
                                            style={{
                                                fontSize: '20px',
                                                marginLeft: '1px',
                                            }}>
                                            *
                                        </span>
                                    </sub>
                                )}
                            </td>
                        ) : (
                            <td
                                style={{
                                    opacity: isOutofstock ? 0.8 : 1.0,
                                    textAlign: 'center',
                                    color: '#484646',
                                }}>
                                <span>Currently Unavailable</span>
                            </td>
                        )}
                        {isOutofstock ? (
                            <td
                                className="compare-goto"
                                style={{ opacity: 0.8 }}>
                                <div
                                    style={{
                                        background: 'grey',
                                        textAlign: 'center',
                                    }}
                                    className="goToBuySite">
                                    Out of stock
                                </div>
                            </td>
                        ) : (
                            <td
                                className="compare-goto"
                                style={{
                                    opacity: isOutofstock
                                        ? 0.8
                                        : item.in_stock ||
                                          item.site_name == 'croma' || (item.site_name == "Amazon" && parseInt(item?.price.toString().replace(",", "")) > 0)
                                        ? 1
                                        : 0.8,
                                }}>
                                {item.in_stock || item.site_name == 'croma' || (item.site_name == "Amazon" && parseInt(item?.price.toString().replace(",", "")) > 0) ? (
                                    <button
                                        className="goToBuySite"
                                        onClick={(e) =>
                                            handleAlternateBuynow(e, item?.url)
                                        }>
                                        {actionLabel}
                                        {/* <br /> */}
                                        {/* <div style={{ fontSize: '12px' }}>
                                            {item.site_name == 'croma' &&
                                                '(as per location)'}
                                        </div> */}
                                    </button>
                                ) : (
                                    <div
                                        style={{
                                            background: 'grey',
                                            textAlign: 'center',
                                        }}
                                        className="goToBuySite">
                                        Out of stock
                                    </div>
                                )}
                            </td>
                        )}
                    </tr>
                );
                // if (item.site_name == 'Amazon') {
                //     if (item.price && item.price != null && item.in_stock > 0) {
                //         allCompareListView.push(priceCompareListView);
                //     }
                // } else {
                allCompareListView.push(priceCompareListView);
                // }
                // setAllPortalPriceList(allCompareListView);
            }
        }
    }

    let featureList = product?.product_features ?? [];
    let featureItems = [];
    if (featureList) {
        let i = 1;
        for (let item of featureList) {
            if (i == 5) {
                break;
            }
            let itemView = <div className="feature-item">{item} </div>;
            featureItems.push(itemView);
            i++;
        }
    }

    if (!extended) {
        return (
            <div className="">
                {isInternetCheck ? (
                    <div>
                        <div class="abel">
                            Price comparison
                            <sup>
                                <span style={{ fontSize: '15px' }}>
                                    &nbsp; (*Amazon price may vary)
                                </span>
                            </sup>
                        </div>
                        <div
                            className="table-responsive price-comparison-list"
                            style={{
                                padding: '10px',
                                border: '1px solid #e1e1e1',
                            }}>
                            <span style={{ color: 'red' }}>
                                Please check your internet connection and try
                                again.
                            </span>
                        </div>
                        <p></p>
                    </div>
                ) : !isComparePricePortalLoad ? (
                    <div>
                        <div class="price-comparison-label">
                            Price comparison{' '}
                            <span style={{ fontSize: '15px' }}>
                                &nbsp; (*Amazon price may vary)
                            </span>
                        </div>
                        <div
                            className="table-responsive price-comparison-list"
                            style={{
                                padding: '10px',
                                border: '1px solid #e1e1e1',
                            }}>
                            <span style={{ color: '#ff1493' }}>
                                Comparing Real Time Price and Stock...
                            </span>
                        </div>
                        <p></p>
                    </div>
                ) : allCompareListView.length > 0 ? (
                    <div>
                        <div class="price-comparison-label">
                            Price comparison{' '}
                            <span style={{ fontSize: '15px' }}>
                                &nbsp; (*Amazon price may vary)
                            </span>
                        </div>
                        <div className="table-responsive price-comparison-list">
                            <table className="table price-list-table ps-table--specification">
                                <tbody>
                                    {/* <tr>
                                <td>
                                    <img
                                        style={{ width: '100px' }}
                                        src={
                                            product.product_source == 'Amazon'
                                                ? 'https://e7.pngegg.com/pngimages/518/95/png-clipart-amazon-com-logo-product-brand-trademark-amazon-web-services-logo-text-trademark.png'
                                                : 'https://www.ibrandstrategy.com/wp-content/uploads/2019/06/flipkart.jpg'
                                        }
                                    />
                                </td>
                                <td>
                                    <div className="product-title-specification">
                                        {product.product_title}
                                    </div>
                                </td>
                                <td>&#8377;{product.product_price}</td>
                                <td>
                                    <button
                                        style={{ width: '150px' }}
                                        className="goToBuySite"
                                        onClick={(e) => handleBuynow(e)}>
                                        {product.product_source == 'Amazon'
                                            ? 'Go To Amazon'
                                            : 'Go To Flipkart'}
                                    </button>
                                </td>
                            </tr> */}
                                    {allCompareListView}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            fontSize: '30px',
                            color: 'black',
                            fontWeight: 400,
                        }}>
                        Currently Unavailable
                    </div>
                )}
                {/* Color Variation Feature!! */}
                        {/* Serving the Variation Component Here! -- Later */}
                        {/* <VariationComponent /> */}

                        {/* Fetching the variationDetail with this div */}


                        <div className="color-variation my-3">
                            <div className="">
                            {(variation.length>0) && (<div className="d-flex">
                                    <div className="">

                                    <button 
                                    style={{
                                        color: "black",
                                        backgroundColor:"unset",
                                        fontSize: "1.7rem",
                                        padding: "0.5rem 2rem",
                                        border: "none",
                                        // borderRadius: isColor?"11px 11px 0px 0px":"unset",
                                    }}
                                    className="button"
                                    onClick={()=>{
                                        setColor(true)
                                        setSize(false)
                                    }}
                                    >Colors :</button>
                                    </div>
                                    <div className="attributes-values d-flex flex-wrap
                                    ">
                                        {(variation.length>0) && variation.map((variationGp, index) => { 
                                            return (
                                                <>
                                                    {
                                                    (variationGp.variant === activeSizeVariation) &&
                                                    (variationGp.mapped.map((colorVariation, colorIndex) => (
                                                        <div onClick={()=>{
                                                                const before_url = window.location.href.split("/")
                                                                before_url.pop()
                                                                const after_url = before_url.join("/")
                                                                window.location.href = `${after_url}/${colorVariation.variation_id}`
                                                            }} 
                                                            // Set main image to hover image and after mouseLeave set it to main image

                                                            onMouseEnter={()=>{
                                                                const mainImage = document.getElementById("myimage")
                                                                mainImage.src = colorVariation.image
                                                            }}

                                                            onMouseLeave={()=>{
                                                                const mainImage = document.getElementById("myimage")
                                                                const tempImg = document.getElementsByClassName("tempImg")[0]
                                                                mainImage.src = tempImg.src
                                                            }}

                                                        className="img-cont d-flex flex-column align-items-center ">
                                                            <img
                                                                style={{
                                                                    width: "7rem",
                                                                    height: "7rem",  
                                                                    padding: "0.5rem",
                                                                    border: "2px solid rgb(187 187 187)",
                                                                    margin: "0 1.5rem 15px 1.5rem",
                                                                    borderRadius: "8px",
                                                                    cursor: "pointer",
                                                                }}
                                                                src={colorVariation.image} alt="" className="attrib-img" />
                                                            <div className="attrib-title">{colorVariation.color}</div>
                                                        </div>
                                                    )))}
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>)}

                                {(variation.length>0 && variation[0].type != "") && (<div className="d-flex my-5">
                                    <div className="">
                                    <button
                                    style={{
                                        color: "black",
                                        backgroundColor: "unset",
                                        fontSize: "1.7rem",
                                        padding: "0.5rem 2rem",
                                        border: "none",
                                        // borderRadius: isSize?"11px 11px 0px 0px":"unset",
                                    }}
                                    className="button"
                                    onClick={() => {
                                        setSize(true)
                                        setColor(false)
                                    }}
                                    >Size :</button>
                                    </div>
                                    <div className="attributes-values d-flex">
                                        {(variation.length>0) && variation.map((variationGp, index) => {
                                            return (
                                                <>
                                                        <div className="img-cont d-flex flex-column align-items-center ">
                                                            <div className="size-variant" style={{
                                                                padding: "0.5rem",
                                                                border: activeSizeVariation === `${variationGp.variant}` ? '2px solid #642687' : '2px solid rgb(187 187 187)',
                                                                margin: "0px 1rem 15px 1rem",
                                                                borderRadius: "5px",
                                                                fontSize: "larger",
                                                                cursor: "pointer",
                                                            }} onClick={()=>{
                                                                setActiveSizeVariation(`${variationGp.variant}`)
                                                            }}>
                                                                {variationGp.type=="ram"?`${variationGp.variant} Ram`:`${variationGp.variant} Storage`
                                                            }
                                                            </div>
                                                        </div>
                                                </>
                                            );
                                        }
                                        )}
                                    </div>
                                </div>)}
                            </div>
                        </div>

                {/* END  */}

                {featureItems.length > 0 && (
                    <div
                        style={{
                            border: '1px solid #e1e1e1',
                            // padding: '0 20px 0 20px',
                        }}>
                        <div
                            class="price-comparison-label"
                            style={{
                                margin: '0',
                                padding: '10px 8px',
                                borderBottom: '1px solid #e1e1e1',
                            }}>
                            Key Features
                        </div>
                        <div
                            class="feature-grid"
                            style={{
                                padding: '0 20px 0 20px',
                                marginTop: '5px',
                            }}>
                            {featureItems}
                        </div>
                        <div
                            style={{
                                borderTop: '1px solid #e1e1e1',
                                padding: '10px 8px',
                            }}>
                            <a
                                href="#specificationList"
                                style={{
                                    fontSize: '16px',
                                    color: '#642687',
                                }}>
                                View all
                            </a>
                        </div>
                    </div>
                )}
                {/* <p></p>
                <div
                    style={{
                        fontSize: '18px',
                        margin: '10px 0px',
                        fontWeight: '600',
                    }}>
                    Share
                </div>
                < WhatsappShareButton
                    url={window.location.href}
                    title={product.product_title && product.product_title}
                    className="share-button">
                    <WhatsappIcon size={35} round />
                </ WhatsappShareButton>
                <TwitterShareButton
                    url={window.location.href}
                    title={product.product_title && product.product_title}
                    className="share-button">
                    <TwitterIcon size={35} round />
                </TwitterShareButton>
                <FacebookShareButton
                    url={window.location.href}
                    quote={product.product_title && product.product_title}
                    className="share-button">
                    <FacebookIcon size={iconSize} round />
                </FacebookShareButton>
                {/* <GooglePlusShareButton
                    url={window.location.href}
                    className="share-button">
                    <GooglePlusIcon size={iconSize} round />
                </GooglePlusShareButton> */}
                {/* <LinkedinShareButton
                    url={window.location.href}
                    title={product.product_title && product.product_title}
                    className="share-button">
                    <LinkedinIcon size={iconSize} round />
                </LinkedinShareButton>
                <PinterestShareButton
                    url={window.location.href}
                    media="/favicon.ico"
                    className="share-button">
                    <PinterestIcon size={iconSize} round />
                </PinterestShareButton>
                <TelegramShareButton
                    url={window.location.href}
                    title={product.product_title && product.product_title}
                    className="share-button">
                    <TelegramIcon size={iconSize} round />
                </TelegramShareButton> */}
            </div>
        );
    } else {
        return (
            <div className="ps-product__shopping extend">
                <div className="ps-product__btn-group">
                    <div className="ps-product__actions">
                        <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                            <i className="icon-chart-bars"></i>
                        </a>
                    </div>
                </div>
                <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
                    Buy Now
                </a>
            </div>
        );
    }
};

export default connect((state) => state)(ModuleDetailShoppingActions);
