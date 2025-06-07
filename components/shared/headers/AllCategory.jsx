import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useEffect,
    useState,
} from 'react';
import { useRouter } from 'next/router';

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
import styles from '~/scss/components/allCategory.module.css';

const AllCategory = forwardRef((props, ref) => {
    const router = useRouter();
    const [isMainMenu, setIsMainMenu] = useState(true);
    const [menus, setMenus] = useState([]);
    // const [categoryListResponse, setCategoryListResponse] = useState();
    const [displayList, setDisplayList] = useState([]);
    let categoryListResponse = [];
    // let menus = [];

    useEffect(() => {
        // getCategory();
    }, []);

    const getCategory = () => {
        let categoriesData = [];
        const exampleCategories = CategoryRepository.getRepository();
        exampleCategories.then((result) => {
            if (result && result.data) {
                let data = result.data;
                // setCategoryListResponse(data);
                categoryListResponse = data;
                for (let a in data) {
                    let subCategory =
                        data[a].sub_categories.length > 0 ? true : false;

                    if (
                        data[a].category_is_parent &&
                        data[a].category_parent_id == null
                    ) {
                        categoriesData.push(
                            <li
                                className={styles.menuli}
                                id={a}
                                onClick={
                                    data[a].sub_categories.length > 0
                                        ? showSubCategory
                                        : null
                                }>
                                {data[a].category_name}
                            </li>
                        );
                    }
                }
                setMenus(categoriesData);
                // menus = categoriesData;
                setDisplayList(categoriesData);
            }
        });
    };

    const showSubCategory = (e) => {
        let list = [];
        e.preventDefault();

        if (categoryListResponse)
            if (
                Object.values(
                    categoryListResponse[e.target.id].sub_categories
                ) &&
                Object.values(
                    categoryListResponse[e.target.id].sub_categories.length > 0
                )
            ) {
                list = Object.values(
                    categoryListResponse[e.target.id].sub_categories
                ).map((item) => (
                    <li className={styles.menuli}>
                        {/* <Link href="/category/[id]" as={`/category/${item.id}`}>
                        </Link> */}
                        <a
                            href={`/category/${item.id}`}
                            id={`/category/${item.id}`}
                            className={item.category_name}
                            onClick={redirectTocategoryProductPage}>
                            {item.category_name}
                        </a>
                    </li>
                ));
                setIsMainMenu(false);
                setDisplayList(list);
            } else {
            }
    };

    const [allCategoryWidth, setAllCategoryWidth] = useState('0px');
    useImperativeHandle(ref, () => ({
        openNav() {
            document.getElementById('main_divs').style.display = 'block';
            setAllCategoryWidth('350px');
            // document.body.style.background = 'rgba(0,0,0,0.9)';
        },

        closeNav() {
            setAllCategoryWidth('0px');
        },
    }));

    const closeNav = () => {
        setAllCategoryWidth('0px');
        document.getElementById('main_divs').style.display = 'none';
        getCategory();
    };

    const goToMainMenu = () => {
        setIsMainMenu(true);
        setDisplayList(menus);
    };

    const redirectTocategoryProductPage = (e) => {
        e.preventDefault();
        // setIsMainMenu(true);
        // setDisplayList(menus);
        closeNav();
        router.push(e.target.id);
    };

    return (
        <div>
            <div id="main_divs" className={styles.main_divs}></div>
            <div style={{ width: allCategoryWidth }} className={styles.sidenav}>
                <span className={styles.closebtn} onClick={closeNav}>
                    &times;
                </span>
                {!isMainMenu && (
                    <span
                        className={styles.mainMenu}
                        onClick={goToMainMenu}></span>
                )}
                <ul style={{ color: 'white' }}>{displayList}</ul>
            </div>
        </div>
    );
});

// const AllCategory = () => {
//     const [allCategoryWidth, setAllCategoryWidth] = useState('0px');
//     const openNav = () => {
//         setAllCategoryWidth('250px');
//     };

//     const closeNav = () => {
//         setAllCategoryWidth('0px');
//     };

//     return (
//         <div>
//             <div style={{ width: allCategoryWidth }} className={styles.sidenav}>
//                 <a href="#">About</a>
//                 <a href="#">Services</a>
//                 <a href="#">Clients</a>
//                 <a href="#">Contact</a>
//             </div>
//         </div>
//     );
// };

export default AllCategory;
