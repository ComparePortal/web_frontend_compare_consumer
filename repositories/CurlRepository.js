import Repository, { baseUrl, prodUrl } from './Repository';

class CurlRepository {
    async getRepository (url) {
        const reponse = await Repository.get(`${prodUrl}.${url}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async postRepository (url, data) {
        
    }

}

export default new CurlRepository();