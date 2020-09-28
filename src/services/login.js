import {
    post,
    get
} from "./http.js";

//登陆
export function getLogin(code) {
    return post("/app/login", {
        code
    });
}

export function getToken() {
    return get("/app/getToken", {});
}
//钉钉鉴权
export function jsapi() {
    return get("/app/getSignature", {});
}