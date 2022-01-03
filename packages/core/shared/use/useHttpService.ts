import {AxiosErrorResponse} from '../types'
import {RouteParams, RouteQueryAndHash, Router, useRouter} from 'vue-router'

export const URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED: string[] = ['login'];
// CSRF possible errors
export const CSRF_ERROR_REASON_NO_COOKIE = 'CSRF cookie';
export const CSRF_ERROR_REASON_BAD_TOKEN = 'CSRF token';
export const CSRF_ERROR_REASON_BAD_SIGNATURE = 'CSRF error';


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
     * @param name target route name
     * @param args additional route arguments
     */
    const goTo = (name: string, args: RouteQueryAndHash | RouteParams): void => {
        router.push({name: name, ...args})
    }

    /**
     * Replaces current route with another one
     *
     * @param name target route name
     * @param args additional target route arguments
     */
    const replaceTo = (name: string, args: RouteQueryAndHash | RouteParams): void => {
        router.replace({name: name, ...args})
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

    /**
     * Determines if the error is a CSRF error
     *
     * @param errorResponse
     */
    const isCSRFError = (errorResponse: AxiosErrorResponse) => {
        const isBadRequest = errorResponse.status === 400;
        const errorMessage = errorResponse.data && errorResponse.data.message;
        if (isBadRequest && errorMessage) {
            return errorMessage.includes(CSRF_ERROR_REASON_NO_COOKIE) ||
                errorMessage.includes(CSRF_ERROR_REASON_BAD_TOKEN) ||
                errorMessage.includes(CSRF_ERROR_REASON_BAD_SIGNATURE)
        }
        return false
    }

    /**
     * Navigate back in router history
     */
    const goBack = () => {
        router.back()
    }

    return {urlShouldRedirect, goTo, replaceTo, goBack, goToErrorPage, isCSRFError}
}

export default useHttpService
