import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setBreadcrumb } from '~/store/breadcrumb/action';

import Link from 'next/link';

const MenuDropdown = ({ source, parentCallback }) => {
    const getBreadcrumbItem = useSelector((state) => state.breadcrumb);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isSubmenuOpen, setSubmenuOpen] = useState(false);
    const handleClick = (e, data) => {
        e.preventDefault();

        var element = document.getElementsByClassName('sub-menu');
        for (let i = 0; i < element.length; i++) {
            element[i].classList.remove('show-submenu');
        }
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

    const openSubmenu = (menuId) => {
        var checkElement = document.getElementsByClassName(
            menuId + ' show-submenu'
        );
        if (checkElement.length > 0) {
            var element = document.getElementsByClassName('sub-menu');
            for (let i = 0; i < element.length; i++) {
                element[i].classList.remove('show-submenu');
            }
        } else {
            var element = document.getElementsByClassName('sub-menu');
            for (let i = 0; i < element.length; i++) {
                element[i].classList.remove('show-submenu');
            }

            var element1 = document.getElementsByClassName(menuId);
            for (let i = 0; i < element1.length; i++) {
                element1[i].classList.add('show-submenu');
            }
        }
    };

    return (
        <li
            // className={
            //     'menu-item-has-children dropdown show-submenu menu' +
            //     source.id.toString()
            // }
            className={'menu-item-has-children dropdown menuClass'}>
            {
                <a
                    className="menuClass"
                    onClick={(e) => {
                        if (source.isModal) {
                            parentCallback('ddddddddd');
                            openSubmenu('menu' + source.id.toString());
                        } else {
                            openSubmenu('menu' + source.id.toString());
                        }
                    }}>
                    {source.category_name}
                    <i
                        className="icon-chevron-down"
                        style={{ fontSize: '15px', marginLeft: '8px' }}></i>
                </a>
            }
            {source.subMenu && (
                <ul className={source.subClass + ' menu' + source.id}>
                    {source.subMenu.map((subMenuItem, index) => (
                        // <SubMenuDropdown source={subMenuItem} key={index} />
                        <li
                            className={
                                'menu-item-has-children dropdown submenu-available menuClass'
                            }>
                            {
                                <a
                                    href={`/category/${source.category_name}&category_id=${source.id}`}
                                    id={`/category/${subMenuItem.category_name}&category_id=${subMenuItem.id}`}
                                    className={
                                        subMenuItem.category_name + ' menuClass'
                                    }
                                    onClick={(e) =>
                                        handleClick(e, {
                                            name: subMenuItem.category_name,
                                            id: subMenuItem.id,
                                        })
                                    }>
                                    {subMenuItem.category_name}
                                </a>
                            }
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};
export default MenuDropdown;
