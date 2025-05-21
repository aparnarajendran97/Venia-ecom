

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import store from './store'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const app = createApp(App)

registerPlugins(app)
app.use(store)

app.mount('#app')
