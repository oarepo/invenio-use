import {createStore} from "vuex";
import { createApp } from 'vue'
import App from './App.vue'
import InvenioCore from '../packages/core/plugin'

// Create empty store
const store = createStore({})


createApp(App)
    .use(store)
    .use(InvenioCore, {app: {HOME_SEARCH_BAR_PLACEHOLDER: 'Search in demo App records.'}})
    .mount('#app')
