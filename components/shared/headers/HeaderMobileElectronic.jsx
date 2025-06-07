// import React, { Component } from 'react';
import CurrencyDropdown from './modules/CurrencyDropdown';
import Link from 'next/link';
import LanguageSwicher from './modules/LanguageSwicher';
import MobileHeaderActions from './modules/MobileHeaderActions';
import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import Router from 'next/router';

const HeaderMobileElectronic = (props) => {
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
        // e.preventDefault();
        // Router.push(`/search?keyword=${keyword}&id=${selectedCategoryId}`);
        e.preventDefault();
        if (keyword && keyword.trim()) {
            Router.push(
                `/search?keyword=${keyword}&category_id=${selectedCategoryId}`
            );
        }
    }
    useEffect(() => {
        let categoriesData = [
            <option value={''} key={'all'}>
                {'All'}
            </option>,
        ];
        if (props && props.menuList) {
            for (let a of props.menuList) {
                categoriesData.push(
                    <option value={a.id} key={a.id}>
                        {a.category_name}
                    </option>
                );
            }
            setcategoryData(categoriesData);
        }
    });

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
                <span
                    className="ps-form__action"
                    style={{ backgroundColor: '#fff' }}
                    onClick={handleClearKeyword}>
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
        <header className="header header--mobile electronic">
            <div className="navigation--mobile">
                <div className="navigation__left">
                    <Link href="/">
                        <a className="ps-logo" style={{ width: '120px' }}>
                            <img
                                src="/static/img/yashraa2.png"
                                alt="yashraa"
                            />
                        </a>
                    </Link>
                </div>
                <MobileHeaderActions />
            </div>
            <div className="ps-search--mobile">
                {/* <form
                        className="ps-form--search-mobile"
                        action="/"
                        method="get">
                        <div className="form-group--nest">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search something..."
                            />
                            <button>
                                <i className="icon-magnifier"></i>
                            </button>
                        </div>
                    </form> */}
                <form
                    className="ps-form--search-mobile"
                    method="get"
                    action="/"
                    onSubmit={handleSubmit}>
                    {/* <div className="ps-form__categories"  style={{height:'0px'}}>
                <select
                    className="form-control"
                    style={{ textIndent: '0px', textAlign: 'center' }}
                    onChange={(event) =>
                        setSelectedCategoryId(event.target.value)
                    }>
                    {categoryData}
                </select>
            </div> */}
                    <div className="form-group--nest">
                        <input
                            ref={inputEl}
                            className="form-control"
                            type="text"
                            value={keyword}
                            placeholder="Search something..."
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        {clearTextView}
                        {loadingView}

                        <button onClick={handleSubmit}>
                            <i className="icon-magnifier"></i>
                        </button>
                    </div>
                    {/* <div
                className={`ps-panel--search-result${
                    isSearch ? ' active ' : ''
                }`}>
                <div className="ps-panel__content">{productItemsView}</div>
                {loadMoreView}
            </div> */}
                </form>
            </div>
        </header>
    );
};

export default HeaderMobileElectronic;
