import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios'
import {invenioConfig} from '../../config'
import useHttpService from '~/core/shared/use/useHttpService'
import {App} from 'vue'
import useInvenio from "~/core/shared/use/useInvenio";

const apiConfig = {
    baseURL: invenioConfig.APP.REST_ENDPOINTS_BASE_URL,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'HTTP_X_CSRFTOKEN',
};
export const http: AxiosInstance = axios.create(apiConfig)

const HTTP_STATUS_CODES_WITH_ERROR_PAGE = [404, 429, 500];
// const URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED = ['/me', '/me/loans'];
// // CSRF possible errors
// const CSRF_ERROR_REASON_NO_COOKIE = 'CSRF cookie';
// const CSRF_ERROR_REASON_BAD_TOKEN = 'CSRF token';
// const CSRF_ERROR_REASON_BAD_SIGNATURE = 'CSRF error';

//
// const isCSRFError = (errorStatus, errorResponse) => {
//     const isBadRequest = errorStatus === 400;
//     const errorMessage = errorResponse.data && errorResponse.data.message;
//     if (isBadRequest && errorMessage) {
//         const isCSRFError =
//             errorMessage.includes(CSRF_ERROR_REASON_NO_COOKIE) ||
//             errorMessage.includes(CSRF_ERROR_REASON_BAD_TOKEN) ||
//             errorMessage.includes(CSRF_ERROR_REASON_BAD_SIGNATURE);
//         return isCSRFError;
//     }
//     return false;
// };
//

export function createHttpClient(app: App) {
    const responseRejectInterceptor = (error: AxiosError) => {
        const {routes} = useInvenio(app)
        const {urlShouldRedirect, goTo, goToErrorPage} = useHttpService()

        const errorResponse = error.response;
        if (errorResponse) {
            const errorStatus = errorResponse.status
            const isUnauthorized = errorStatus === 401
            const originalRequest = error.config as AxiosRequestConfig & {_retry: boolean}
            const requestURL = originalRequest.url

            if (isUnauthorized && urlShouldRedirect(requestURL)) {
                goTo(routes.value.AUTH_LOGIN, {query: 'sessionExpired'})
            } else {
                const alreadyRetried = originalRequest._retry
                if (isCSRFError(errorStatus, errorResponse) && !alreadyRetried) {
                    originalRequest._retry = true
                    return http.request(originalRequest)
                }

                const hasDedicatedPage =
                    HTTP_STATUS_CODES_WITH_ERROR_PAGE.includes(errorStatus);
                if (hasDedicatedPage) {
                    goToErrorPage(errorResponse);
                }
            }
        }

        return Promise.reject(error);
    };

    http.interceptors.response.use(undefined, responseRejectInterceptor);

    return http
}

export default {createHttpClient, apiConfig}
