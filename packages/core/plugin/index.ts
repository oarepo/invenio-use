import {App} from 'vue'
import {createStore} from 'vuex'
import {createProxy, extractVuexModule} from 'vuex-class-component'
import {CoreStore} from '../shared/store'
import {InvenioAppInstance, InvenioConfig} from './types'
import invenioConfig, {InvenioAppConfig} from '../config'
import {createHttpClient} from '../shared/services/http'
import {InvenioRoutesGenerator} from "~/core";

const InvenioCore = {
    installStoreModule(app: App): void {
        let store = app.config.globalProperties.$store
        if (!store) {
            store = createStore({
                modules: {
                    ...extractVuexModule(CoreStore)
                }
            })
            app.use(store)
        } else {
            store.registerModule('core', {...extractVuexModule(CoreStore)})
        }

        const invenioProxy = app.config.globalProperties.$invenio.store
        app.config.globalProperties.$invenio.store = {
            ...invenioProxy,
            core: createProxy(store, CoreStore),
            // @ts-ignore
        } as StoreProxy<CoreStore>
    },

    configureInvenioApp(app: App, invenioConfigOverrides: InvenioConfig): void {
        invenioConfig.merge(invenioConfigOverrides)
        app.config.globalProperties.$invenio.config = invenioConfig as InvenioAppConfig
    },

    installRoutes(app: App): void {
        app.config.globalProperties.$invenio.routes = new InvenioRoutesGenerator(app)
    },

    installAxiosServices(app: App): void {
        app.config.globalProperties.$http = createHttpClient(app)
    },

    install(app: App, invenioConfigOverrides: InvenioConfig): void {
        app.config.globalProperties.$invenio = {} as InvenioAppInstance

        this.configureInvenioApp(app, invenioConfigOverrides)
        this.installRoutes(app)
        this.installStoreModule(app)
        this.installAxiosServices(app)
    }
}

export default InvenioCore
