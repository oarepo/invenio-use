import {ProxyWatchers, VuexModule} from 'vuex-class-component/dist/interfaces'
import {AppConfig, CollectionConfig} from '../config/types'

export interface InvenioConfig {
    app: AppConfig,
    models: CollectionConfig
}

export interface StoreProxy<T extends typeof VuexModule> {
    core: ProxyWatchers & InstanceType<T>
}
