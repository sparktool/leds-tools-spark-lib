import path from "path";
import { srcPath } from "../foldersDatas";


export const srcRootFiles: { [key: string]:   string  } = {};


srcRootFiles[path.join(srcPath, "App.vue")] = `<template>
  <RouterView />
</template>`,


srcRootFiles[path.join(srcPath, "main.ts")] = `/**
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