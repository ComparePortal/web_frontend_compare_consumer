import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BreadCrumb = ({ breacrumb, layout }) => {
    const router = useRouter();
    const handleClick = (e, data) => {
        e.preventDefault();

        if (data.url != null) {
            if (data.url == '/') {
                window.sessionStorage.setItem('breadcrumbs', []);
            } else {
                let makeBreadcrumbList = [];
                if (window.sessionStorage.getItem('breadcrumbs')) {
                    for (let item of JSON.parse(
                        window.sessionStorage.getItem('breadcrumbs')
                    )) {
                        if (item.id != data.id) {
                            makeBreadcrumbList.push({
                                id: item.id,
                                url: item.url,
                                text: item.text,
                                isLast: false,
                            });
                        } else {
                            makeBreadcrumbList.push({
                                id: item.id,
                                url: item.url,
                                text: item.text,
                                isLast: true,
                            });
                            break;
                        }
                    }
                    window.sessionStorage.setItem(
                        'breadcrumbs',
                        JSON.stringify(makeBreadcrumbList)
                    );
                }
            }
            router.push(data.url);
        }
    };

    return (
        <div className="ps-breadcrumb">
            <div
                className={
                    layout === 'fullwidth' ? 'ps-container' : 'container'
                }
                style={{ width: '92%' }}>
                <ul className="breadcrumb">
                    {breacrumb.map((item, index) => {
                        if (!item.url) {
                            return <li key={index}>{item.text}</li>;
                        } else if (item.isLast) {
                            return <li key={index}>{item.text}</li>;
                        } else {
                            return (
                                <li key={item.text}>
                                    {/* <Link href={item.url.toString()}> */}
                                    <a
                                        href={item.url}
                                        onClick={(e) =>
                                            handleClick(e, {
                                                name: item.text,
                                                id: item.id,
                                                url: item.url,
                                            })
                                        }>
                                        {item.text}
                                    </a>
                                    {/* </Link> */}
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </div>
    );
};

export default BreadCrumb;
