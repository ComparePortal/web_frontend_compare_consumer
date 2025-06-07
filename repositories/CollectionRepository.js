import Repository, { baseUrl, prodUrl } from './Repository';
import BestSeller from '../Data/electronics-best-sellers';
import BestSeller2 from '../Data/amazon_api_response';

class CollectionRepository {
    async getProductsByCollectionSlug(slug, page = 1, items_per_page = 20) {
        // if(slug=== "electronics-best-sellers"){
        //     console.log("iffff", slug)
        //     console.log("vest", BestSeller)
        //     return  { items: BestSeller[0].products }
        // }else{

        const reponse = await Repository.get(
            `${prodUrl}/api/get_category_page_products?${slug}`
        )
            .then((response) => {
                if (response && response.status == 200) {
                    let result = response.data;
                    return result;
                }
                return null;

                for (let product in result) {
                    if (result[product].products) {
                        console.log('Evtered');
                        return {
                            items: result[product].products,
                            categoryName: result[product].category_name,
                        };
                    } else {
                        return null;
                    }
                    return response.data;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
        // }
    }

    async saveUserData(ip, url, categoryId) {
        let saveUrl = 'https://yashra.in:8050';
        const reponse = await Repository.post(`${saveUrl}/api/saveData`, {
            ip,
            url,
            category_id: parseInt(categoryId),
        })
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

    async saveUserAnalyticsData(data) {
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

    async getPopularProduct(id) {
        const reponse = await Repository.get(
            `${prodUrl}/api/fetch_products_for_popular_categories?category_id=${id}`
        )
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

    async getSubCategory(id) {
        const reponse = await Repository.get(
            `${prodUrl}/api/get_sub_categories?category_id=${id}`
        )
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

    async getBrands(id) {
        const reponse = await Repository.get(
            `${prodUrl}/api/get_category_brands?category_id=${id}`
        )
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

    async getPrices(id) {
        const reponse = await Repository.get(
            `${prodUrl}/api/get_min_max_price?category_id=${id}`
        )
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

    async getProductsByHomepageCollectionSlug(
        slug,
        page = 1,
        items_per_page = 20
    ) {
        // if(slug=== "electronics-best-sellers"){
        //     console.log("iffff", slug)
        //     console.log("vest", BestSeller)
        //     return  { items: BestSeller[0].products }
        // }else{

        const reponse = await Repository.get(
            `${prodUrl}/api/get_category_products?${slug}`
        )
            .then((response) => {
                if (response && response.status == 200) {
                    let result = response.data;
                    return result;
                }
                return null;

                for (let product in result) {
                    if (result[product].products) {
                        console.log('Evtered');
                        return {
                            items: result[product].products,
                            categoryName: result[product].category_name,
                        };
                    } else {
                        return null;
                    }
                    return response.data;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
        // }
    }

    async getProductsSearchByCollectionSlug(
        slug,
        page = 1,
        items_per_page = 20
    ) {
        // if(slug=== "electronics-best-sellers"){
        //     console.log("iffff", slug)
        //     console.log("vest", BestSeller)
        //     return  { items: BestSeller[0].products }
        // }else{

        const reponse = await Repository.get(
            `${prodUrl}/api/search_product?${slug}`
        )
            .then((response) => {
                if (response && response.status == 200) {
                    let result = response.data;
                    return result;
                }
                return null;

                for (let product in result) {
                    if (result[product].products) {
                        console.log('Evtered');
                        return {
                            items: result[product].products,
                            categoryName: result[product].category_name,
                        };
                    } else {
                        return null;
                    }
                    return response.data;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
        // }
    }

    async getProductsByCategorySlug(slug) {
        // const reponse = await Repository.get(
        //     `${baseUrl}/product-categories?slug_in=${slug}`
        // )
        //     .then((response) => {
        //         console.log('xxxxx', response.data);
        //         if (response.data && response.data.length > 0) {
        //             return {
        //                 items: response.data[0].products,
        //             };
        //         } else {
        //             return null;
        //         }
        //         return response.data;
        //     })
        //     .catch((error) => {
        //         console.log(JSON.stringify(error));
        //         return null;
        //     });
        return null;
    }
}

export default new CollectionRepository();
