// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import BreadCrumb from '~/components/elements/BreadCrumb';
// import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
// import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
// import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
// import ProductRepository from '~/repositories/ProductRepository';
// import CollectionRepository from '~/repositories/CollectionRepository';
// import { useRouter } from 'next/router';
// import ProductItems from '~/components/partials/product/ProductItems';
// import PageContainer from '~/components/layouts/PageContainer';
// import FooterDefault from '~/components/shared/footers/FooterDefault';
// import FooterSecond from '~/components/shared/footers/FooterSecond';
// import Newletters from '~/components/partials/commons/Newletters';
// import styles from '~/scss/categoryProduct.module.scss';
// import ShopItems from '~/components/partials/shop/ShopItems';
// import { useDispatch, useSelector } from 'react-redux';
// import { useCookies } from 'react-cookie';
// import Cookies from 'js-cookie';
// import { setBreadcrumb } from '~/store/breadcrumb/action';
// import Modal from 'react-bootstrap/Modal';
// import { CloseOutlined } from '@ant-design/icons';

// const ProductCategoryScreen = () => {
//     // const getBreadcrumbItem = useSelector((state) => state.breadcrumb);
//     const [getBreadcrumbItem, setBreadcrumbItem] = useState([]);
//     const Router = useRouter();
//     const { slug } = Router.query;
//     const [category, setCategory] = useState(null);
//     const [productCount, setProductCount] = useState(0);
//     const [subCategory, setSubCategory] = useState(null);
//     const [brands, setBrands] = useState(null);
//     const [selectedBrands, setSelectedBrands] = useState(null);
//     const [cookies, setCookie] = useCookies(['breadcrumbs']);
//     const [priceRange, setPriceRange] = useState({
//         min_price: 0,
//         max_price: 0,
//     });
//     const dispatch = useDispatch();
//     const [selectedPriceRange, setSelectedPriceRange] = useState({
//         min_price: 0,
//         max_price: 0,
//     });
//     const [categoryName, setCategoryName] = useState(null);
//     const [itemsPerPage, setItemsPerPage] = useState(20);
//     const [pageSize, setPageSize] = useState(20);
//     const [pageNo, setPageNo] = useState(1);
//     const [categoryId, setCategoryId] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [isSubcategoryLoading, setSubcategoryLoading] = useState(true);
//     const [isBrandLoading, setBrandLoading] = useState(true);
//     const [isPriceLoading, setPriceLoading] = useState(true);
//     const [isPopularProducts, setPopularProducts] = useState(false);
//     const [modalShow, setModalShow] = useState(false);
//     const myRef = useRef(null);

//     let category_products = [];

//     function resetAllValues() {
//         setPriceLoading(true);
//         setBrandLoading(true);
//         setSubcategoryLoading(true);
//         // setItemsPerPage(20);
//         setPageSize(20);
//         setCategoryId(null);
//         setLoading(true);
//         setCategory(null);
//         setProductCount(0);
//         setBrands(null);
//         setPriceRange({ min_price: 0, max_price: 0 });
//         setSelectedPriceRange({ min_price: 0, max_price: 0 });
//         setCategoryName(null);
//         setSubCategory(null);
//     }

//     function setValuesFn(categoryData) {
//         if (categoryData != null) {
//             // if (
//             //     categoryData.sub_categories != null &&
//             //     categoryData.sub_categories.length > 0
//             // ) {
//             //     setSubCategory(categoryData.sub_categories);
//             // }
//             // if (
//             //     categoryData.product_brands != null &&
//             //     categoryData.product_brands.length > 0
//             // ) {
//             //     setBrands(categoryData.product_brands);
//             // }
//             if (categoryData.total_products != null) {
//                 setProductCount(categoryData.total_products);
//             }
//             // if (categoryData.max_min_price != null) {
//             //     setPriceRange(categoryData.max_min_price);
//             // }
//             if (categoryData.category_name != null) {
//                 setCategoryName(categoryData.category_name);
//             }
//         }
//     }

//     function setProductsFn(categoryData) {
//         for (let item in categoryData.products) {
//             categoryData.products[item].id = item;
//             category_products.push(categoryData.products[item]);
//         }
//         if (category_products && category_products.length > 0) {
//             setCategory(category_products);
//             // setTimeout(function () {
//             setLoading(false);
//             // }, 250);
//         }
//     }

//     async function getSubCategory(id) {
//         let getSubCategory = await CollectionRepository.getSubCategory(id);
//         if (getSubCategory && getSubCategory.length > 0) {
//             setSubCategory(getSubCategory);
//         }
//         setSubcategoryLoading(false);
//     }

//     async function getBrands(id) {
//'use strict';
// let getBrands = await CollectionRepository.getBrands(id);
//         if (getBrands && getBrands.length > 0) {
//             setBrands(getBrands);
//         }
//         setBrandLoading(false);
//     }

//     async function getPrices(id) {
//         let getPrice = await CollectionRepository.getPrices(id);
//         if (
//             getPrice &&
//             getPrice.length > 0 &&
//             getPrice[0] != null &&
//             getPrice[0].max_price != null &&
//             getPrice[0].min_price != null
//         ) {
//             setPriceRange(getPrice[0]);
//         }
//         setPriceLoading(false);
//     }

//     async function getCategry(endpoint, categoryId) {
//         if (endpoint) {
//             getUserData(endpoint, categoryId);
//             setLoading(true);
//             const responseData =
//                 await CollectionRepository.getProductsByCollectionSlug(
//                     endpoint
//                 );
//             if (
//                 responseData &&
//                 typeof responseData == 'object' &&
//                 Object.entries(responseData).length != 0
//             ) {
//                 let categoryKey = Object.keys(responseData);

//                 if (categoryKey[0] != null) {
//                     setCategoryId(categoryKey[0]);
//                     let categoryData = responseData[categoryKey[0]];
//                     setValuesFn(categoryData);
//                     if (
//                         categoryData &&
//                         categoryData.products &&
//                         Object.entries(categoryData.products).length != 0
//                     ) {
//                         setProductsFn(categoryData);
//                     } else {
//                         setCategory(null);
//                         setLoading(false);
//                     }
//                 } else {
//                     setCategory(null);
//                     setLoading(false);
//                 }
//             } else {
//                 setCategory(null);
//                 // setCategoryId(null);
//                 // setTimeout(function () {
//                 setLoading(false);
//                 // }, 250);
//             }
//         }
//     }

//     let tempId =
//         typeof window !== 'undefined'
//             ? window.sessionStorage.getItem('value')
//             : 1;

//     useEffect(() => {
//         setLoading(true);
//         setPopularProducts(false);
//         if (window.sessionStorage.getItem('breadcrumbs')) {
//             setBreadcrumbItem(
//                 JSON.parse(window.sessionStorage.getItem('breadcrumbs'))
//             );
//         }
//         const params = new URLSearchParams(slug);
//         const checkCategoryId = params.get('category_id');
//         const itemsPerPage = params.get('items_per_page');
//         if (!itemsPerPage) {
//             itemsPerPage = 20;
//         }
//         setItemsPerPage(itemsPerPage);

//         // const checkPageNo = params.get('Page') ? params.get('Page'):1;
//         // if (categoryId && checkCategoryId) {
//         //     if (categoryId != checkCategoryId) {
//         //         resetAllValues();
//         //     } else {
//         //         setCategory(null);
//         //         setPageSize(itemsPerPage);
//         //     }
//         // } else {.
//         let newPageNo = 1;
//         let lastValue = window.sessionStorage.getItem('page');
//         if (lastValue) {
//             newPageNo = lastValue;
//             window.sessionStorage.setItem('page', lastValue);
//         } else {
//             window.sessionStorage.setItem('page', 1);
//         }
//         resetAllValues();
//         // }
//         setCategoryName('');
//         setPageNo(newPageNo);
//         let getProductUrl = `category_id=${checkCategoryId}&page=${newPageNo}&items_per_page=${itemsPerPage}`;
//         if (
//             checkCategoryId == 1 ||
//             checkCategoryId == 3200 ||
//             checkCategoryId == 2743
//         ) {
//             getPopularProduct(checkCategoryId);
//             getSubCategory(checkCategoryId);
//         } else {
//             if (checkCategoryId) {
//                 getCategry(getProductUrl, checkCategoryId);
//                 getSubCategory(checkCategoryId);
//                 getBrands(checkCategoryId);
//                 getPrices(checkCategoryId);
//             }
//             if (checkCategoryId == 3810) {
//                 setModalShow(true);
//             }
//         }
//     }, [slug, tempId]);

//     async function getPopularProduct(categoryId) {
//         setPopularProducts(true);

//         const responseData = await CollectionRepository.getPopularProduct(
//             categoryId
//         );
//         if (responseData) {
//             let products = [];
//             for await (let item of responseData) {
//                 item.id = item.product_id;
//                 item.product_images = [item.image_url];
//                 products.push(item);
//             }
//             if (products && products.length > 0) {
//                 setCategory(products);
//                 setLoading(false);
//                 setProductCount(products.length);
//             }
//         }
//     }

//     const breadCrumb = [
//         {
//             text: 'Home',
//             url: '/',
//         },
//         // {
//         //     text: 'Shop',
//         //     url: '/',
//         // },
//         {
//             text: categoryName ? categoryName : '',
//         },
//     ];
//     // if (
//     //     getBreadcrumbItem.breadcrumbs.length == 0 &&
//     //     cookies.breadcrumbs != undefined
//     // ) {
//     //     dispatch(setBreadcrumb(cookies.breadcrumbs));
//     // }

//     const getUserData = async (url, categoryId) => {
//         try {
//             const res = await axios.get('https://api.ipify.org/?format=json');
//             if (res.data && res.data.ip) {
//                 await CollectionRepository.saveUserData(
//                     res.data.ip,
//                     url,
//                     categoryId
//                 );
//             }
//         } catch (error) {
//             console.log('error', error);
//         }
//     };

//     function handlePagination(page, pageSize) {
//         window.sessionStorage.setItem('page', page);
//         setPageNo(page);
//         let endpoint = `category_id=${categoryId}&page=${page}&items_per_page=${itemsPerPage}`;
//         if (selectedBrands && selectedBrands.length > 0) {
//             let brandValue = '';
//             for (let x of selectedBrands) {
//                 brandValue = brandValue + '&brands=' + x;
//             }
//             endpoint += brandValue;
//         }
//         // Router.push(endpoint);
//         getCategry(endpoint, categoryId);
//         // myRef.current.scrollIntoView();
//     }

//     function handleSelectBrand(e) {
//         setPageNo(1);

//         let brandValue = '';
//         setSelectedBrands(e);
//         for (let x of e) {
//             brandValue = brandValue + '&brands=' + x;
//         }

//         getCategry(
//             `category_id=${categoryId}&page=${1}&items_per_page=${itemsPerPage}${brandValue}`,
//             categoryId
//         );
//     }

//     function handleChangeRange(value) {
//         setPageNo(1);
//         let endpoint = `category_id=${categoryId}&page=${1}&items_per_page=${itemsPerPage}&min_price=${
//             value[0]
//         }&max_price=${value[1]}`;
//         if (selectedBrands && selectedBrands.length > 0) {
//             let brandValue = '';
//             for (let x of selectedBrands) {
//                 brandValue = brandValue + '&brands=' + x;
//             }
//             endpoint += brandValue;
//         }
//         // Router.push(endpoint);
//         getCategry(endpoint, categoryId);
//     }

//     function handlePerPageItemClick(value) {
//         setItemsPerPage(value);
//         let endpoint = `category_id=${categoryId}&page=${pageNo}&items_per_page=${value}`;
//         if (selectedBrands && selectedBrands.length > 0) {
//             let brandValue = '';
//             for (let x of selectedBrands) {
//                 brandValue = brandValue + '&brands=' + x;
//             }
//             endpoint += brandValue;
//         }
//         // Router.push(endpoint);
//         getCategry(endpoint, categoryId);
//     }

//     return (
//         <PageContainer
//             footer={<FooterSecond classes="ps-footer--electronic" />}
//             title={category ? category.name : 'Category'}
//             boxed={true}>
//             <div className="ps-page--shop">
//                 <BreadCrumb breacrumb={getBreadcrumbItem || []} />
//                 <div className="container">
//                     <Modal
//                         show={modalShow}
//                         onHide={() => setModalShow(false)}
//                         size="lg"
//                         aria-labelledby="contained-modal-title-vcenter"
//                         // centered
//                         style={{ border: '0px' }}>
//                         <Modal.Body style={{ background: '#560c80' }}>
//                             <div
//                                 style={{
//                                     display: 'flex',
//                                     justifyContent: 'space-between',
//                                 }}>
//                                 <span></span>
//                                 <img
//                                     src="https://yashra.azureedge.net/web-logo.webp"
//                                     alt="yashraa"
//                                     style={{ width: '18%' }}
//                                 />
//                                 <CloseOutlined
//                                     style={{ fontSize: '22px', color: 'white' }}
//                                     onClick={(e) => {
//                                         setModalShow(false);
//                                     }}
//                                 />
//                             </div>
//                             <p
//                                 style={{
//                                     color: 'white',
//                                     fontSize: '15px',
//                                     padding: '10px 10px 5px 10px',
//                                 }}>
//                                 Dear Customer, <br></br>Welcome to{' '}
//                                 <a
//                                     style={{ color: 'white' }}
//                                     href="http://yashra.in/">
//                                     Yashra.in
//                                 </a>
//                                 <p style={{ marginTop: '10px' }}></p>The
//                                 products in this category are in beta testing.
//                                 You can view and shop the products but
//                                 comparisons are not yet available.
//                                 <p style={{ marginTop: '10px' }}></p>Thanks for
//                                 your support of our project. We are very excited
//                                 to hear what you think. You can write your
//                                 suggestions and ideas and mail us at{' '}
//                                 <a
//                                     style={{ color: 'white' }}
//                                     href="mailto:info@yashra.in">
//                                     info@yashra.in
//                                 </a>
//                                 <p style={{ marginTop: '10px' }}></p>Thanks &
//                                 Regards
//                                 <br></br>Team Yashraa
//                             </p>
//                         </Modal.Body>
//                     </Modal>

//                     <div className="ps-layout--shop ps-shop--category">
//                         <div className="ps-layout__left">
//                             {subCategory && subCategory.length > 0 && (
//                                 <WidgetShopCategories
//                                     subCategoryData={subCategory}
//                                     // loading={loading}
//                                     loading={isSubcategoryLoading}
//                                 />
//                             )}
//                             {brands && brands.length > 0 && (
//                                 <WidgetShopBrands
//                                     brandsData={brands}
//                                     handleSelectBrand={handleSelectBrand}
//                                     // loading={loading}
//                                     loading={isBrandLoading}
//                                     brandTitle={
//                                         categoryId == 2743 ? 'Author' : 'Brands'
//                                     }
//                                 />
//                             )}
//                             {priceRange.max_price != 0 &&
//                                 priceRange.max_price != null && (
//                                     <WidgetShopFilterByPriceRange
//                                         priceRangeData={priceRange}
//                                         handleChangeRange={handleChangeRange}
//                                     />
//                                 )}
//                         </div>

//                         {/* <div className="ps-layout__right">
//                             <h3 className="ps-shop__heading">
//                                 {categoryName && categoryName}
//                             </h3>
//                             {productItemsViews}
//                         </div> */}
//                         <ShopItems
//                             // pageSize={pageSize}
//                             pageSize={itemsPerPage}
//                             columns={6}
//                             products={category}
//                             productCount={productCount}
//                             loading={loading}
//                             handlePagination={handlePagination}
//                             handlePerPageItemClick={handlePerPageItemClick}
//                             itemsPerPage={itemsPerPage}
//                             pageNumber={pageNo}
//                             searchKeyword=""
//                             parentPage={'category'}
//                             isPopularProducts={isPopularProducts}
//                         />
//                     </div>
//                 </div>
//             </div>
//             {/* <Newletters layout="container" /> */}
//         </PageContainer>
//     );
// };
// export default ProductCategoryScreen;
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import ProductRepository from '~/repositories/ProductRepository';
import CollectionRepository from '~/repositories/CollectionRepository';
import { useRouter } from 'next/router';
import ProductItems from '~/components/partials/product/ProductItems';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import FooterSecond from '~/components/shared/footers/FooterSecond';
import Newletters from '~/components/partials/commons/Newletters';
import styles from '~/scss/categoryProduct.module.scss';
import ShopItems from '~/components/partials/shop/ShopItems';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { setBreadcrumb } from '~/store/breadcrumb/action';
import Modal from 'react-bootstrap/Modal';
import { CloseOutlined } from '@ant-design/icons';

const ProductCategoryScreen = () => {
    // const getBreadcrumbItem = useSelector((state) => state.breadcrumb);
    const [getBreadcrumbItem, setBreadcrumbItem] = useState([]);
    const Router = useRouter();
    const { slug } = Router.query;
    const [category, setCategory] = useState(null);
    const [productCount, setProductCount] = useState(0);
    const [subCategory, setSubCategory] = useState(null);
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState(null);
    const [cookies, setCookie] = useCookies(['breadcrumbs']);
    const [priceRange, setPriceRange] = useState({
        min_price: 0,
        max_price: 0,
    });
    const dispatch = useDispatch();
    const [selectedPriceRange, setSelectedPriceRange] = useState({
        min_price: 0,
        max_price: 0,
    });
    const [categoryName, setCategoryName] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [pageSize, setPageSize] = useState(20);
    const [pageNo, setPageNo] = useState(1);
    const [categoryId, setCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubcategoryLoading, setSubcategoryLoading] = useState(true);
    const [isBrandLoading, setBrandLoading] = useState(true);
    const [isPriceLoading, setPriceLoading] = useState(true);
    const [isPopularProducts, setPopularProducts] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [isPriceRangeSelected, setPriceRangeSelected] = useState(false);
    const myRef = useRef(null);

    let category_products = [];

    function resetAllValues() {
        setPriceLoading(true);
        setBrandLoading(true);
        setSubcategoryLoading(true);
        // setItemsPerPage(20);
        setPageSize(20);
        // setCategoryId(null);
        setLoading(true);
        setCategory(null);
        setProductCount(0);
        // setBrands([]);
        // setPriceRange({ min_price: 0, max_price: 0 });
        // setSelectedPriceRange({ min_price: 0, max_price: 0 });
        setCategoryName(null);
        setSubCategory(null);
    }

    function setValuesFn(categoryData) {
        if (categoryData != null) {
            // if (
            //     categoryData.sub_categories != null &&
            //     categoryData.sub_categories.length > 0
            // ) {
            //     setSubCategory(categoryData.sub_categories);
            // }
            // if (
            //     categoryData.product_brands != null &&
            //     categoryData.product_brands.length > 0
            // ) {
            //     setBrands(categoryData.product_brands);
            // }
            if (categoryData.total_products != null) {
                setProductCount(categoryData.total_products);
            }
            // if (categoryData.max_min_price != null) {
            //     setPriceRange(categoryData.max_min_price);
            // }
            if (categoryData.category_name != null) {
                setCategoryName(categoryData.category_name);
            }
        }
    }

    function setProductsFn(categoryData) {
        for (let item in categoryData.products) {
            categoryData.products[item].id = item;
            category_products.push(categoryData.products[item]);
        }
        if (category_products && category_products.length > 0) {
            setCategory(category_products);
            // setTimeout(function () {
            setLoading(false);
            // }, 250);
        }
    }

    async function getSubCategory(id) {
        let getSubCategory = await CollectionRepository.getSubCategory(id);
        if (getSubCategory && getSubCategory.length > 0) {
            setSubCategory(getSubCategory);
        }
        setSubcategoryLoading(false);
    }

    async function getBrands(id) {
        let brandArray = [];
        setBrands([]);
        const params = new URLSearchParams(slug);
        const brandList = params.getAll('brands');

        let getBrands = await CollectionRepository.getBrands(id);
        if (getBrands && getBrands.length > 0) {
            console.log('getBrands', getBrands);
            for await (let brand of getBrands) {
                let obj = {
                    label: brand,
                    isChecked: false,
                };
                brandArray.push(obj);
            }
            window.sessionStorage.setItem(
                'brand' + id.toString(),
                JSON.stringify(brandArray)
            );

            for (let brand of brandList) {
                console.log('aaaa', brand);
                let objIndex = brandArray.findIndex(
                    (obj) => obj.label == brand
                );
                console.log('aa', objIndex);
                if (objIndex >= 0) {
                    brandArray[objIndex].isChecked = true;
                }
            }
            // setBrands(getBrands);
            setBrands(brandArray);
        }
        setBrandLoading(false);
    }

    async function getPrices(id) {
        let getPrice = await CollectionRepository.getPrices(id);
        if (
            getPrice &&
            getPrice.length > 0 &&
            getPrice[0] != null &&
            getPrice[0].max_price != null &&
            getPrice[0].min_price != null
        ) {
            window.sessionStorage.setItem(
                'price' + id.toString(),
                JSON.stringify(getPrice[0])
            );
            setSelectedPriceRange(getPrice[0]);
            setPriceRange(getPrice[0]);
        }
        setPriceLoading(false);
    }

    async function getCategry(endpoint, categoryId) {
        if (endpoint) {
            // getUserData(endpoint, categoryId);
            getUserAnalyticsData(endpoint, categoryId);
            setLoading(true);
            const responseData =
                await CollectionRepository.getProductsByCollectionSlug(
                    endpoint
                );
            if (
                responseData &&
                typeof responseData == 'object' &&
                Object.entries(responseData).length != 0
            ) {
                let categoryKey = Object.keys(responseData);

                if (categoryKey[0] != null) {
                    setCategoryId(categoryKey[0]);
                    let categoryData = responseData[categoryKey[0]];
                    setValuesFn(categoryData);
                    if (
                        categoryData &&
                        categoryData.products &&
                        Object.entries(categoryData.products).length != 0
                    ) {
                        setProductsFn(categoryData);
                    } else {
                        setCategory(null);
                        setLoading(false);
                    }
                } else {
                    setCategory(null);
                    setLoading(false);
                }
            } else {
                setCategory(null);
                // setCategoryId(null);
                // setTimeout(function () {
                setLoading(false);
                // }, 250);
            }
        }
    }

    let tempId =
        typeof window !== 'undefined'
            ? window.sessionStorage.getItem('value')
            : 1;

    useEffect(() => {
        setPriceRangeSelected(false);
        setLoading(true);
        setPopularProducts(false);
        if (window.sessionStorage.getItem('breadcrumbs')) {
            setBreadcrumbItem(
                JSON.parse(window.sessionStorage.getItem('breadcrumbs'))
            );
        }
        let params = new URLSearchParams(slug);
        // console.log('ppppppppp', params);
        let checkCategoryId = params.get('category_id');
        let itemsPerPage = params.get('items_per_page');
        let newPageNo = params.get('page');
        if (!newPageNo) {
            newPageNo = 1;
        }

        if (!itemsPerPage) {
            itemsPerPage = 20;
        }
        setItemsPerPage(itemsPerPage);
        const brandList = params.getAll('brands');
        // console.log('bbbbbbb', brandList);

        let brandSession = window.sessionStorage.getItem(
            'brand' + checkCategoryId
        );
        let brandValue = '';

        let brandSessionArray = [];
        brandSessionArray = JSON.parse(brandSession);
        if (brandSessionArray && brandSessionArray.length > 0) {
            for (let brand of brandList) {
                // console.log('aaaa', brand);
                let objIndex = brandSessionArray.findIndex(
                    (obj) => obj.label == brand
                );
                // console.log('aa', objIndex);
                if (objIndex >= 0) {
                    brandValue = brandValue + '&brands=' + brand;

                    brandSessionArray[objIndex].isChecked = true;
                }
            }
            setBrands(brandSessionArray);
        }
        // console.log('brandSessionArray', brandSessionArray, brands);

        let priceSession = window.sessionStorage.getItem(
            'price' + checkCategoryId
        );

        let priceSessionValue = null;
        priceSessionValue = JSON.parse(priceSession);
        if (priceSessionValue) {
            // console.log('ppppppppppppp', priceSessionValue);
            setPriceRange(priceSessionValue);
            setSelectedPriceRange(priceSessionValue);
        }

        let isPriceSelected = false;
        let priceRange = '';
        const selectedMinPrice = params.get('min_price');
        const selectedMaxPrice = params.get('max_price');
        if (selectedMinPrice && selectedMaxPrice) {
            setPriceRangeSelected(true);
            priceRange =
                '&min_price=' +
                selectedMinPrice +
                '&max_price=' +
                selectedMaxPrice;
            setSelectedPriceRange({
                min_price: selectedMinPrice,
                max_price: selectedMaxPrice,
            });
        }

        // let newPageNo = 1;
        // let lastValue = window.sessionStorage.getItem('page');
        // if (lastValue) {
        //     newPageNo = lastValue;
        //     window.sessionStorage.setItem('page', lastValue);
        // } else {
        //     window.sessionStorage.setItem('page', 1);
        // }
        resetAllValues();

        setCategoryName('');
        setPageNo(newPageNo);
        let getProductUrl = `category_id=${checkCategoryId}&page=${newPageNo}&items_per_page=${itemsPerPage}${brandValue}${priceRange}`;
        if (
            checkCategoryId == 1 ||
            checkCategoryId == 3200 ||
            checkCategoryId == 2743
        ) {
            getPopularProduct(checkCategoryId);
            getSubCategory(checkCategoryId);
        } else {
            if (checkCategoryId) {
                getCategry(getProductUrl, checkCategoryId);
                getSubCategory(checkCategoryId);
                if (!brandSessionArray || brandSessionArray.length == 0) {
                    getBrands(checkCategoryId);
                }
                if (!priceSessionValue) {
                    getPrices(checkCategoryId);
                }
            }
            if (checkCategoryId == 3810) {
                setModalShow(true);
            }
        }
    }, [slug, tempId]);

    async function getPopularProduct(categoryId) {
        setPopularProducts(true);

        const responseData = await CollectionRepository.getPopularProduct(
            categoryId
        );
        if (responseData) {
            let products = [];
            for await (let item of responseData) {
                item.id = item.product_id;
                item.product_images = [item.image_url];
                products.push(item);
            }
            if (products && products.length > 0) {
                setCategory(products);
                setLoading(false);
                setProductCount(products.length);
            }
        }
    }

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        // {
        //     text: 'Shop',
        //     url: '/',
        // },
        {
            text: categoryName ? categoryName : '',
        },
    ];
    // if (
    //     getBreadcrumbItem.breadcrumbs.length == 0 &&
    //     cookies.breadcrumbs != undefined
    // ) {
    //     dispatch(setBreadcrumb(cookies.breadcrumbs));
    // }

    const getUserData = async (url, categoryId) => {
        try {
            const res = await axios.get('https://api.ipify.org/?format=json');
            if (res.data && res.data.ip) {
                await CollectionRepository.saveUserData(
                    res.data.ip,
                    url,
                    categoryId
                );
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const getUserAnalyticsData = async (url, categoryId) => {
        let page = 1;
        try {
            const res = await axios.get('https://api.ipify.org/?format=json');
            let urlParams = new URLSearchParams(window.location.href);
            if (urlParams.get('page') != null) {
                page = urlParams.get('page');
            }
            if (res.data && res.data.ip) {
                let user_data = {
                    ip: res.data.ip,
                    category_list: {
                        page_no: page,
                        category_id: categoryId,
                    },
                };
                await CollectionRepository.saveUserAnalyticsData(user_data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    async function handlePagination(page, pageSize) {
        window.sessionStorage.setItem('page', page);
        setPageNo(page);
        let brandValue = '';
        let findBrand = await brands.filter((o) => o.isChecked == true);
        // console.log('fffff', findBrand);
        if (findBrand && findBrand.length > 0) {
            for await (let x of findBrand) {
                brandValue = brandValue + '&brands=' + x.label;
            }
        }

        let priceRange = '';
        if (
            isPriceRangeSelected &&
            selectedPriceRange &&
            selectedPriceRange.min_price != null &&
            selectedPriceRange.max_price != null
        ) {
            priceRange =
                '&min_price=' +
                selectedPriceRange.min_price +
                '&max_price=' +
                selectedPriceRange.max_price;
        }

        let endpoint = `${categoryName}&category_id=${categoryId}&page=${page}&items_per_page=${itemsPerPage}${brandValue}${priceRange}`;

        Router.push(endpoint);
        // getCategry(endpoint, categoryId);
    }

    function handleSelectBrand(e) {
        // console.log('eeeeee', e.target.checked);
        setPageNo(1);

        let brandValue = '';
        // setSelectedBrands(e);

        let brandArray = brands;
        for (let brand of brands) {
            // console.log('aaaa', brand);
            let objIndex = brandArray.findIndex(
                (obj) => obj.label == e.target.name
            );
            // console.log('aa', objIndex);
            if (objIndex >= 0) {
                brandArray[objIndex].isChecked = e.target.checked;
            }
        }

        for (let x of brandArray) {
            if (x.isChecked) {
                brandValue = brandValue + '&brands=' + x.label;
            }
        }
        let priceRange = '';

        if (
            isPriceRangeSelected &&
            selectedPriceRange &&
            selectedPriceRange.min_price != null &&
            selectedPriceRange.max_price != null
        ) {
            priceRange =
                '&min_price=' +
                selectedPriceRange.min_price +
                '&max_price=' +
                selectedPriceRange.max_price;
        }

        // getCategry(
        //     `${categoryName}&category_id=${categoryId}&page=${1}&items_per_page=${itemsPerPage}${brandValue}`,
        //     categoryId
        // );
        let endpoint = `${categoryName}&category_id=${categoryId}&page=${1}&items_per_page=${itemsPerPage}${brandValue}${priceRange}`;

        Router.push(endpoint);
    }

    async function handleChangeRange(value) {
        let brandValue = '';
        setPageNo(1);
        // let endpoint = `category_id=${categoryId}&page=${1}&items_per_page=${itemsPerPage}&min_price=${
        //     value[0]
        // }&max_price=${value[1]}`;
        let findBrand = await brands.filter((o) => o.isChecked == true);
        // console.log('fffff', findBrand);
        if (findBrand && findBrand.length > 0) {
            for await (let x of findBrand) {
                brandValue = brandValue + '&brands=' + x.label;
            }
        }
        if (value[0] == value[1]) {
            value[1]++;
        }

        // getCategry(endpoint, categoryId);
        // setSelectedPriceRange(value);
        let endpoint = `${categoryName}&category_id=${categoryId}&page=${1}&items_per_page=${itemsPerPage}&min_price=${
            value[0]
        }&max_price=${value[1]}${brandValue}`;
        Router.push(endpoint);
    }

    async function handlePerPageItemClick(value) {
        setPageNo(1);

        setItemsPerPage(value);

        let brandValue = '';
        let findBrand = await brands.filter((o) => o.isChecked == true);
        // console.log('fffff', findBrand);
        if (findBrand && findBrand.length > 0) {
            for await (let x of findBrand) {
                brandValue = brandValue + '&brands=' + x.label;
            }
        }

        let priceRange = '';
        if (
            isPriceRangeSelected &&
            selectedPriceRange &&
            selectedPriceRange.min_price != null &&
            selectedPriceRange.max_price != null
        ) {
            priceRange =
                '&min_price=' +
                selectedPriceRange.min_price +
                '&max_price=' +
                selectedPriceRange.max_price;
        }

        let endpoint = `category_id=${categoryId}&page=${1}&items_per_page=${value}${brandValue}${priceRange}`;

        Router.push(endpoint);
        // getCategry(endpoint, categoryId);
    }

    return (
        <PageContainer
            footer={<FooterSecond classes="ps-footer--electronic" />}
            title={category ? category.name : 'Category'}
            boxed={true}>
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={getBreadcrumbItem || []} />
                <div className="container">
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        // centered
                        style={{ border: '0px' }}>
                        <Modal.Body style={{ background: '#560c80' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}>
                                <span></span>
                                <img
                                    src="/static/img/yashraa2.png"
                                    alt="yashraa"
                                    style={{ width: '18%' }}
                                />
                                <CloseOutlined
                                    style={{ fontSize: '22px', color: 'white' }}
                                    onClick={(e) => {
                                        setModalShow(false);
                                    }}
                                />
                            </div>
                            <p
                                style={{
                                    color: 'white',
                                    fontSize: '15px',
                                    padding: '10px 10px 5px 10px',
                                }}>
                                Dear Customer, <br></br>Welcome to{' '}
                                <a
                                    style={{ color: 'white' }}
                                    href="http://yashra.in/">
                                    Yashra.in
                                </a>
                                <p style={{ marginTop: '10px' }}></p>The
                                products in this category are in beta testing.
                                You can view and shop the products but
                                comparisons are not yet available.
                                <p style={{ marginTop: '10px' }}></p>Thanks for
                                your support of our project. We are very excited
                                to hear what you think. You can write your
                                suggestions and ideas and mail us at{' '}
                                <a
                                    style={{ color: 'white' }}
                                    href="mailto:admin@yashra.in">
                                    admin@yashra.in
                                </a>
                                <p style={{ marginTop: '10px' }}></p>Thanks &
                                Regards
                                <br></br>Team Yashraa
                            </p>
                        </Modal.Body>
                    </Modal>

                    <div className="ps-layout--shop ps-shop--category">
                        <div className="ps-layout__left">
                            {subCategory && subCategory.length > 0 && (
                                <WidgetShopCategories
                                    subCategoryData={subCategory}
                                    // loading={loading}
                                    loading={isSubcategoryLoading}
                                />
                            )}
                            {brands && brands.length > 0 && (
                                <WidgetShopBrands
                                    brandsData={brands}
                                    handleSelectBrand={handleSelectBrand}
                                    // loading={loading}
                                    loading={isBrandLoading}
                                    brandTitle={
                                        categoryId == 2743 ? 'Author' : 'Brands'
                                    }
                                />
                            )}
                            {priceRange.max_price != 0 &&
                                priceRange.max_price != null && (
                                    <WidgetShopFilterByPriceRange
                                        priceRangeData={priceRange}
                                        selectedPriceRange={selectedPriceRange}
                                        handleChangeRange={handleChangeRange}
                                    />
                                )}
                        </div>

                        {/* <div className="ps-layout__right">
                            <h3 className="ps-shop__heading">
                                {categoryName && categoryName}
                            </h3>
                            {productItemsViews}
                        </div> */}
                        <ShopItems
                            // pageSize={pageSize}
                            pageSize={itemsPerPage}
                            columns={6}
                            products={category}
                            productCount={productCount}
                            loading={loading}
                            handlePagination={handlePagination}
                            handlePerPageItemClick={handlePerPageItemClick}
                            itemsPerPage={itemsPerPage}
                            pageNumber={pageNo}
                            searchKeyword=""
                            parentPage={'category'}
                            isPopularProducts={isPopularProducts}
                        />
                    </div>
                </div>
            </div>
            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
};
export default ProductCategoryScreen;
