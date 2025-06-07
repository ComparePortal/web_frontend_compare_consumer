// import React, { useEffect, useState } from 'react';
// import ProductRepository from '~/repositories/ProductRepository';
// import Link from 'next/link';
// import { Checkbox } from 'antd';
// import { DownOutlined, UpOutlined } from '@ant-design/icons';
// import { useRouter } from 'next/router';

// const WidgetShopBrands = (props) => {
//     const Router = useRouter();
//     const { slug } = Router.query;
//     const [brands, setBrands] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showMore, setShowMore] = useState(false);
//     const [showMoreText, setShowMoreText] = useState('');

//     let brandData = props.brandsData || [];

//     async function getCategories() {
//         setLoading(true);
//         let brandsGroup = [];
//         if (brandData.length > 0) {
//             brandData.map((brand) => {
//                 if (brand != '' && brand != null) {
//                     brandsGroup.push({
//                         value: brand,
//                         label: brand,
//                     });
//                 }
//             });
//         }
//         if (brandData && brandData.length == 0) {
//             setShowMoreText('');
//         } else {
//             setShowMoreText('Show more');
//         }
//         setShowMore(false);
//         document.getElementsByClassName('ant-checkbox-group')[0].style.height =
//             '310px';
//         setBrands(brandsGroup);

//         // setTimeout(
//         // function () {
//         setLoading(false);
//         //     }.bind(this),
//         //     250
//         // );
//     }

//     function handleSelectBrand(e) {
//         Router.push(`/brand/${e.target.value}`);
//     }

//     function handleShowLess(e) {
//         setShowMore(!showMore);
//         if (!showMore) {
//             setShowMoreText('Show less');
//             document.getElementsByClassName(
//                 'ant-checkbox-group'
//             )[0].style.height = 'auto';
//         } else {
//             setShowMoreText('Show more');
//             document.getElementsByClassName(
//                 'ant-checkbox-group'
//             )[0].style.height = '310px';
//         }
//     }

//     useEffect(() => {
//         // if (props && !props.loading) {
//         getCategories();
//     }, [props]);

//     // Views
//     let brandsView;
//     if (!loading) {
//         if (brands && brands.length == 0) {
//             // brandsView = <p>Not found</p>;
//         }
//     } else {
//         brandsView = <p>Loading...</p>;
//     }
//     return (
//         <aside className="widget widget_shop widget_shop--brand">
//             <h4 className="widget-title" style={{ marginBottom: '0px' }}>
//                 By {props?.brandTitle ? props.brandTitle : 'Brands'}
//             </h4>
//             {brandsView}
//             <figure>
//                 <Checkbox.Group
//                     options={brands}
//                     onChange={props.handleSelectBrand}
//                 />

//                 {brands.length > 8 && (
//                     <span
//                         style={{
//                             cursor: 'pointer',
//                             fontSize: '14px',
//                             color: '#06c',
//                         }}
//                         onClick={handleShowLess}>
//                         {!showMore ? (
//                             <span>
//                                 {showMoreText != '' && <DownOutlined />}{' '}
//                                 {showMoreText}
//                             </span>
//                         ) : (
//                             <span>
//                                 {showMoreText != '' && <UpOutlined />}{' '}
//                                 {showMoreText}
//                             </span>
//                         )}
//                     </span>
//                 )}
//             </figure>
//         </aside>
//     );
// };

// export default WidgetShopBrands;

import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { Checkbox } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const WidgetShopBrands = (props) => {
    const Router = useRouter();
    const { slug } = Router.query;
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(false);
    const [showMoreText, setShowMoreText] = useState('');

    let brandData = props.brandsData || [];

    async function getCategories() {
        setLoading(true);
        let brandsGroup = [];
        if (brandData.length > 0) {
            brandData.map((brand) => {
                if (brand != '' && brand != null) {
                    brandsGroup.push({
                        value: brand.label,
                        label: brand.label,
                        isChecked: brand.isChecked,
                    });
                }
            });
        }
        // console.log('brandsGroup', brandsGroup);
        if (brandData && brandData.length == 0) {
            setShowMoreText('');
        } else {
            setShowMoreText('Show more');
        }
        setShowMore(false);
        document.getElementsByClassName('ant-checkbox-group')[0].style.height =
            '310px';
        setBrands(brandsGroup);

        // setTimeout(
        // function () {
        setLoading(false);
        //     }.bind(this),
        //     250
        // );
    }

    function handleSelectBrand(e) {
        Router.push(`/brand/${e.target.value}`);
    }

    function handleShowLess(e) {
        setShowMore(!showMore);
        if (!showMore) {
            setShowMoreText('Show less');
            document.getElementsByClassName(
                'ant-checkbox-group'
            )[0].style.height = 'auto';
        } else {
            setShowMoreText('Show more');
            document.getElementsByClassName(
                'ant-checkbox-group'
            )[0].style.height = '310px';
        }
    }

    useEffect(() => {
        // if (props && !props.loading) {
        getCategories();
        // console.log('props.brands', props.brandsData);
    }, [props]);

    // Views
    let brandsView;
    if (!loading) {
        if (brands && brands.length == 0) {
            // brandsView = <p>Not found</p>;
        }
    } else {
        brandsView = <p>Loading...</p>;
    }
    return (
        <aside className="widget widget_shop widget_shop--brand">
            <h4 className="widget-title" style={{ marginBottom: '0px' }}>
                By {props?.brandTitle ? props.brandTitle : 'Brands'}
            </h4>
            {brandsView}
            <figure>
                <div class="ant-checkbox-group">
                    {brands.map((brand) => (
                        // console.log('bbbbbbbbbbbb', brand),
                        <div>
                            <input
                                type="checkbox"
                                id={brand.label}
                                name={brand.label}
                                checked={brand.isChecked}
                                defaultChecked={brand.isChecked}
                                onChange={props.handleSelectBrand}
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    cursor: 'pointer',
                                }}
                            />
                            <label
                                style={{
                                    paddingLeft: '10px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                }}
                                for={brand.label}>
                                {brand.label}
                            </label>
                        </div>
                    ))}
                </div>

                {/* <Checkbox.Group
                    options={brands}
                    onChange={props.handleSelectBrand}
                /> */}
                {brands.length > 8 && (
                    <span
                        style={{
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: '#06c',
                        }}
                        onClick={handleShowLess}>
                        {!showMore ? (
                            <span>
                                {showMoreText != '' && <DownOutlined />}{' '}
                                {showMoreText}
                            </span>
                        ) : (
                            <span>
                                {showMoreText != '' && <UpOutlined />}{' '}
                                {showMoreText}
                            </span>
                        )}
                    </span>
                )}
            </figure>
        </aside>
    );
};

export default WidgetShopBrands;
