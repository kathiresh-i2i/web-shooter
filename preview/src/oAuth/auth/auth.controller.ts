
export class AuthController {

    constructor() {

    }

    $onInit() {

    }


    oauthLogin() {
        const client_id = "758f2oqr8h4ossip9bi418eev2";
        const scope = "openid";
        const redirect_uri = "http://localhost:3000/!#/access_token";
        const response_type = "token";
        const url = `https://webshooter.auth.us-east-1.amazoncognito.com/login?client_id=${client_id}&response_type=${response_type}&scope=${scope}&redirect_uri=${redirect_uri}`
        console.log("....URL>>>",url);
     // window.location.replace(url);
    }


}