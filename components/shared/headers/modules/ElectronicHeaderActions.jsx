import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';

const ElectronicHeaderActions = ({ auth, ecomerce }) => {
    return (
        <div className="header__actions">
            {/* <Link href="/account/compare">
                <a className="header__extra">
                    <i className="icon-chart-bars"></i>
                    <span>
                        <i>
                            {ecomerce.compareItems
                                ? ecomerce.compareItems.length
                                : 0}
                        </i>
                    </span>
                </a>
            </Link> */}
            {/* <Link href="/account/wishlist"> */}
            <a className="header__extra">
                <i className="icon-heart"></i>
                <span>
                    <i>{ecomerce.wishlistItems.length}</i>
                </span>
            </a>
            {/* </Link> */}
            {/* <MiniCart /> */}
            {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
                <AccountQuickLinks isLoggedIn={true} />
            ) : (
                <AccountQuickLinks isLoggedIn={false} />
            )}
        </div>
    );
};

export default connect((state) => state)(ElectronicHeaderActions);
