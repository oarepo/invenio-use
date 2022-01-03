import {createHttpClient} from './http'
import {createApp} from 'vue'


describe('HTTP Client', () => {
    const http = createHttpClient(createApp({}))

    describe('error response interceptor', () => {
        // @ts-ignore
        const errorInterceptor = http.interceptors.response[0]

        it('should do nothing if no error data', () => {
                const errorPayload = {};
                const promise = expect(
                    errorInterceptor.rejected(errorPayload)
                ).rejects.toMatchObject(errorPayload);

                expect(goTo).not.toHaveBeenCalled();
                expect(replaceTo).not.toHaveBeenCalled();

                return promise;
            }
        )
    })
})
