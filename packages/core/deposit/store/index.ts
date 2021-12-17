import {action, createModule} from 'vuex-class-component'
import {cloneDeep, get} from 'lodash-es'
import {FileUploadState, RecordFileEntry, RecordFiles, RecordFileState} from "./types";

export class DepositStore extends createModule({
    namespaced: 'deposit',
    strict: false,
    // target: "nuxt",
}) {
    files = {}
    record_ui = {}

    // @ts-ignore
    // TODO: composable?
    @action async preloadFiles(files: RecordFiles<RecordFileEntry>) {
        const _files = cloneDeep(files);
        return {
            defaultFilePreview: files.default_preview || null,
            links: files.links || {},
            entries: get(_files, 'entries', [])
                .map((file: RecordFileEntry) => {
                    let hasSize = file.size >= 0;
                    const fileState: RecordFileState = {
                        name: file.key,
                        size: file.size || 0,
                        checksum: file.checksum || '',
                        links: file.links || {},
                    };
                    return hasSize
                        ? {
                            status: FileUploadState.Finished,
                            progress: 100,
                            ...fileState,
                        }
                        : {status: FileUploadState.Pending, ...fileState};
                })
                .reduce((acc: { [key: string]: RecordFileState }, current: RecordFileState) => {
                    acc[current.name] = {...current};
                    return acc
                }, {})
        }
    }
}
