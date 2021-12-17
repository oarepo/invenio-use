import {AppConfig, CollectionsConfig} from "./types";

export const APP_CONFIG: AppConfig = {
    ENABLE_LOCAL_ACCOUNT_LOGIN: false,
    ENABLE_OAUTH_LOGIN: true,
    SEARCH_READY_DELAY: 2000,
    LOGO_SRC: '/images/logo-oarepo.svg',
    MAX_RESULTS_WINDOW: 10000,
    VOCAB_MAX_RESULTS_WINDOW: 500,
    EXPORT_MAX_RESULTS: 4000,
    OAUTH_PROVIDERS: {
        github: {
            enabled: true,
            label: 'Sign in with GitHub',
            name: 'gihub',
            url: '/api/oauth/login/github',
            icon: 'github',
            semanticUiColor: 'black',
            className: '',
        },
    },
    REST_ENDPOINTS_BASE_URL: '/',
    SUCCESS_AUTO_DISMISS_SECONDS: 10,
    DEFAULT_LANGUAGE: 'cs',
    DEFAULT_RESULTS_SIZE: 15,
    i18n: {},
    REST_MIME_TYPE_QUERY_ARG_NAME: 'format',
    STATIC_PAGES: [
        {name: 'about', route: '/about', apiURL: '1'},
        {name: 'contact', route: '/contact', apiURL: '2'},
        {name: 'search-guide', route: '/guide/search', apiURL: '3'},
    ],
    EMAILS_PRESET: {
        subjectPrefix: 'OARepo:',
        footer: '\n\n\nKind regards,\nOARepo team',
    },
    ENVIRONMENTS: [
        {
            name: 'development',
            display: {
                text: 'Development environment',
                color: 'blue',
                icon: 'code',
            },
        },
        {
            name: 'sandbox',
            display: {
                text: 'Sandbox environment',
                color: 'teal',
                icon: 'camera',
            },
        },
        {
            name: 'production',
            display: {
                roles: ['admin'],
                text: 'Production environment',
                color: 'red',
                icon: 'warning',
            },
        },
    ],
    SEARCH_BAR_PROPS: {
        autofocus: true,
        actionProps: {icon: 'search', content: null},
        uiProps: {className: 'oarepo-searchbar'},
    },
    HOME_SEARCH_BAR_PLACEHOLDER: 'Search in record titles.',
};

export const RECORDS_CONFIG: CollectionsConfig = {}
