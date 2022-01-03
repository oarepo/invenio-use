import {AxiosErrorResponse} from '../services/types'
import {RouteParams, RouteQueryAndHash, Router, useRouter} from 'vue-router'

// const HTTP_STATUS_CODES_WITH_ERROR_PAGE = [404, 429, 500];
export const URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED: string[] = ['login'];
// CSRF possible errors
// const CSRF_ERROR_REASON_NO_COOKIE = 'CSRF cookie';
// const CSRF_ERROR_REASON_BAD_TOKEN = 'CSRF token';
// const CSRF_ERROR_REASON_BAD_SIGNATURE = 'CSRF error';


/**
 * Collection of HTTP API client service related composables.
 * @return composable useHttpService
 */
export function useHttpService() {
    const router: Router = useRouter()

    /**
     * Determines if unauthorized users should be redirected to the login route.
     * @param url  the accessed url address
     * @return     true if unauthorized and url path not excluded from redirection
     */
    const urlShouldRedirect = (url?: string): boolean => {
        const urlPath = url?.split('?', 1)[0];
        const pathsNoRedirect = URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED.filter((val) =>
            urlPath === val
        );
        const containsUrlNotRedirect = pathsNoRedirect.length > 0;
        return !containsUrlNotRedirect;
    };

    /**
     * Navigates to route given by its name and params
     *
     * @param name route name
     * @param args additional route arguments
     */
    const goTo = (name: string, args: RouteQueryAndHash | RouteParams): void => {
        router.push({name: name, ...args})
    }

    /**
     * Navigates to error page given by an error response.
     * @param errorResponse error data from the response
     */
    const goToErrorPage = (errorResponse: AxiosErrorResponse): void => {
        const state = {
            errorCode: errorResponse.status as string | number,
            errorId: (errorResponse.data && errorResponse.data?.error_id) ? errorResponse.data.error_id : undefined
        };

        router.push({name: 'error', params: {...state}})
    }
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
    // const responseRejectInterceptor = (error) => {
    //     const errorResponse = error.response;
    //     if (errorResponse) {
    //         const errorStatus = errorResponse.status;
    //         const isUnauthorized = errorStatus === 401;
    //         const originalRequest = error.config;
    //         const requestURL = originalRequest.url;
    //
    //         if (isUnauthorized && urlShouldRedirect(requestURL)) {
    //             goTo(`${AuthenticationRoutes.login}?sessionExpired`);
    //         } else {
    //             const alreadyRetried = originalRequest._retry;
    //             if (isCSRFError(errorStatus, errorResponse) && !alreadyRetried) {
    //                 originalRequest._retry = true;
    //                 return http.request(originalRequest);
    //             }
    //
    //             const hasDedicatedPage =
    //                 HTTP_STATUS_CODES_WITH_ERROR_PAGE.includes(errorStatus);
    //             if (hasDedicatedPage) {
    //                 goToErrorPage(errorResponse);
    //             }
    //         }
    //     }
    //
    //     return Promise.reject(error);
    // }

    return {urlShouldRedirect, goTo, goToErrorPage}
}

export default useHttpService
