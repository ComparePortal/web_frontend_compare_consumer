// import React, { useEffect, useState } from 'react';
// import { Slider, Checkbox } from 'antd';
// import { useRouter } from 'next/router';

// const WidgetShopFilterByPriceRange = (props) => {
//     const Router = useRouter();
//     const [min, setMin] = useState(
//         (props.priceRangeData && props.priceRangeData.min_price) || 0
//     );
//     const [max, setMax] = useState(
//         (props.priceRangeData && props.priceRangeData.max_price) || 0
//     );

//     useEffect(() => {
//         if (props.priceRangeData != null) {
//             setMin(props.priceRangeData.min_price);
//         }
//         if (props.priceRangeData && props.priceRangeData.max_price) {
//             setMax(props.priceRangeData.max_price);
//         }
//     }, [props]);

//     function handleChangeRange(value) {
//         setMin(value[0]);
//         price_lt: value[1], setMax(value[1]);

//         /*  const params = {
//             price_gt: value[0],
//         };*/
//         Router.push(`/shop?price_gt=${value[0]}&price_lt=${value[1]}`);
//         /*this.props.dispatch(getProductsByPrice(params));*/
//     }

//     return (
//         <aside className="widget widget_shop">
//             <figure>
//                 <h4 className="widget-title">By Price</h4>
//                 {max && (
//                     <Slider
//                         range
//                         defaultValue={[min, max]}
//                         max={max}
//                         onAfterChange={(e) => props.handleChangeRange(e)}
//                     />
//                 )}
//                 <p>
//                     Price: ₹{min} - ₹ {max}
//                 </p>
//             </figure>
//         </aside>
//     );
// };

// export default WidgetShopFilterByPriceRange;

import React, { useEffect, useState } from 'react';
import { Slider, Checkbox } from 'antd';
import { useRouter } from 'next/router';

const WidgetShopFilterByPriceRange = (props) => {
    const Router = useRouter();
    const [min, setMin] = useState(
        (props.priceRangeData && props.priceRangeData.min_price) || 0
    );
    const [max, setMax] = useState(
        (props.priceRangeData && props.priceRangeData.max_price) || 0
    );
    const [minSelected, setSelectedMin] = useState(
        (props.selectedPriceRange && props.selectedPriceRange.min_price) || 0
    );
    const [maxSelected, setSelectedMax] = useState(
        (props.selectedPriceRange && props.selectedPriceRange.max_price) || 0
    );

    useEffect(() => {
        console.log('propsssss', props.selectedPriceRange);
        if (props.priceRangeData != null) {
            setMin(props.priceRangeData.min_price);
        }
        if (props.priceRangeData && props.priceRangeData.max_price) {
            setMax(props.priceRangeData.max_price);
        }
        if (props.selectedPriceRange != null) {
            setSelectedMin(props.selectedPriceRange.min_price);
        }
        if (props.selectedPriceRange && props.selectedPriceRange.max_price) {
            setSelectedMax(props.selectedPriceRange.max_price);
        }
    }, [props]);

    function handleChangeRange(value) {
        setMin(value[0]);
        price_lt: value[1], setMax(value[1]);

        /*  const params = {
            price_gt: value[0],
        };*/
        Router.push(`/shop?price_gt=${value[0]}&price_lt=${value[1]}`);
        /*this.props.dispatch(getProductsByPrice(params));*/
    }

    const handleChange = (name) => (e, value) => {};

    return (
        console.log('222222222222222222', min, max, minSelected, maxSelected),
        (
            <aside className="widget widget_shop">
                <figure>
                    <h4 className="widget-title">By Price</h4>
                    {max && (
                        <Slider
                            key={`slider-${(
                                minSelected + maxSelected
                            ).toString()}`}
                            range
                            min={parseInt(min)}
                            // value={[minSelected, maxSelected]}
                            defaultValue={[minSelected, maxSelected]}
                            max={parseInt(max)}
                            onAfterChange={(e) => props.handleChangeRange(e)}
                        />
                    )}
                    <p>
                        Price: ₹{min} - ₹ {max}
                    </p>
                </figure>
            </aside>
        )
    );
};

export default WidgetShopFilterByPriceRange;
