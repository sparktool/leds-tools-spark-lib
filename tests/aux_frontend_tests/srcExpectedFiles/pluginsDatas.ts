import path from "path";
import { srcPluginsPath } from "../foldersDatas";
import { expandToString } from "../../../src/util/template-string";


export const srcPluginsFiles: { [key: string]: string } = {};


srcPluginsFiles[path.join(srcPluginsPath, "index.ts")] = expandToString`
/**
 * plugins/index.ts
 *
 * Automatically included in './src/main.ts'
 */

// Plugins
// import vuetify from './vuetify'
import router from './router'
import pinia from './pinia'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  // app.use(vuetify)
  app.use(router)
  app.use(pinia)
}`;

srcPluginsFiles[path.join(srcPluginsPath, "pinia.ts")] = expandToString`
import { createPinia } from 'pinia'



const pinia = createPinia()

export default pinia`;

srcPluginsFiles[path.join(srcPluginsPath, "README.md")] = expandToString`
# Plugins

Plugins are a way to extend the functionality of your Vue application. Use this folder for registering plugins that you want to use globally.`;

srcPluginsFiles[path.join(srcPluginsPath, "router.ts")] = expandToString`
import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { routes as rootRoutes } from '@/routes'
import { routes as moduleRoutes } from '@/modules'
import PlainLayout from '@/layouts/NewPlain.vue'
import DefaultLayout from '@/layouts/NewDefault.vue'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PlainLayout,
    children: rootRoutes,
  },
  {
    path: '/',
    component: DefaultLayout,
    children: moduleRoutes,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta?.requiresAuth) {
    if (auth.estaLogado()) {
      return true
    } else {
      return { name: 'login' }
    }
  } else {
    return true
  }
})
export default router`;

srcPluginsFiles[path.join(srcPluginsPath, "vuetify.ts")] = expandToString`
/**
 * plugins/vuetify.ts
 *
 * Framework documentation: 'https://vuetifyjs.com'
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
})`;