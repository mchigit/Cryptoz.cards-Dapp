import Vue from 'vue'
import Router from 'vue-router'
import BodyContent from '@/components/BodyContent.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BodyContent',
      component: BodyContent
    }
  ]
})
