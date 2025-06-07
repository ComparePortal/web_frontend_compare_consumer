import React, { Component } from 'react';
import CategoryRepository from '~/repositories/CategoryRepository';
class ElectronicTopCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topcategories: null,
        };
    }

    handleClick = (e, data) => {
        e.preventDefault();
        if (e.target.id != null) {
            let makeBreadcrumbItem = [
                {
                    id: 0,
                    url: '/',
                    text: 'Home',
                    isLast: false,
                },
            ];

            if (data.parentId && data.parentName) {
                makeBreadcrumbItem.push({
                    id: data.parentId,
                    url: `/category/${data.parentName}&category_id=${data.parentId}`,
                    text: data.parentName,
                    isLast: false,
                });
            }

            makeBreadcrumbItem.push({
                id: data.id,
                url: `/category/${data.name}&category_id=${data.id}`,
                text: data.name,
                isLast: true,
            });

            window.sessionStorage.setItem(
                'breadcrumbs',
                JSON.stringify(makeBreadcrumbItem)
            );
            this.props.router.push(e.target.id);
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
                <div className="container">
                    <h3>{this.props.lable}</h3>
                    <div className="row">
                        {this.state.topcategories != null &&
                            this.state.topcategories.map((category) => (
                                <div
                                    className="col-md-3 col-sm-4 col-12 "
                                    key={category[0]}>
                                    <div
                                        id="mnth-cat-box"
                                        className="ps-block--category-2"
                                        style={{
                                            flexDirection: 'column',
                                        }}>
                                        <a
                                            href={`/category/${category[1].category_name}&category_id=${category[0]}`}
                                            id={`/category/${category[1].category_name}&category_id=${category[0]}`}
                                            onClick={(e) =>
                                                this.handleClick(e, {
                                                    id: category[0],
                                                    name: category[1]
                                                        .category_name,
                                                })
                                            }>
                                            <div
                                                id={`/category/${category[1].category_name}&category_id=${category[0]}`}
                                                style={{
                                                    textAlign: 'center',
                                                    background: '#560c80',
                                                    color: 'white',
                                                    padding: '10px 0px',
                                                    marginBottom: '10px',
                                                    fontSize: '16px',
                                                }}>
                                                {category[1].category_name}
                                            </div>
                                        </a>
                                        <div style={{ display: 'flex' }}>
                                            <div className="ps-block__thumbnail mnth_thumbnail mnth_cat_thumbnail">
                                                <img
                                                    src={`${category[1].category_small_image}`}
                                                    // src="http://151.106.35.158:8000/media/category_images/smartphone-call.png"
                                                />
                                            </div>
                                            <div
                                                className="ps-block__content"
                                                style={{
                                                    // padding: '10px',
                                                    lineHeight: '1px',
                                                    // paddingLeft:'80px',
                                                }}>
                                                {/* <h4>
                                                            {
                                                                category[1]
                                                                    .category_name
                                                            }
                                                        </h4> */}
                                                <ul>
                                                    {category[1].subcatgories
                                                        .slice(0, 5)
                                                        .map((link) => (
                                                            <li>
                                                                <a
                                                                    href={`/category/${
                                                                        link[
                                                                            Object.keys(
                                                                                link
                                                                            )
                                                                        ]
                                                                            .category_name
                                                                    }&category_id=${Object.keys(
                                                                        link
                                                                    )}`}
                                                                    id={`/category/${
                                                                        link[
                                                                            Object.keys(
                                                                                link
                                                                            )
                                                                        ]
                                                                            .category_name
                                                                    }&category_id=${Object.keys(
                                                                        link
                                                                    )}`}
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        this.handleClick(
                                                                            e,
                                                                            {
                                                                                name: link[
                                                                                    Object.keys(
                                                                                        link
                                                                                    )
                                                                                ]
                                                                                    .category_name,
                                                                                id: Object.keys(
                                                                                    link
                                                                                ),
                                                                                parentId:
                                                                                    category[0],
                                                                                parentName:
                                                                                    category[1]
                                                                                        .category_name,
                                                                            }
                                                                        )
                                                                    }>
                                                                    {
                                                                        link[
                                                                            Object.keys(
                                                                                link
                                                                            )
                                                                        ]
                                                                            .category_name
                                                                    }
                                                                </a>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ElectronicTopCategories;
