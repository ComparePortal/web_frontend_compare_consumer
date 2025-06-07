import React, { useEffect, useState } from 'react';
import { Pagination, Select } from 'antd';
import Product from '~/components/elements/products/Product';
import ProductWide from '~/components/elements/products/ProductWide';
import ProductRepository from '~/repositories/ProductRepository';
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
import { useRouter } from 'next/router';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import useGetProducts from '~/hooks/useGetProducts';
import ModuleShopPerPageItem from './modules/ModuleShopPerPageItem';

const ShopItems = ({
    columns = 4,
    pageSize = 50,
    products,
    productCount,
    loading,
    handlePagination,
    handlePerPageItemClick,
    itemsPerPage,
    pageNumber,
    searchKeyword = '',
    parentPage,
    isPopularProducts = false,
}) => {
    const Router = useRouter();
    let { page } = Router.query;
    const { slug } = Router.query;
    const { query } = Router;
    const [listView, setListView] = useState(true);
    const [pageNo, setPageNo] = useState(undefined);
    const [productItems, setProductItems] = useState(null);
    // const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );
    const { Option, OptGroup } = Select;

    // const getUrl = new URLSearchParams(page);
    // page = getUrl.get('page');

    function handleChangeViewMode(e) {
        e.preventDefault();
        setListView(!listView);
    }

    // function handlePagination(page, pageSize) {
    // Router.push(`/category/category_id=${1}&page=${page}&items_per_page=${20}`);
    // }

    async function getTotalRecords(params) {
        const responseData = await ProductRepository.getTotalRecords();
        if (responseData) {
            setTotal(responseData);
        }
    }

    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
                return 4;
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
                return 6;
                break;

            default:
                setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
        }
    }

    useEffect(() => {
        setPageNo(pageNumber);

        handleSetColumns();
        setTotal(productCount);

        setProductItems(products);
        // console.log('iiiiiiiiiiiiiiiiii', itemsPerPage);
    }, [products, productCount, pageNumber, itemsPerPage]);

    // Views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            if (listView) {
                const items = productItems.map((item) => (
                    <div className={classes} key={item.id}>
                        <Product product={item} />
                    </div>
                ));
                productItemsView = (
                    <div className="ps-shop-items">
                        <div className="row">{items}</div>
                    </div>
                );
            } else {
                productItemsView = productItems.map((item) => (
                    <ProductWide product={item} />
                ));
            }
        } else {
            productItemsView = <p>No product found.</p>;
        }
    } else {
        const skeletonItems = generateTempArray(12).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    }

    return (
        <div className="ps-shopping">
            <div className="ps-shopping__header">
                <p>
                    {parentPage == 'search' && (
                        <span>
                            Search result for -
                            <strong>
                                {' '}
                                <span style={{ marginRight: '10px' }}>
                                    {' '}
                                    {searchKeyword}
                                </span>
                            </strong>
                        </span>
                    )}
                    <strong className="mr-2">{total}</strong>
                    Products found
                </p>
                {parentPage == 'category' && !isPopularProducts && (
                    <div className="ps-shopping__actions">
                        {/* <ModuleShopPerPageItem /> */}
                        <Select
                            defaultValue={itemsPerPage}
                            value={itemsPerPage}
                            style={{
                                width: 100,
                            }}
                            onChange={handlePerPageItemClick}>
                            <Option value={20}>20</Option>
                            <Option value={40}>40</Option>
                            <Option value={60}>60</Option>
                            <Option value={80}>80</Option>
                            <Option value={100}>100</Option>
                        </Select>
                    </div>
                )}
            </div>
            <div className="ps-shopping__content">{productItemsView}</div>
            {!isPopularProducts && (
                <div className="ps-shopping__footer text-center">
                    <div className="ps-pagination">
                        <Pagination
                            total={total - 1}
                            pageSize={pageSize}
                            responsive={true}
                            showSizeChanger={false}
                            current={
                                pageNo !== undefined ? parseInt(pageNo) : 1
                            }
                            onChange={(e) => handlePagination(e)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopItems;
