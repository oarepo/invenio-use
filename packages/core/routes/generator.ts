import {App} from "vue";
import {_RouteRecordBase, RouteRecordRaw} from 'vue-router'
import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    ERROR,
    HOME,
    RECORD_CREATE,
    RECORD_DETAIL_EDIT,
    RECORD_DETAIL_VIEW,
    RECORD_SEARCH,
    USER_PROFILE
} from './constants'
import {CollectionConfig} from "~/core/config/types";

/**
 * Class for generating common routes of an Invenio app.
 */
export class InvenioRoutesGenerator {
    public readonly HOME = HOME
    public readonly USER_PROFILE = USER_PROFILE
    public readonly AUTH_LOGIN = AUTH_LOGIN
    public readonly AUTH_LOGOUT = AUTH_LOGOUT
    public readonly ERROR = ERROR
    public readonly RECORD_DETAIL_VIEW = RECORD_DETAIL_VIEW
    public readonly RECORD_DETAIL_EDIT = RECORD_DETAIL_EDIT
    public readonly RECORD_SEARCH = RECORD_SEARCH
    public readonly RECORD_CREATE = RECORD_CREATE
    private readonly routeBase: string

    // private app: App

    /**
     * Invenio Routes generator constructor
     * @param app Vue App instance
     * @param routeBase base path of invenio routes
     */
    constructor(app: App, routeBase?: string) {
        // this.app = app
        this.routeBase = routeBase || '/'
    }

    // private get _recordsConfig() {
    //     return this.app.config.globalProperties.$invenio.config.RECORDS_CONFIG
    // }

    /**
     * Get Invenio routes generated from Invenio app config
     */
    get routes() {
        return [
            this.home(),
            this.userProfile(),
            this.login(),
            this.logout(),
            this.collection(),
            this.errorPage()

        ]
    }

    /**
     * Home page route
     */
    home(): _RouteRecordBase {
        return {
            path: this.routeBase,
            name: this.HOME
        }
    }

    /**
     * User Profile page route
     */
    userProfile(): _RouteRecordBase {
        return {
            path: `${this.routeBase}profile`,
            name: this.USER_PROFILE
        }
    }

    /**
     * Authentication login route
     */
    login(): _RouteRecordBase {
        return {
            path: `${this.routeBase}login`,
            name: this.AUTH_LOGIN
        }
    }

    /**
     * Authentication logout route
     */
    logout(): _RouteRecordBase {
        return {
            path: `${this.routeBase}logout`,
            name: this.AUTH_LOGOUT
        }
    }

    /**
     * Error page route
     */
    errorPage(): _RouteRecordBase {
        return {
            path: `${this.routeBase}error/:errorCode/:errorId`,
            name: this.ERROR,
        }
    }

    /**
     * Generates routes related to a collection of Invenio records
     */
    collection(): _RouteRecordBase {
        return {
            path: `${this.routeBase}${this._collectionPath()}`,
            children: [
                this.recordSearch(),
                this.recordCreate(),
                this.recordDetail()
            ] as RouteRecordRaw[]
        }
    }

    /**
     * Generates routes related to Invenio record's detail views.
     *
     * @param detailPath path to the record's detail routes
     * @return record detail routes
     */
    recordDetail(detailPath?: string): _RouteRecordBase {
        const recordDetailBase = detailPath ? `${this.routeBase}${detailPath}` : ':recordPid'
        return {
            path: recordDetailBase,
            children: [{
                path: '',
                name: this.RECORD_DETAIL_VIEW,
                // loadingComponent: () => import(/* webpackChunkName: 'record-detail' */ ),
                // component: () => import(/* webpackChunkName: 'record-detail' */)
            }, {
                path: 'edit',
                name: this.RECORD_DETAIL_EDIT
                // loadingComponent: () => import(/* webpackChunkName: 'record-detail' */ ),
                // component: () => import(/* webpackChunkName: 'record-detail' */)
            }] as RouteRecordRaw[]
        }
    }

    /**
     * Generates routes related to searching in a collection of records.
     *
     * @param searchPath search endpoint path
     */
    recordSearch(searchPath?: string): _RouteRecordBase {
        return {
            path: searchPath ? `${this.routeBase}${searchPath}` : '',
            name: this.RECORD_SEARCH
            // loadingComponent: () => import(/* webpackChunkName: 'record-detail' */ ),
            // component: () => import(/* webpackChunkName: 'record-detail' */)
        }
    }

    /**
     * Record submission route for creating new records in a collection
     *
     * @param createPath path to the record creation route
     */
    recordCreate(createPath?: string): _RouteRecordBase {
        return {
            path: createPath ? `${this.routeBase}${createPath}` : 'create',
            name: this.RECORD_CREATE,
            // loadingComponent: () => import(/* webpackChunkName: 'record-detail' */ ),
            // component: () => import(/* webpackChunkName: 'record-detail' */)
        }
    }

    private _collectionPath(config?: CollectionConfig) {
        return ':model'
    }
}

export default InvenioRoutesGenerator
