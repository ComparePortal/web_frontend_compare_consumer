import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
// import menuData from '~/public/static/data/menu';
// import menuData from '~/public/static/data/categories';
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import Menu from '~/components/elements/menu/Menu';
import { stickyHeader } from '~/utilities/common-helpers';
import CategoryRepository from '~/repositories/CategoryRepository';
import AllCategory from './AllCategory';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CloseOutlined } from '@ant-design/icons';

const HeaderElectronic = () => {
    const childRef = useRef(null);

    const [menuList, setMenuList] = useState([]);
    const [getElectonicsSubMenus, setElectonicsSubMenus] = useState([]);
    const [getFashionSubMenus, setFashionSubMenus] = useState([]);
    const [getBooksSubMenus, setBooksSubMenus] = useState([]);
    const [getApplianceSubMenus, setApplianceSubMenus] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    const handleAllCategoryClick = () => {
        childRef.current.openNav();

        // childRef.current.childFunction2();
    };

    async function getMenuList() {
        const getMenus = await CategoryRepository.getRepository();
        let menuArray = [];
        if (getMenus && getMenus.data && getMenus.data.menu_items) {
            for (let key in getMenus.data.menu_items) {
                let objKeys = Object.keys(getMenus.data.menu_items[key]);
                for (let key2 of objKeys) {
                    let menu = getMenus.data.menu_items[key][key2];
                    menu['id'] = key2;
                    if (
                        // menu['category_name'] == 'Beauty' ||
                        menu['category_name'] == 'Fashion'
                    ) {
                        menu['isModal'] = true;
                    }
                    if (
                        menu['sub_categories'] != null &&
                        menu['sub_categories'].length > 0
                    ) {
                        menu['subMenu'] = menu['sub_categories'];
                    }

                    let menuObject = { ...menu, subClass: 'sub-menu' };
                    menuArray.push(menuObject);
                }
            }
            setMenuList(menuArray);
            window.sessionStorage.setItem('menu', JSON.stringify(menuArray));
        }
        setTimeout(removeMenuSession, 30 * 60 * 1000);
    }

    async function menuStructure(menu) {
        let menuArray = [];

        menu.map((item) => {
            let menuObject = { ...item, subClass: 'sub-menu' };

            menuArray.push(menuObject);
        });
        setMenuList(menuArray);
    }

    async function removeMenuSession() {
        window.sessionStorage.removeItem('menu');
        getMenuList();
    }

    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
        let getMenu = window.sessionStorage.getItem('menu');
        if (getMenu) {
            menuStructure(JSON.parse(getMenu));
            setTimeout(removeMenuSession, 30 * 60 * 1000);
        } else {
            getMenuList();
        }

        window.addEventListener('mousedown', hideSubmenu);
        return () => {
            window.removeEventListener('mousedown', hideSubmenu);
        };
    }, []);

    const hideSubmenu = (event) => {
        if (modalShow) {
            if (!event.target.classList.contains('menuClass')) {
                var element = document.getElementsByClassName('sub-menu');
                for (let i = 0; i < element.length; i++) {
                    element[i].classList.remove('show-submenu');
                }
            }
        }
    };

    const menuElectronic = [
        {
            category_name: 'All',
            id: 1,
            url: '/shop',
            icon: 'icon-star',
        },
        {
            category_name: 'Home Electronics',
            url: '/shop',
            id: 1,
            icon: 'icon-laundry',
        },
        {
            category_name: 'Computer & Technology',
            url: '/shop',
            id: 29,
            icon: 'icon-laptop',
        },
        {
            category_name: 'Camera & Videos',
            url: '/shop',
            id: 90,
            icon: 'icon-camera2',
        },
        {
            category_name: 'Mobile',
            url: '/shop',
            id: 2,
            icon: 'icon-surveillance',
        },
        {
            category_name: 'Beauty',
            url: '/shop',
            id: 1513,
            icon: 'icon-surveillance',
        },
    ];
    // const menuData = CategoryRepository.getRepository()
    // let menusData = [];
    // for (let a in menuData) {
    //     // console.log("car123", a)
    //     menuData[a].parent_cat_id = a;
    //     menusData.push(menuData[a]);
    // }

    const handleCallback = (childData) => {
        setModalShow(true);

        console.log('handle_click', childData);
    };

    return (
        <header
            className="header header--standard header--electronic"
            id="headerSticky">
            <AllCategory ref={childRef} />
            {/* <div className="header__top">
                <div className="container">
                    <div className="header__left">
                        <p>Welcome to Comparor App Store !</p>
                    </div>
                </div>
            </div> */}
            <div className="header__content">
                <div className="container">
                    <div className="header__content-left">
                        <Link href="/">
                            <a className="ps-logo" style={{ margin: '0 auto' }}>
                                <img
                                    src="https://yashra.azureedge.net/web-logo.webp"
                                    alt="yashraa"
                                    style={{ width: '70%', height: '100%' }}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="header__content-center">
                        <SearchHeader menuList={menuList} />
                    </div>
                    <div className="header__content-right">
                        <ElectronicHeaderActions />
                    </div>
                </div>
            </div>
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
                        <a style={{ color: 'white' }} href="http://yashra.in/">
                            Yashra.in
                        </a>
                        <p style={{ marginTop: '10px' }}></p>The products in
                        this category are in beta testing. You can view and shop
                        the products but comparisons are not yet available.
                        <p style={{ marginTop: '10px' }}></p>Thanks for your
                        support of our project. We are very excited to hear what
                        you think. You can write your suggestions and ideas and
                        mail us at{' '}
                        <a
                            style={{ color: 'white' }}
                            href="mailto:admin@yashra.in">
                            admin@yashra.in
                        </a>
                        <p style={{ marginTop: '10px' }}></p>Thanks & Regards
                        <br></br>Team Yashraa
                    </p>
                </Modal.Body>
            </Modal>
            <nav className="navigation">
                <div className="container">
                    <Menu
                        source={menuList}
                        handleAllCategoryClick={handleAllCategoryClick}
                        parentCallback={handleCallback}
                        className="menu menu--electronic main-menu-header"
                    />
                </div>
            </nav>
        </header>
    );
};

export default HeaderElectronic;
