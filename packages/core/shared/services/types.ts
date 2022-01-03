
export interface AxiosErrorResponse {
    status: number,
    data?: {
        error_id?: number | string
    }
}
