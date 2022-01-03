import {CSRF_ERROR_REASON_NO_COOKIE, URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED, useHttpService} from './useHttpService'
import {AxiosErrorResponse} from '../types'
import {useRouter} from 'vue-router'

jest.mock('vue-router', () => ({
    useRouter: jest.fn(() => ({
        push: () => {
        }
    }))
}))


describe('[USE] HttpService', () => {
    const push = jest.fn()
    // @ts-ignore
    useRouter.mockImplementationOnce(() => ({push}))

    const {goToErrorPage, urlShouldRedirect, isCSRFError} = useHttpService()

    describe('urlShouldRedirect', () => {
        it('should redirect unauthorized users on non-excluded urls', () => {
            expect(urlShouldRedirect('/admin')).toBeTruthy()
        })

        it('won\'t redirect unauthorized users on urls excluded from redirects', () => {
            expect(urlShouldRedirect(URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED[0])).toBeFalsy()
            expect(urlShouldRedirect(`/blah/${URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED[0]}`)).toBeTruthy()
        })
    })

    describe('goToErrorPage', () => {

        const error: AxiosErrorResponse = {
            status: 403
        }

        goToErrorPage(error)
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toBeCalledWith({name: 'error', params: {errorCode: 403}})
    })

    describe('isCSRFError', () => {
        it('detects CSRF error response', () => {
            const csrfErrorResponse = {status: 400, data: {message: CSRF_ERROR_REASON_NO_COOKIE}} as AxiosErrorResponse

            expect(isCSRFError(csrfErrorResponse)).toBeTruthy()

            const otherErrorResponse = {status: 500, data: {message: 'Internal Server Error'}} as AxiosErrorResponse
            expect(isCSRFError(otherErrorResponse)).toBeFalsy()
        })
    })
})
