import { actionTypes } from './action';

export const initState = {
    breadcrumbs: [],
};

function reducer(state = initState, actions) {
    switch (actions.type) {
        case actionTypes.SET_BREADCRUMB:
            // console.log('state', state);
            return {
                ...state,
                breadcrumbs: actions.payload,
            };
        case actionTypes.UNSET_BREADCRUMB:
            return {
                ...state,
                breadcrumbs: [],
            };
        default:
            return state;
    }
}

export default reducer;
