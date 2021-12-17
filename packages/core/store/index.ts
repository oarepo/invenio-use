import {createModule, createSubModule} from 'vuex-class-component'
import {RecordStore} from '../record'

export class CoreStore extends createModule({
    namespaced: 'core',
    strict: false,
    // target: "nuxt",
}) {
    record = createSubModule(RecordStore)
}
