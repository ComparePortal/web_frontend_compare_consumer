export const actionTypes = {
    SET_BREADCRUMB: 'SET_BREADCRUMB',
    UNSET_BREADCRUMB: 'UNSET_BREADCRUMB',
};

export function setBreadcrumb(payload) {
    return { type: actionTypes.SET_BREADCRUMB, payload };
}

export function unsetBreadcrumb() {
    return { type: actionTypes.UNSET_BREADCRUMB };
}
