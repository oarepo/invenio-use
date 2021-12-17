export type Links = {
    self?: string,
    [key: symbol]: string & null
}

export const enum FileUploadState {
    Initial, // no file or the initial file selected
    Uploading, // file upload is in progress
    Error, // upload failed
    Aborted, // upload was aborted by user
    Finished, // upload finished (uploaded file is the field's current file)
    Pending, // files retrieved from the backend are in pending state
}

export type RecordFileEntry = {
    // Object containing file related links
    links: Links,
    // File name
    key: string,
    // File size
    size: number,
    // Computed digest of a file
    checksum: string
}

export type RecordFileState = {
    name: string,
    size: number,
    checksum: string,
    links: Links & {},
    status?: FileUploadState,
    progress?: number,
}

export interface RecordFiles<RecordFileEntry> {
    // File that should be previewed by default
    default_preview: string & null,
    // Object containing links for management of record's files
    links: Links
}

