import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios'
import {invenioConfig} from '../../config'
import {useHttpService} from '../use/useHttpService'
import {App} from 'vue'
import {AUTH_LOGIN} from '../../routes/constants'

const apiConfig = {
    baseURL: invenioConfig.APP.REST_ENDPOINTS_BASE_URL,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'HTTP_X_CSRFTOKEN',
};
export const http: AxiosInstance = axios.create(apiConfig)

const HTTP_STATUS_CODES_WITH_ERROR_PAGE = [404, 429, 500];

export function createHttpClient(app: App) {
    const responseRejectInterceptor = (error: AxiosError) => {
        const {urlShouldRedirect, goTo, goToErrorPage, isCSRFError} = useHttpService()

        const errorResponse = error.response;
        if (errorResponse) {
            const errorStatus = errorResponse.status
            const isUnauthorized = errorStatus === 401
            const originalRequest = error.config as AxiosRequestConfig & { _retry: boolean }
            const requestURL = originalRequest.url

            if (isUnauthorized && urlShouldRedirect(requestURL)) {
                goTo(AUTH_LOGIN, {query: 'sessionExpired'})
            } else {
                const alreadyRetried = originalRequest._retry
                if (isCSRFError(errorResponse) && !alreadyRetried) {
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
