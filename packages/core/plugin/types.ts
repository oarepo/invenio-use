import {ProxyWatchers, VuexModule} from 'vuex-class-component/dist/interfaces'
import {AppConfig, CollectionConfig} from '../config/types'
import {CoreStore, InvenioAppConfig, InvenioRoutesGenerator} from '~/core'

export interface InvenioConfig {
    app: AppConfig,
    models: CollectionConfig
}

export interface InvenioAppInstance {
    config?: InvenioAppConfig,
    routes: InvenioRoutesGenerator,
    // @ts-ignore
    store?: StoreProxy<CoreStore>
}

export interface StoreProxy<T extends typeof VuexModule> {
    core: ProxyWatchers & InstanceType<T>
}
