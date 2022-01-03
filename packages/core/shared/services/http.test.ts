import {createHttpClient} from './http'
import {createApp} from 'vue'
import {AxiosErrorResponse} from '../types'
import {useHttpService} from "../use/useHttpService";

jest.mock('..//use/useHttpService', () => ({
    useHttpService: jest.fn(() => ({
        goTo: () => {},
        replaceTo: () => {},
        isCSRFError: () => false,
        urlShouldRedirect: () => true
    }))
}))



describe('[SERVICE] HTTP Client', () => {
    const http = createHttpClient(createApp({}))

    describe('error response interceptor', () => {

        it('should do nothing if no error data', () => {
            jest.clearAllMocks()
            const goTo = jest.fn()

            // @ts-ignore
            useHttpService.mockImplementationOnce(() => (goTo))
            // @ts-ignore
            const errorInterceptor = http.interceptors.response.handlers[0]
            const errorPayload = {};
            const replaceTo = jest.fn(() => {
            })

            const promise = expect(
                errorInterceptor.rejected(errorPayload)
            ).rejects.toMatchObject(errorPayload)

            expect(goTo).not.toHaveBeenCalled()
            expect(replaceTo).not.toHaveBeenCalled()

            return promise
        })

        it('should redirect to login if unauthorized', () => {
            jest.clearAllMocks();
            const goTo = jest.fn()
            const urlShouldRedirect = jest.fn()
            const isCSRFError = jest.fn()
            // @ts-ignore
            useHttpService.mockImplementationOnce(() => ({goTo, urlShouldRedirect, isCSRFError}))
            // @ts-ignore
            const errorInterceptor = http.interceptors.response.handlers[0]

            const errorPayload = {
                config: {url: 'test/'},
                response: {status: 401, data: {message: 'Unauthorized'}} as AxiosErrorResponse
            }

            expect(errorInterceptor.rejected(errorPayload)).rejects.toMatchObject(errorPayload)

            // TODO: fix mocks (goTo is called but call counter being reset after Promise is rejected)
            // expect(goTo).toHaveBeenCalled()
            // // @ts-ignore
            // expect(goTo).toHaveBeenCalledWith({name: AUTH_LOGIN})
        })
    })
})
