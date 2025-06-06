import path from "path";
import { srcLayoutsPath } from "../foldersDatas";
import { expandToString } from "../../../src/frontend/vue-vite/template-string";


export const srcLayoutsFiles: { [key: string]:   string  } = {};


srcLayoutsFiles[path.join(srcLayoutsPath, "Default.vue")] = expandToString`
<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'



const auth = useAuthStore()

const sair = async () => {
  await auth.logout()
}

const ui = useUiStore()
const tooltipBarra = computed(() => {
  if (ui.mostrarBarraLateral) {
    return 'Esconder barra lateral'
  }
  return 'Mostrar barra lateral'
})
</script>

<template>
  <v-app>

    <v-app-bar>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="ui.mostrarBarraLateral = !ui.mostrarBarraLateral"
        v-tooltip:end="tooltipBarra"
      />

      <v-snackbar-queue
        :model-value="ui.mensagensAlerta"
        @update:model-value="ui.fecharAlerta"
        max-width="400px" timer
      >
      </v-snackbar-queue>
    </v-app-bar>

    <v-navigation-drawer
      v-model="ui.mostrarBarraLateral"
    >

<v-list-item title="Entidade1" />

<v-divider />

<v-list-item link title="Mostrar lista" :to="{ name: 'entidade1-home' }"/>
<v-list-item link title="Registrar nova" :to="{ name: 'entidade1-criar' }" />

<v-divider /><v-list-item title="Entidade2" />

<v-divider />

<v-list-item link title="Mostrar lista" :to="{ name: 'entidade2-home' }"/>
<v-list-item link title="Registrar nova" :to="{ name: 'entidade2-criar' }" />

      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="sair" color="red" block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <RouterView></RouterView>
      </v-container>
    </v-main>
  </v-app>
</template>`;

srcLayoutsFiles[path.join(srcLayoutsPath, "NewDefault.vue")] = expandToString`
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const sair = async () => {
  const auth = useAuthStore()
  await auth.logout()
}
</script>

<template>
  <div class="flex flex-row w-screen h-screen">
    <nav class="flex flex-col justify-between w-sm border-r-2 border-zinc-500 bg-blue-800">
      <NavMenu />
      <p-button class="bg-blue-950" @click="sair">SAIR</p-button>
    </nav>
    <main class="flex justify-center items-center w-full">
      <router-view />
    </main>
  </div>
</template>`;

srcLayoutsFiles[path.join(srcLayoutsPath, "NewPlain.vue")] = expandToString`
<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <router-view />
  </div>
</template>`;

srcLayoutsFiles[path.join(srcLayoutsPath, "Plain.vue")] = expandToString`
<script setup lang="ts">
import { ref, provide, readonly } from 'vue'
import { chaveModal } from '@/types/ui'

const modal = ref(false)
const texto = ref('')
// usando readonly porque 'modal' nao deve ser mutado por outros
// componentes e nao e necessaria nenhuma transformacao em seu
// valor
const estaAberto = readonly(modal)
const abrirModal = (novoTexto?: string) => {
  texto.value = novoTexto || ''
  modal.value = true
}
const fecharModal = () => {
  modal.value = false
  texto.value = ''
}

// provide
provide(chaveModal, {
  estaAberto,
  abrirModal,
  fecharModal
})
</script>


<template>
  <v-app>
    <v-main>
      <v-container class="d-flex justify-center">
        <RouterView />
      </v-container>
    </v-main>

    <v-dialog
      v-model="modal"
      max-width="250px"
    >
      <v-card>
        <v-card-title class="d-flex ga-3">
          <v-icon color="orange">mdi-alert</v-icon>
          <span>Aviso!</span>

        </v-card-title>

        <v-card-text>{{ texto }}</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="fecharModal"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>`;