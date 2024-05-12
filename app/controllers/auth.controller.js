import moment from "moment";

export default class AuthController {

    async postData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async login (email, password)  {
        return await this.postData(process.env.EXPO_PUBLIC_AUTH_API_URL + "/api/auth/login",{
            email: email,
            password: password
        }).then((res => {
            if('jwt' in res){
                this.setSession(res);
                console.log(res);
            }
        }));
    }

    setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        sessionStorage.setItem('id_token', authResult.jwt);
        sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        sessionStorage.removeItem('id_token');
        sessionStorage.removeItem('expires_at');
    }

    async isLoggedIn(){
        return await this.postData(process.env.EXPO_PUBLIC_AUTH_API_URL + "/api/auth/me", {
            headers: {
                Authorization: 'Bearer ' + this.getToken()
            },
            withCredentials: true
        }).then((res) => {
            console.log(res);
            return res;
        });
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration ?? '0');
        return moment(expiresAt);
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    async register (firstName, lastName, email, password) {
        const response = await this.postData(process.env.EXPO_PUBLIC_AUTH_API_URL + "/api/auth/register", {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        })
        console.log(response)
    }
}