import { createApp } from 'vue'
import App from './App.vue'

import '@refinitiv-ui/elements/loader';
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/password-field';

import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/loader/themes/halo/dark';
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
import '@refinitiv-ui/elements/text-field/themes/halo/dark';
import '@refinitiv-ui/elements/password-field/themes/halo/dark';

createApp(App).mount('#app')
