import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';

const WidgetShopCategories = (props) => {
    const router = useRouter();
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    let subMenuList = props.subCategoryData || [];
    // const { slug } = Router.query;

    const handleClick = (e, data) => {
        e.preventDefault();
        let makeBreadcrumbList = [];
        if (window.sessionStorage.getItem('breadcrumbs')) {
            JSON.parse(window.sessionStorage.getItem('breadcrumbs')).map(
                (item, index) => {
                    makeBreadcrumbList.push({
                        id: item.id,
                        url: item.url,
                        text: item.text,
                        isLast: false,
                    });
                }
            );
        }
        if (makeBreadcrumbList.length == 0) {
            makeBreadcrumbList.push({
                id: 0,
                url: '/',
                text: 'Home',
                isLast: false,
            });
        }
        let isAlreadyExist = makeBreadcrumbList.findIndex((element) => {
            if (element.id == data.id) return true;
        });

        if (isAlreadyExist >= 0) {
            makeBreadcrumbList[isAlreadyExist].isLast = true;
        } else {
            makeBreadcrumbList.push({
                id: data.id,
                url: `/category/${data.name}&category_id=${data.id}`,
                text: data.name,
                isLast: true,
            });
        }

        window.sessionStorage.setItem(
            'breadcrumbs',
            JSON.stringify(makeBreadcrumbList)
        );

        router.push(e.target.id);
    };

    useEffect(() => {
        setLoading(props.loading);
    }, [props]);

    // Views
    let categoriesView;
    if (!loading) {
        if (subMenuList && subMenuList.length > 0) {
            let items = [];
            items = subMenuList.map((item) => (
                <li
                    key={item.id}
                    // className={item.id === slug ? 'active' : ''}
                >
                    {/* <Link href={`/category/${item.id}`}>
                        {item.category_name}
                    </Link> */}
                    <a
                        href={`/category/${item.category_name
                            .split('/')
                            .join('-')}&category_id=${item.id}`}
                        id={`/category/${item.category_name
                            .split('/')
                            .join('-')}&category_id=${item.id}`}
                        className={item.category_name.split('/').join('-')}
                        onClick={(e) =>
                            handleClick(e, {
                                name: item.category_name.split('/').join('-'),
                                id: item.id,
                            })
                        }>
                        {item.category_name}
                    </a>
                </li>
            ));
            categoriesView = <ul className="ps-list--categories">{items}</ul>;
        } else {
            categoriesView = <p>Not found</p>;
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Categories</h4>

            {categoriesView}
        </aside>
    );
};

export default WidgetShopCategories;
