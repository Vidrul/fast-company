import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import authService from "./auth.service";
import localStorageService from "./localStorage.service";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        const isExpired = refreshToken && expiresDate < Date.now();

        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url); //
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            if (isExpired) {
                const data = await authService.refresh();

                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }

            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        } else {
            if (isExpired) {
                const data = await authService.refresh();
                localStorageService.setTokens(data);
            }

            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`
                };
            }
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data;
}
http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        res.data = { content: res.data };
        return res;
    }, //положительный respones просто возвращаем или трансформируем как нам удобно
    (error) => {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            toast.error("Unexpected Error");
            console.log(error);
        }
        return Promise.reject(error);
    } // обрабатываем Unexpected Errors
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    patch: http.patch,
    delete: http.delete
};

export default httpService;
