import {createModule} from 'vuex-class-component'
import {cloneDeep} from 'lodash-es'
import {RecordState} from './types'

export const initialState: RecordState = {
    isLoading: true,
    hasError: false,
    pid: '',
    metadata: {},
    files: {},
    error: {},
}

export class RecordStore extends createModule({
    namespaced: 'record',
    strict: false,
    // target: "nuxt",
}) {
    isLoading = initialState.isLoading
    pid = initialState.pid
    hasError = initialState.hasError
    metadata = cloneDeep(initialState.metadata)
    error = cloneDeep(initialState.error)

    get IS_LOADING() {
        return this.isLoading
    }
}
