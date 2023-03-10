import axios from "axios"
const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
})

class AuthService {
    constructor(apiurl) {
        this.apiurl = apiurl
    }

    post(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto);
    }

    put(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto);
    }

    delete(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl);
    }

    async get(url) {

        const requestUrl = `${this.apiurl}${url}`
        return await httpClient.get(requestUrl);
    }
}

export default AuthService;