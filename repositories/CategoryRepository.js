import Repository, { prodUrl, ngEock, serializeQuery } from './Repository';

class CategoryRepository {
    async getRepository() {
        const reponse = await Repository.get(
            `${prodUrl}/api/get_category_list_json_new`
        )
            .then((response) => {
                // console.log("response123", response)
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
        return null;
    }

    async getSubmenuList(id) {
        const reponse = await Repository.get(
            `${prodUrl}/api/get_subcategory_list_json?id=${id}`
        )
            .then((response) => {
                // console.log("response123", response)
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
        return null;
    }

    async getTopCategoriesOfMonth() {
        const reponse = await Repository.get(
            `${prodUrl}/api/fetch_homepage_data`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new CategoryRepository();
