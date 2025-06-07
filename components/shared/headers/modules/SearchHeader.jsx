import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Spin } from 'antd';
import ProductRepository from '~/repositories/ProductRepository';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import CategoryRepository from '~/repositories/CategoryRepository';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const SearchHeader = (props) => {
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    // const debouncedSearchTerm = useDebounce(keyword, 300);
    const [categoryData, setcategoryData] = useState([
        // <option value={''} key={'all'}>
        //     {'All'}
        // </option>,
    ]);
    let menuList = [];
    function handleClearKeyword() {
        setKeyword('');
        setIsSearch(false);
        setLoading(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (keyword && keyword.trim()) {
            Router.push(
                `/search?keyword=${keyword}&category_id=${selectedCategoryId}`
            );
        }
    }
    // api/get_category_list_json

    useEffect(() => {
        let categoriesData = [
            <option value={''} key={'all'}>
                {'All'}
            </option>,
        ];
        if (props && props.menuList) {
            let i = 1;
            for (let a of props.menuList) {
                i++;
                if (i <= 5) {
                    categoriesData.push(
                        <option value={a.id} key={a.id}>
                            {a.category_name}
                        </option>
                    );
                }
            }
            setcategoryData(categoriesData);
        }
        // if (debouncedSearchTerm) {
        //     setLoading(true);
        //     if (keyword) {
        //         const queries = {
        //             _limit: 5,
        //             title_contains: keyword,
        //         };
        //         const products = ProductRepository.getRecords(queries);
        //         products.then((result) => {
        //             console.log('prodxxx', products);
        //             setLoading(false);
        //             setResultItems(result);
        //             setIsSearch(true);
        //         });
        //     } else {
        //         setIsSearch(false);
        //         setKeyword('');
        //     }
        //     if (loading) {
        //         setIsSearch(false);
        //     }
        // } else {
        //     setLoading(false);
        //     setIsSearch(false);
        // }
    }, [props]);

    // Views
    let productItemsView,
        clearTextView,
        selectOptionView,
        loadingView,
        loadMoreView;
    if (!loading) {
        if (resultItems && resultItems.length > 0) {
            if (resultItems.length > 5) {
                loadMoreView = (
                    <div className="ps-panel__footer text-center">
                        <Link href="/search">
                            <a>See all results</a>
                        </Link>
                    </div>
                );
            }
            productItemsView = resultItems.map((product) => (
                <ProductSearchResult product={product} key={product.id} />
            ));
        } else {
            productItemsView = <p>No product found.</p>;
        }
        if (keyword !== '') {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }

    // selectOptionView = exampleCategories.map((option) => (
    //     <option value={option} key={option}>
    //         {option}
    //     </option>
    // ));
    return (
        <form
            className="ps-form--quick-search"
            method="get"
            action="/"
            onSubmit={handleSubmit}>
            <div className="ps-form__categories">
                <select
                    className="form-control"
                    style={{ textIndent: '0px', textAlign: 'center' }}
                    onChange={(event) =>
                        setSelectedCategoryId(event.target.value)
                    }>
                    {categoryData}
                </select>
            </div>
            <div className="ps-form__input">
                <input
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder="Search for any product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {clearTextView}
                {loadingView}
            </div>
            <button onClick={handleSubmit}>Search</button>
            <div
                className={`ps-panel--search-result${
                    isSearch ? ' active ' : ''
                }`}>
                <div className="ps-panel__content">{productItemsView}</div>
                {loadMoreView}
            </div>
        </form>
    );
};

export default SearchHeader;
