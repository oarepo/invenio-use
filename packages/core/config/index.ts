import _merge from 'lodash-es/merge'
import {APP_CONFIG, RECORDS_CONFIG} from './default'
import {AppConfig, IAppConfig, RecordsSearchConfig, RecordsSearchResultConfig} from './types'

class InvenioAppConfig implements IAppConfig {
    [k: string]: any

    private readonly app: AppConfig

    constructor() {
        this.app = APP_CONFIG;
        Object.assign(this, {...RECORDS_CONFIG});
    }

    get APP(): AppConfig {
        return this.app
    }

    merge = (newConfig: any): void => {
        Object.assign(this, _merge(this, newConfig));
        Object.freeze(this);
    }
}

export const invenioConfig = new InvenioAppConfig()

export const getSearchConfig = (modelName: string, extraOptions: RecordsSearchResultConfig = {}): RecordsSearchResultConfig => {
    const config: RecordsSearchConfig = invenioConfig[modelName].search;
    const result: RecordsSearchResultConfig = {
        FILTERS: config.filters,
        RESULTS_PER_PAGE: [
            {
                text: '15',
                value: 15,
            },
            {
                text: '30',
                value: 30,
            },
            {
                text: '60',
                value: 60,
            },
        ],
        SORT_BY: config.sort,
        DEFAULT_PAGE: config.defaultPage,
        DEFAULT_SIZE: config.defaultSize,
        DEFAULT_LAYOUT: config.defaultLayout,
    }
    return _merge(result, extraOptions)
}
//
// const findBySortTypeOrReturnFirst = (searchConfig: RecordsSearchResultConfig, sortType: string) => {
//     const sortOption = searchConfig.SORT_BY?.find(
//         (elem) => elem.sortBy === sortType
//     );
//     return !_isEmpty(sortOption) ? sortOption : _first(searchConfig.SORT_BY)
// };

// export const setInitialQueryState = (modelName: string) => {
//     const searchConfig = getSearchConfig(modelName);
//     let initialState = {} as any
//     if (searchConfig.DEFAULT_PAGE) {
//         initialState['page'] = searchConfig.DEFAULT_PAGE;
//     }
//     if (searchConfig.DEFAULT_LAYOUT) {
//         initialState['layout'] = searchConfig.DEFAULT_LAYOUT;
//     }
//     if (searchConfig.DEFAULT_SIZE) {
//         initialState['size'] = searchConfig.DEFAULT_SIZE;
//     }
//     if (searchConfig.SORT_BY) {
//         const defaultSort = findBySortTypeOrReturnFirst(searchConfig, 'bestmatch');
//         initialState['sortBy'] = defaultSort.sortBy;
//         initialState['sortOrder'] = defaultSort.sortOrder;
//     }
//     return initialState;
// }
//
// export const setReactSearchKitDefaultSortingOnEmptyQueryString = (
//     modelName
// ) => {
//     const searchConfig = getSearchConfig(modelName);
//     let sortObject = {};
//     if (searchConfig.SORT_BY) {
//         const defaultSort = findBySortTypeOrReturnFirst(searchConfig, 'created');
//         sortObject['sortBy'] = defaultSort.sortBy;
//         sortObject['sortOrder'] = defaultSort.sortOrder;
//     }
//     return sortObject;
// };
//
// class ILSUrlParamValidator {
//     baseParamValidator = new UrlParamValidator();
//
//     constructor(searchConfig) {
//         this.searchConfig = searchConfig;
//     }
//
//     isValid = (urlHandler, key, value) => {
//         if (!this.baseParamValidator.isValid(urlHandler, key, value)) {
//             return false;
//         } else {
//             switch (key) {
//                 case 'sortBy':
//                     return this.searchConfig.SORT_BY.some((opt) => value === opt.sortBy);
//                 case 'size':
//                     return this.searchConfig.RESULTS_PER_PAGE.some(
//                         (opt) => value === opt.value
//                     );
//                 default:
//                     return true;
//             }
//         }
//     };
// }
//
// export const setReactSearchKitUrlHandler = (
//     modelName,
//     withUrlHandling = true
// ) => {
//     return withUrlHandling
//         ? {
//             enabled: true,
//             overrideConfig: {
//                 urlParamValidator: new ILSUrlParamValidator(
//                     getSearchConfig(modelName)
//                 ),
//             },
//         }
//         : {
//             enabled: false,
//         };
// };
//
// export function getDisplayVal(configField, value) {
//     return _get(invenioConfig, configField).find((entry) => entry.value === value)
//         .text;
// }
//
// export const getStaticPagesRoutes = () => {
//     return _map(invenioConfig.APP.STATIC_PAGES, 'route');
// };
//
// export const getStaticPageByRoute = (path) => {
//     return _find(invenioConfig.APP.STATIC_PAGES, ['route', path]);
// };
//
// export const getStaticPageByName = (name) => {
//     return _find(invenioConfig.APP.STATIC_PAGES, ['name', name]);
// };
