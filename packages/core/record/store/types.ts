export type RecordState = {
    // Record data loading is in progress
    isLoading: boolean,
    // Record has an error
    hasError: boolean,
    // PID value of a record
    pid: string,
    // Record metadata
    metadata: {},
    // Files associated with a record
    files: {},
    // Error data
    error: {},
}
