import React from 'react';

const ModuleShopPerPageItem = () => {
    return (
        <select
            className="ps-select form-control"
            data-placeholder="Sort Items">
            <option>20</option>
            <option>40</option>
            <option>60</option>
            <option>80</option>
            <option>100</option>
        </select>
    );
};

export default ModuleShopPerPageItem;
