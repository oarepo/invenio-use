import InvenioRoutesGenerator from './generator'
import {
    AUTH_LOGIN, AUTH_LOGOUT,
    ERROR,
    HOME,
    RECORD_CREATE,
    RECORD_DETAIL_EDIT,
    RECORD_DETAIL_VIEW,
    RECORD_SEARCH,
    USER_PROFILE
} from './constants'
import {createApp} from 'vue'

describe('[ROUTES] InvenioRoutes generator', () => {
    const base = '/'
    const generator = new InvenioRoutesGenerator( createApp({}))

    it('generates static app routes', () => {
        const home = generator.home()
        expect(home.name).toBe(HOME)
        expect(home.path).toBe(base)

        const userProfile = generator.userProfile()
        expect(userProfile.name).toBe(USER_PROFILE)
        expect(userProfile.path).toBe(`${base}profile`)

        const errorPage = generator.errorPage()
        expect(errorPage.name).toBe(ERROR)
        expect(errorPage.path).toBe('/error/:errorCode/:errorId')

        const login = generator.login()
        expect(login.name).toBe(AUTH_LOGIN)
        expect(login.path).toBe('/login')

        const logout = generator.logout()
        expect(logout.name).toBe(AUTH_LOGOUT)
        expect(logout.path).toBe('/logout')
    })

    it('generates record collection routes', () => {
        const c = generator.collection()

        expect(c.path).toBe('/:model')
        expect(c.children?.length).toBe(3)  // detail + create + search
        expect(c.children?.find(r => r.name === RECORD_CREATE)).toBeTruthy()
        expect(c.children?.find(r => r.name === RECORD_SEARCH)).toBeTruthy()
    })

    it('generates record detail routes', () => {
        const d = generator.recordDetail('record/:recordPid')
        expect(d.path).toBe('/record/:recordPid')
        expect(d.children?.find(r => r.name === RECORD_DETAIL_VIEW)).toBeTruthy()
        expect(d.children?.find(r => r.name === RECORD_DETAIL_EDIT)).toBeTruthy()
    })

    it('generates record search routes', () => {
        const search = generator.recordSearch('custom')
        expect(search.name).toBe(RECORD_SEARCH)
        expect(search.path).toBe('/custom')
    })

    it('generates record create route', () => {
        const create = generator.recordCreate('records/custom-create')
        expect(create.name).toBe(RECORD_CREATE)
        expect(create.path).toBe('/records/custom-create')
    })
})
