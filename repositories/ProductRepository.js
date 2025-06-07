import Repository, { baseUrl, prodUrl, serializeQuery } from './Repository';

class ProductRepository {
    async getRecords(params) {
        return null;
        // const reponse = await Repository.get(
        //     `${baseUrl}/products?${serializeQuery(params)}`
        // )
        //     .then((response) => {
        //         return response.data;
        //     })
        //     .catch((error) => ({ error: JSON.stringify(error) }));
        // return reponse;
    }

    async getProducts(params) {
        // const reponse = await Repository.get(
        //     `${baseUrl}/products?${serializeQuery(params)}`
        // )
        //     .then((response) => {
        //         if (response.data && response.data.length > 0) {
        //             return response.data;
        //         } else {
        //             return null;
        //         }
        //     })

        //     .catch((error) => {
        //         console.log(JSON.stringify(error));
        //         return null;
        //     });
        return null;
    }

    async getBrands() {
        // const reponse = await Repository.get(`${baseUrl}/brands`)
        //     .then((response) => {
        //         return response.data;
        //     })
        //     .catch((error) => ({ error: JSON.stringify(error) }));
        return null;
    }

    async getProductCategories() {
        // const reponse = await Repository.get(`${baseUrl}/product-categories`)
        //     .then((response) => {
        //         return response.data;
        //     })
        //     .catch((error) => ({ error: JSON.stringify(error) }));
        return null;
    }

    async getTotalRecords() {
        // const reponse = await Repository.get(`${baseUrl}/products/count`)
        //     .then((response) => {
        //         return response.data;
        //     })
        //     .catch((error) => ({ error: JSON.stringify(error) }));
        return null;
    }

    async getProductsById(payload) {
        const reponse = await Repository.get(
            `${prodUrl}/api/fetch_product_data?product_id=${payload}`
        )
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getRelatedProducts(endpoint) {
        const reponse = await Repository.get(
            `${prodUrl}/api/fetch_related_products?${endpoint}`
        )
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getRealTimePricePortal(data) {
        const reponse = await Repository.post(
            `${prodUrl}/api/update_real_time_price`,
            data
        )
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getRealTimePricePortalNew(data) {
        let newUrl = 'https://yashra.in:8050';
        const reponse = await Repository.post(
            `${newUrl}/api/realTimePrice`,
            data
        )
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getOtherTimePricePortalNew(data) {
        let newUrl = 'https://yashra.in:8050';
        const reponse = await Repository.post(
            `${newUrl}/api/other_portal_price`,
            data
        )
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async saveUserData(ip, url, pid) {
        let saveUrl = 'https://yashra.in:8050';
        const reponse = await Repository.post(`${saveUrl}/api/saveData`, {
            ip,
            url,
            product_id: parseInt(pid),
        })
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    

    async saveUserAnalyticsData(data) {
        console.log("unigt stata", data)
        let saveUrl = 'https://yashra.in:8050';
        const reponse = await Repository.post(`${saveUrl}/user_details`, data)
            .then((response) => {
                if (response && response.status == 200) {
                    let result = response.data;
                    return result;
                }
                return null;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
        // }
    }
    

    async getSearchProducts(payload) {
        const reponse = await Repository.get(
            `${prodUrl}/api/search_product?category_id=${payload.id}&product_name=${payload.keyword}`
        )
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByCategory(payload) {
        // const reponse = await Repository.get(
        //     `${baseUrl}/product-categories?slug=${payload}`
        // )
        //     .then((response) => {
        //         if (response.data) {
        //             if (response.data.length > 0) {
        //                 return response.data[0];
        //             }
        //         } else {
        //             return null;
        //         }
        //     })
        //     .catch(() => {
        //         return null;
        //     });
        return null;
    }

    async getProductsByBrand(payload) {
        // const reponse = await Repository.get(
        //     `${baseUrl}/brands?slug=${payload}`
        // )
        //     .then((response) => {
        //         if (response.data) {
        //             if (response.data.length > 0) {
        //                 return response.data[0];
        //             }
        //         } else {
        //             return null;
        //         }
        //     })
        //     .catch(() => {
        //         return null;
        //     });
        return null;
    }

    async getProductsByIds(payload) {
        const endPoint = `${prodUrl}/api/fetch_product_data?${payload}`;
        const reponse = await Repository.get(endPoint)
            .then((response) => {
                if (response.data) {
                    let data = response.data;
                    let result = [];
                    for (let result1 in data) {
                        data[result1].id = result1;
                        result.push(data[result1]);
                    }
                    return result;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
}

export default new ProductRepository();
