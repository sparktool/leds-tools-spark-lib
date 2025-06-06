import path from "path";
import { srcPath } from "../foldersDatas";
import { expandToString } from "../../../src/frontend/vue-vite/template-string";


export const srcRootFiles: { [key: string]:   string  } = {};


srcRootFiles[path.join(srcPath, "App.vue")] = expandToString`
<template>
  <RouterView />
</template>`,


srcRootFiles[path.join(srcPath, "main.ts")] = expandToString`
/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')`;