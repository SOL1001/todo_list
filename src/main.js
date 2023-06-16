import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './style.css'
import App from './App.vue'
import apolloClient from './appollo/appollo.js'
import router from './router/index.js'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
});

app.use(router)

app.mount('#app')
// app.use(router).mount('#app')
