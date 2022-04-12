

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
Vue.use(VueApollo)

const apolloClient = new ApolloClient({
  // 你需要在这里使用绝对路径
  uri: 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2'
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})



Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
