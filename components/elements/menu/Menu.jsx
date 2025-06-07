import React from 'react';
import Link from 'next/link';
import MenuDropdown from '~/components/elements/menu/MenuDropdown';
import MegaMenu from '~/components/elements/menu/MegaMenu';

const Menu = ({
    source,
    className,
    handleAllCategoryClick,
    parentCallback,
}) => {
    // Views
    let menuView;
    if (source) {
        menuView = source.map((item) => {
            if (item.subMenu) {
                return (
                    <MenuDropdown
                        source={item}
                        key={item.category_name}
                        parentCallback={parentCallback}
                    />
                );
            } else if (item) {
                return (
                    <MegaMenu
                        source={item}
                        key={item}
                        handleAllCategoryClick={handleAllCategoryClick}
                    />
                );
            } else {
                return (
                    <li key={item.category_name}>
                        <Link href="/shop">
                            <a>
                                {/* {item.icon && <i className={item.icon}></i>} */}
                                <i className="icon-laundry"></i>
                                {item.category_name}
                            </a>
                        </Link>
                    </li>
                );
            }
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    No menu item.
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
};

export default Menu;
