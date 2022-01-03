import {App, computed} from 'vue'
import {InvenioAppInstance} from "~/core/plugin/types";

/**
 * Composable for accessing Invenio proxy
 *
 * @param app Vue app instance
 * @return composable useInvenioRoutes
 */
export default function useInvenio(app: App) {

    const invenio = computed(() => {
        return app.config.globalProperties.$invenio as InvenioAppInstance
    })

    const routes = computed(() => {
        return invenio.value.routes
    })

    const config = computed(() => {
        return invenio.value.config
    })

    return {invenio, config, routes}
}
