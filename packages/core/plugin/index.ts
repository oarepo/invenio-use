import {App} from 'vue'
import {createStore} from 'vuex'
import {createProxy, extractVuexModule} from 'vuex-class-component'
import {CoreStore} from '../store'
import {InvenioConfig} from './types'
import {invenioConfig} from "../config";

const InvenioCore = {
    installStoreModule(app: App): void {
        let store = null
        if (!app.config.globalProperties.$store) {
            store = createStore({
                modules: {
                    ...extractVuexModule(CoreStore)
                }
            })
        } else {
            store = app.config.globalProperties.$store
            store.registerModule('core', {...extractVuexModule(CoreStore)})
        }

        app.config.globalProperties.$invenio = {
            // TODO: check if not already installed
            core: createProxy(store, CoreStore),
            // @ts-ignore
        } as StoreProxy<CoreStore>
    },

    configure(app: App, invenioConfigOverrides: InvenioConfig): void {
        invenioConfig.merge(invenioConfigOverrides)
        app.config.globalProperties.$invenioConfig = invenioConfig
    },

    install(app: App, invenioConfigOverrides: InvenioConfig): void {
        this.installStoreModule(app)
        this.configure(app, invenioConfigOverrides)
    }
}

export default InvenioCore
