import React, { Component } from 'react';
import CategoryRepository from '~/repositories/CategoryRepository';
import Link from 'next/link';
import { useState } from 'react';

class ElectronicPopularCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topcategories: null,
        };
    }

    handleClick = (e, data) => {
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
            this.props.router.push(data.url);
        }
    };

    render() {
        // const [topcategories, setTopCategories] = useState();
        let entries = null;
        let topCategoriesOfMonth = this.props.topcategories || [];
        // topCategoriesOfMonth.then((response) => {
        //     if (this.state.topcategories == null) {
        //         entries = Object.entries(response.category_data)
        //         this.setState({topcategories: entries})

        //     }
        // })
        if (topCategoriesOfMonth != null && topCategoriesOfMonth.length > 0) {
            if (this.state.topcategories == null) {
                // entries = Object.entries(response.category_data)
                this.setState({ topcategories: topCategoriesOfMonth });
            }
        }

        // console.log("topCategoriesOfMonth", topCategoriesOfMonth)

        return (
            <div className="ps-top-categories">
                {/* <Link
                    href={`category/category_id=1&page=1&items_per_page=20`}> */}
                <a>
                    <div className="container">
                        <h3>{this.props.lable}</h3>
                        <div className="row">
                            {this.state.topcategories != null &&
                                this.state.topcategories.map((category) => (
                                    <div
                                        className="col-md-4 col-sm-6 col-12 "
                                        key={category}>
                                        <a
                                            href={`/category/${category.category_name}&category_id=${category.category_id}`}
                                            id={`/category/${category.category_name}&category_id=${category.category_id}`}
                                            onClick={(e) =>
                                                this.handleClick(e, {
                                                    name: category.category_name,
                                                    id: category.category_id,
                                                    url: `/category/${category.category_name}&category_id=${category.category_id}`,
                                                })
                                            }>
                                            <div className="ps-block--category-2 popular-category-block">
                                                <div className="ps-block__thumbnail mnth_thumbnail">
                                                    <img
                                                        src={`${category.category_small_image}`}
                                                    />
                                                </div>
                                                <div
                                                    className="ps-block__content"
                                                    style={{
                                                        display: 'flex',
                                                        padding: '0px',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        width: '100%',
                                                    }}>
                                                    <div
                                                        className="popular_cat_title"
                                                        style={{
                                                            fontSize: '18px',
                                                        }}>
                                                        {category.category_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                        </div>
                    </div>
                </a>
                {/* </Link> */}
            </div>
        );
    }
}

export default ElectronicPopularCategories;
