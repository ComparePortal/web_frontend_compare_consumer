import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setBreadcrumb } from '~/store/breadcrumb/action';
import { useCookies } from 'react-cookie';
const MegaMenu = ({ source, handleAllCategoryClick }) => {
    const getBreadcrumbItem = useSelector((state) => state.breadcrumb);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleClick = (e, data) => {
        var element = document.getElementsByClassName('sub-menu');
        for (let i = 0; i < element.length; i++) {
            element[i].classList.remove('show-submenu');
        }
        e.preventDefault();
        if (e.target.className == 'All') {
            handleAllCategoryClick();
        } else {
            window.sessionStorage.setItem('page', 1);
            let lastValue = window.sessionStorage.getItem('value');
            if (lastValue) {
                lastValue = lastValue + 1;
                window.sessionStorage.setItem('value', lastValue);
            } else {
                window.sessionStorage.setItem('value', 1);
            }

            if (e.target.id != null) {
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
                dispatch(setBreadcrumb(makeBreadcrumbItem));
                window.sessionStorage.setItem(
                    'breadcrumbs',
                    JSON.stringify(makeBreadcrumbItem)
                );
                router.push(e.target.id);
            }
        }
    };

    let megaContentView;
    if (source) {
        megaContentView = [source].map((item) => (
            <div className="mega-menu__column" key={source.category_name}>
                <h4>{source.category_name}</h4>

                <ul className="mega-menu__list">
                    {item.sub_categories &&
                        item.sub_categories.map((subItem) => (
                            <li key={subItem.category_name}>
                                <Link
                                    href="/category/[id]"
                                    as={`/category/${subItem.id}`}>
                                    <a>{subItem.category_name}</a>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        ));
        console.log("ooooooooooooo", source);
    }

    return (
        <li className="menu-item-has-children has-mega-menu menuClass">
            <a
                href={`/category/${source.category_name}&category_id=${source.id}`}
                id={`/category/${source.category_name}&category_id=${source.id}`}
                className={source.category_name + ' menuClass'}
                onClick={(e) =>
                    handleClick(e, {
                        name: source.category_name,
                        id: source.id,
                    })
                }>
                {source.category_name}
            </a>
        </li>
    );
};

export default MegaMenu;
