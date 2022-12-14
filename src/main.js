import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import './assets/main.css'

// Add PrimeVue
import PrimeVue from "primevue/config";

// Add Toast Service
import ToastService from "primevue/toastservice";

// Add PrimeVue Styles
import 'primeflex/primeflex.css';

// Material Design Theme
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// Add PrimeVue Components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Row from "primevue/row";
import Sidebar from "primevue/sidebar";
import Menu from "primevue/menu";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";
import Card from "primevue/card";
import Tag from "primevue/tag";
import Password from 'primevue/password';
import Message from 'primevue/message';
import InlineMessage from "primevue/inlinemessage";

// ROUTES
import router from "./router";

createApp(App)
    .use(router)
    .use(createPinia())
    .use(PrimeVue, { ripple: true })
    .use(ToastService)
    .component('pv-data-table', DataTable)
    .component('pv-column', Column)
    .component('pv-toolbar', Toolbar)
    .component('pv-input-text', InputText)
    .component('pv-textarea', Textarea)
    .component('pv-button', Button)
    .component('pv-row', Row)
    .component('pv-sidebar', Sidebar)
    .component('pv-inline-message', InlineMessage)
    .component('pv-message', Message)
    .component('pv-password', Password)
    .component('pv-menu', Menu)
    .component('pv-dialog', Dialog)
    .component('pv-toast', Toast)
    .component('pv-dropdown', Dropdown)
    .component('pv-tag', Tag)
    .component('pv-card', Card)


    .mount('#app')
