export interface IAppConfig {
    [key: string]: any
}

export type OAuthProviderConfig = {
    enabled: boolean,
    label: string,
    name: string,
    url: string,
    icon: string,
    semanticUiColor: string,
    className: string,
}

export type StaticRouteConfig = {
    name: string, route: string, apiURL: string
}

export type EmailsPresetConfig = {
    subjectPrefix: string,
    footer: string,
}

export type SearchBarConfig = {
    autofocus: boolean,
    actionProps: {},
    uiProps: {}
}

export type I18nConfig = {}

export type EnvironmentConfig = {
    name: string,
    display: {
        roles?: string[]
        text: string,
        color: string,
        icon: string,
    }
}

export type RecordFilterLabel = {
    value: string | number,
    text?: string,
    label?: string,
    order?: number,
}

export type RecordFilterOption = {
    title: string
    field: string
    aggName: string,
    labels?: RecordFilterLabel[],
}

export type RecordSortOption = {
    order: number,
    sortBy: string,
    sortOrder: string,
    text?: string,
}

export enum RecordCollectionLayout {
    List,
    Grid
}

export type AppConfig = {
    ENABLE_LOCAL_ACCOUNT_LOGIN: boolean,
    ENABLE_OAUTH_LOGIN: boolean,
    SEARCH_READY_DELAY: number,
    LOGO_SRC: string,
    MAX_RESULTS_WINDOW: number,
    VOCAB_MAX_RESULTS_WINDOW: number,
    EXPORT_MAX_RESULTS: number,
    OAUTH_PROVIDERS: { [key: string]: OAuthProviderConfig },
    REST_ENDPOINTS_BASE_URL: string,
    SUCCESS_AUTO_DISMISS_SECONDS: number,
    DEFAULT_LANGUAGE: string,
    DEFAULT_RESULTS_SIZE: number,
    i18n: I18nConfig,
    REST_MIME_TYPE_QUERY_ARG_NAME: string,
    STATIC_PAGES: StaticRouteConfig[],
    EMAILS_PRESET: EmailsPresetConfig
    ENVIRONMENTS: EnvironmentConfig[],
    SEARCH_BAR_PROPS: SearchBarConfig,
    HOME_SEARCH_BAR_PLACEHOLDER: string,
}

export type RecordsSearchConfig = {
    filters: RecordFilterOption[],
    sort: RecordSortOption[],
    defaultPage: number,
    defaultSize: number,
    defaultLayout: RecordCollectionLayout,
}

export type RecordsSearchResultConfig = {
    FILTERS?: RecordFilterOption[],
    RESULTS_PER_PAGE?: {
        text: string,
        value: number,
    }[],
    SORT_BY?: RecordSortOption[],
    DEFAULT_PAGE?: number,
    DEFAULT_SIZE?: number,
    DEFAULT_LAYOUT?: RecordCollectionLayout,
}

export type CollectionConfig = {
    search: RecordsSearchConfig
    result: RecordsSearchResultConfig
    [key: string]: any
}

export type CollectionsConfig = {
    [key: string]: CollectionConfig
}
