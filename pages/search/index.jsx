import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

const SearchPage = () => {
    // const getBreadcrumbItem = useSelector((state) => state.breadcrumb);
    const [getBreadcrumbItem, setBreadcrumbItem] = useState([]);
    const Router = useRouter();
    const { slug } = Router.query;
    const { query } = Router;
    const [category, setCategory] = useState(null);
    const [keyword, setKeyword] = useState('');

    const [productCount, setProductCount] = useState(0);
    const [subCategory, setSubCategory] = useState(null);
    const [brands, setBrands] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState(null);
    const [priceRange, setPriceRange] = useState({
        min_price: 0,
        max_price: 0,
    });
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
    const [isPriceRangeSelected, setPriceRangeSelected] = useState(false);

    let category_products = [];

    function resetAllValues() {
        setBrandLoading(true);
        // setBrandLoading(false);
        setSubcategoryLoading(true);
        // setItemsPerPage(20);
        setPageSize(20);
        setCategoryId(null);
        setLoading(true);
        setCategory(null);
        setProductCount(0);
        // setBrands(null);
        // setPriceRange({ min_price: 0, max_price: 0 });
        // setSelectedPriceRange({ min_price: 0, max_price: 0 });
        setCategoryName(null);
        setSubCategory(null);
    }

    function setValuesFn(categoryData) {
        // setSubCategory(categoryData.sub_categories);
        if (categoryData.brands) {
            // setBrands(categoryData.brands);
        }
        if (
            categoryData.total_results &&
            categoryData.total_results[0] &&
            categoryData.total_results[0].total != null
        ) {
            setProductCount(categoryData.total_results[0].total);
        }
        // setPriceRange(categoryData.max_min_price);
        // setCategoryName(categoryData.category_name);
    }

    function setProductsFn(categoryData) {
        for (let item in categoryData.search_results) {
            categoryData.search_results[item].id = item;
            category_products.push(categoryData.search_results[item]);
        }
        if (category_products && category_products.length > 0) {
            setCategory(category_products);
            // setTimeout(function () {
            setLoading(false);
            // }, 250);
        }
        if (
            query.category_id == '' &&
            categoryData.brands != null &&
            categoryData.brands.length > 0
        ) {
            arrangeBrands(categoryData.brands, null);
            setBrandLoading(false);
        }
    }

    // async function getSubCategory(id) {
    //     let getSubCategory = await CollectionRepository.getSubCategory(id);
    //     if (getSubCategory && getSubCategory.length > 0) {
    //         setSubCategory(getSubCategory);
    //     }
    //     setSubcategoryLoading(false);
    // }

    async function getBrands(id) {
        if (id != null && id != '') {
            let getBrands = await CollectionRepository.getBrands(id);
            if (getBrands && getBrands.length > 0) {
                await arrangeBrands(getBrands, id);
            }
        }

        setBrandLoading(false);
    }

    async function arrangeBrands(getBrands, id) {
        let brandArray = [];
        let brandList = query.brands || [];
        if (!Array.isArray(brandList)) {
            brandList = [brandList];
        }
        if (getBrands && getBrands.length > 0) {
            for await (let brand of getBrands) {
                let obj = {
                    label: brand,
                    isChecked: false,
                };
                brandArray.push(obj);
            }
            if (id != null) {
                window.sessionStorage.setItem(
                    'brand' + id.toString(),
                    JSON.stringify(brandArray)
                );
            }

            for (let brand of brandList) {
                let objIndex = brandArray.findIndex(
                    (obj) => obj.label == brand
                );
                if (objIndex >= 0) {
                    brandArray[objIndex].isChecked = true;
                }
            }
            setBrands(brandArray);
        }
    }

    async function getCategry(endpoint) {
        if (endpoint) {
            setLoading(true);
            const responseData =
                await CollectionRepository.getProductsSearchByCollectionSlug(
                    endpoint
                );
            if (
                responseData &&
                typeof responseData == 'object' &&
                Object.entries(responseData).length != 0
            ) {
                // let categoryKey = Object.keys(responseData);
                // setCategoryId(categoryKey);
                // let categoryData = responseData[categoryKey];
                setValuesFn(responseData);
                if (
                    responseData &&
                    responseData.search_results &&
                    // responseData.search_results.length > 0
                    Object.entries(responseData.search_results).length > 0
                ) {
                    setProductsFn(responseData);
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

    useEffect(() => {
        setPriceRangeSelected(false);
        resetAllValues();

        setLoading(true);
        setKeyword(query.keyword);
        let newPageNo = query.page;
        if (!newPageNo) {
            newPageNo = 1;
        }
        let brandSession = window.sessionStorage.getItem(
            'brand' + query.category_id
        );
        let brandValue = '';
        let brandList = query.brands || [];
        if (!Array.isArray(brandList)) {
            brandList = [brandList];
        }
        let brandsAnalytics = [];
        let brandSessionArray = [];
        brandSessionArray = JSON.parse(brandSession);
        // console.log(
        //     'zzzzzzzzzzzzzzzzzzz',
        //     query.brands,
        //     brandSession,
        //     query.category_id,
        //     brandSessionArray
        // );
        if (brandSessionArray && brandSessionArray.length > 0) {
            for (let brand of brandList) {
                // console.log('yyyyyyyyy', brand);
                let objIndex = brandSessionArray.findIndex(
                    (obj) => obj.label == brand
                );
                if (objIndex >= 0) {
                    brandsAnalytics.push(brand);
                    brandValue = brandValue + '&brands=' + brand;
                    brandSessionArray[objIndex].isChecked = true;
                }
            }
            // console.log('brandSessionArray', brandSessionArray);
            setBrands(brandSessionArray);
        }
        let priceSession = window.sessionStorage.getItem(
            'price' + query.category_id
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
        let selectedMinPrice = query.min_price;
        let selectedMaxPrice = query.max_price;
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
        setPageNo(newPageNo);

        setCategoryName('');
        // let getProductUrl = `category_id=${query.id}`;

        setCategoryId(query.category_id);

        let getProductUrl = `category_id=${query.category_id}&product_name=${query.keyword}&page=${newPageNo}${brandValue}${priceRange}`;
        if (query.keyword) {
            getCategry(getProductUrl);
            // getSubCategory(query.category_id);
            if (!brandSessionArray || brandSessionArray.length == 0) {
                if (query.category_id != null && query.category_id != '') {
                    getBrands(query.category_id);
                }
            }
            if (!priceSessionValue) {
                getPrices(query.category_id);
            }
            getUserAnalyticsData(
                query.keyword,
                brandsAnalytics,
                query.min_price,
                query.max_price
            );
        }
    }, [query]);

    async function getPrices(id) {
        if (id != null && id != '') {
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
            // setPriceLoading(false);
        } else {
            setPriceRange({ min_price: 0, max_price: 0 });
            setSelectedPriceRange({ min_price: 0, max_price: 0 });
        }
    }

    const getUserAnalyticsData = async (
        keyword,
        brandsAnalytics,
        minPrice,
        maxPrice
    ) => {
        try {
            let price = [];
            if (minPrice && maxPrice) {
                price = [minPrice, maxPrice];
            }
            const res = await axios.get('https://api.ipify.org/?format=json');
            if (res.data && res.data.ip) {
                let user_data = {
                    ip: res.data.ip,
                    search_list: {
                        keyword: keyword,
                        brands: brandsAnalytics,
                        price: price,
                    },
                };
                // console.log('unigt', user_data);
                await ProductRepository.saveUserAnalyticsData(user_data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

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

    async function handlePagination(page, pageSize) {
        setPageNo(page);
        let brandValue = '';
        let priceRange = '';

        let findBrand = await brands.filter((o) => o.isChecked == true);
        // console.log('fffff', findBrand);
        if (findBrand && findBrand.length > 0) {
            for await (let x of findBrand) {
                brandValue = brandValue + '&brands=' + x.label;
            }
        }
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
        let endpoint = `/search?keyword=${keyword}&category_id=${categoryId}&page=${page}${brandValue}${priceRange}`;
        Router.push(endpoint);
    }

    function handleSelectBrand(e) {
        // console.log('eeeeee', e.target.checked);
        setPageNo(1);

        let brandValue = '';
        // setSelectedBrands(e);

        let brandArray = [...brands];
        for (let brand of brands) {
            let objIndex = brandArray.findIndex(
                (obj) => obj.label == e.target.name
            );
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

        let endpoint = `/search?keyword=${keyword}&category_id=${categoryId}&page=${1}${brandValue}${priceRange}`;

        Router.push(endpoint);
    }

    async function handleChangeRange(value) {
        let brandValue = '';
        setPageNo(1);
        let findBrand = await brands.filter((o) => o.isChecked == true);
        if (findBrand && findBrand.length > 0) {
            for await (let x of findBrand) {
                brandValue = brandValue + '&brands=' + x.label;
            }
        }
        if (value[0] == value[1]) {
            value[1]++;
        }

        let endpoint = `/search?keyword=${keyword}&category_id=${categoryId}&page=${1}&items_per_page=${itemsPerPage}&min_price=${
            value[0]
        }&max_price=${value[1]}${brandValue}`;
        Router.push(endpoint);
    }

    function handlePerPageItemClick(value) {
        setItemsPerPage(value);
        // let endpoint = `category_id=${categoryId}&page=${pageNo}&items_per_page=${value}`;
        let endpoint = `category_id=${categoryId}&product_name=${query.keyword}&page=${pageNo}&items_per_page=${value}`;
        if (selectedBrands && selectedBrands.length > 0) {
            let brandValue = '';
            for (let x of selectedBrands) {
                brandValue = brandValue + '&brands=' + x;
            }
            endpoint += brandValue;
        }
        // Router.push(endpoint);
        getCategry(endpoint);
    }

    return (
        <PageContainer
            footer={<FooterSecond classes="ps-footer--electronic" />}
            title={category ? category.name : 'Category'}
            boxed={true}>
            <div className="ps-page--shop">
                {/* <BreadCrumb breacrumb={getBreadcrumbItem || []} /> */}

                <div className="container">
                    <div className="ps-layout--shop ps-shop--category">
                        <div className="ps-layout__left">
                            {/* {subCategory && subCategory.length > 0 && (
                                <WidgetShopCategories
                                    subCategoryData={subCategory}
                                    loading={loading}
                                />
                            )} */}
                            {brands && brands.length > 0 && (
                                <WidgetShopBrands
                                    brandsData={brands}
                                    handleSelectBrand={handleSelectBrand}
                                    loading={isBrandLoading}
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
                        <ShopItems
                            pageSize={pageSize}
                            columns={6}
                            products={category}
                            productCount={productCount}
                            loading={loading}
                            handlePagination={handlePagination}
                            handlePerPageItemClick={handlePerPageItemClick}
                            itemsPerPage={itemsPerPage}
                            pageNumber={pageNo}
                            searchKeyword={keyword}
                            parentPage={'search'}
                        />
                    </div>
                </div>
            </div>
            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
};

export default SearchPage;

// import React, { useEffect, useState } from 'react';
// import BreadCrumb from '~/components/elements/BreadCrumb';
// import Product from '~/components/elements/products/Product';
// import ProductGroupGridItems from '~/components/partials/product/ProductGroupGridItems';
// import PageContainer from '~/components/layouts/PageContainer';
// import Newsletters from '~/components/partials/commons/Newletters';
// import useGetProducts from '~/hooks/useGetProducts';
// import { useRouter } from 'next/router';
// import ProductRepository from '~/repositories/ProductRepository';

// const SearchPage = () => {
//     const [pageSize] = useState(100);
//     const [keyword, setKeyword] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [productItems, setProductItems] = useState([]);
//     const Router = useRouter();
//     const { query } = Router;

//     function handleSetKeyword() {
//         if (query && query.keyword !== '') {
//             setKeyword(query.keyword);
//         } else {
//             setKeyword('');
//         }
//     }

//     async function getProductList(id, keyword) {
//         setLoading(true);
//         let itemList = [];
//         const responseData = await ProductRepository.getSearchProducts({
//             id,
//             keyword,
//         });
//         setLoading(false);
//         if (responseData && responseData.data) {
//             console.log('responseData', responseData.data);
//             for (const property in responseData.data) {
//                 responseData.data[property].id = property;
//                 itemList.push(responseData.data[property]);
//                 // console.log('11111111', responseData.data[property]);
//             }
//             console.log('iteeeeeeeeeem', itemList);
//             setProductItems(itemList);

//             // setTimeout(
//             //     function () {
//             //         setLoading(false);
//             //     }.bind(this),
//             //     250
//             // );
//         }
//     }

//     useEffect(() => {
//         if (query && query.keyword) {
//             handleSetKeyword(query.keyword);
//             // const queries = {
//             //     _limit: pageSize,
//             //     title_contains: query.keyword,
//             // };
//             getProductList(query.id, query.keyword);
//         }
//     }, [query]);

//     const breadcrumb = [
//         {
//             text: 'Home',
//             url: '/',
//         },
//         {
//             text: 'Search Result - ' + keyword,
//         },
//     ];

//     let shopItemsView, statusView;
//     if (!loading) {
//         if (productItems) {
//             // shopItemsView = (
//             //     <ProductGroupGridItems columns={6} pageSize={pageSize} />
//             // );
//             if (productItems.length > 0) {
//                 const items = productItems.map((item) => {
//                     return (
//                         <div className="col-md-3 col-sm-6 col-6" key={item.id}>
//                             <Product product={item} />
//                         </div>
//                     );
//                 });
//                 shopItemsView = (
//                     <div className="ps-product-items row">{items}</div>
//                 );
//                 statusView = (
//                     <p>
//                         <strong style={{ color: '#000' }}>
//                             {productItems.length}
//                         </strong>{' '}
//                         record(s) found.
//                     </p>
//                 );
//             } else {
//                 shopItemsView = <p>No product(s) found.</p>;
//             }
//         } else {
//             shopItemsView = <p>No product(s) found.</p>;
//         }
//     } else {
//         statusView = <p>Searching...</p>;
//     }

//     return (
//         <PageContainer title={`Search results for: "${keyword}" `}>
//             <div className="ps-page">
//                 {/* <BreadCrumb breacrumb={breadcrumb} /> */}
//             </div>
//             <div className="container">
//                 <div className="ps-shop ps-shop--search">
//                     <div className="container">
//                         <div className="ps-shop__header">
//                             <h1>
//                                 Search result for: "<strong>{keyword}</strong>"
//                             </h1>
//                         </div>
//                         <div className="ps-shop__content">
//                             {statusView}
//                             {shopItemsView}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* <Newsletters layout="container" /> */}
//         </PageContainer>
//     );
// };

// export default SearchPage;
