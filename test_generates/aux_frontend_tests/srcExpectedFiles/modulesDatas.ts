
import path from "path";
import { entidade1Path, entidade1viewsPath, entidade2Path, entidade2viewsPath, srcModulesPath } from "../foldersDatas";
import { expandToString } from "../../../src/frontend/vue-vite/template-string";


export const srcModulesFiles: { [key: string]:   string  } = {};



srcModulesFiles[path.join(srcModulesPath, "index.ts")] = expandToString`
import { type RouteRecordRaw } from 'vue-router'

import { routes as entidade1Route } from './Entidade1'
import { routes as entidade2Route } from './Entidade2'


export const routes: RouteRecordRaw[] = [
  ...entidade1Route,
  ...entidade2Route,

]`;

srcModulesFiles[path.join(entidade1Path, "index.ts")] = expandToString`
import { type RouteRecordRaw } from 'vue-router'
import { routes as _routes } from './routes'

export const routes: RouteRecordRaw[] = [
  {
    path: '/Entidade1',
    children: _routes,
    meta: {
      requiresAuth: true
    }
  }
]`;

srcModulesFiles[path.join(entidade2Path, "index.ts")] = expandToString`
import { type RouteRecordRaw } from 'vue-router'
import { routes as _routes } from './routes'

export const routes: RouteRecordRaw[] = [
  {
    path: '/Entidade2',
    children: _routes,
    meta: {
      requiresAuth: true
    }
  }
]`;

srcModulesFiles[path.join(entidade1viewsPath, "Criar.vue")] = expandToString`
<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import {
  criarEntidade1,
  obterEntidade1,
  atualizarEntidade1
} from '../controllers/entidade1'
import { useUiStore } from '@/stores/ui'
import type { ValidationResultFunction } from '@/utils/regras'

const route = useRoute()

const modo = computed<'criar' | 'editar'>(() => {
  if (route.params.id) {
    return 'editar'
  }
  return 'criar'
})

const ui = useUiStore()

const id = ref('')
const nome = ref('')
const numero = ref('')


const primeiraMaiuscula: ValidationResultFunction = (novoNome: string) => {
  if (/^[A-Z].*$/.test(novoNome)) {
    return true
  }
  return 'O nome deve começar com uma letra maiúscula'
}

const regrasNome = [primeiraMaiuscula]

const nomeValido = ref(false)

const updateNomeValido = (novoValor: boolean) => {
  nomeValido.value = novoValor
}

const descricao = ref('')

const criar = async () => {
  if (!nomeValido.value) {
    ui.exibirAlerta({
      text: 'Por favor, corrija os campos incorretos.',
      color: 'error'
    })
    return false
  }
  const sucesso = await criarEntidade1({
    nome: nome.value,
    numero: numero.value

  })
  if (sucesso) {
    nome.value = ''
    numero.value = ''

  }
  return true
}

const atualizar = async () => {
  if (!nomeValido.value) {
    ui.exibirAlerta({
      text: 'Por favor, corrija os campos incorretos.',
      color: 'error'
    })
    return false
  }

  const sucesso = await atualizarEntidade1({
    Id: id.value,
    nome: nome.value,
    numero: numero.value

  })
  return true
}

const dispatchBotao = async () => {
  if (modo.value === 'criar') {
    return await criar()
  }
  return await atualizar()
}

onBeforeMount(async () => {
  if (modo.value === 'editar') {
    const routeId: string = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    const cls = await obterEntidade1(routeId)
    id.value = cls.Id
    nome.value = cls.nome
    numero.value = cls.numero

  }
})
</script>

<template>
  <card class="w-md">
<text-input
  class="w-full"
  placeholder="Nome"
  v-model="nome"
  :rules="regrasNome"
  @validationUpdate="updateNomeValido"
/>
<text-input
  class="w-full"
  placeholder="Numero"
  v-model="numero"
/>

    <div class="flex justify-end">
      <p-button
        @click="dispatchBotao"
      >
        {{ modo === 'criar' ? 'Registrar' : 'Atualizar' }}
      </p-button>
    </div>
  </card>
</template>`;

srcModulesFiles[path.join(entidade1viewsPath, "Listar.vue")] = expandToString`
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import {
  listarEntidade1,
  excluirEntidade1s,
} from '../controllers/entidade1'
import type { Entidade1 } from '../types/entidade1'



const ui = useUiStore()
const headers = [
    { value: 'nome', title: 'nome' },
    { value: 'numero', title: 'numero' }

]
const items = ref<Entidade1[]>([])

const carregarEntidade1s = async () => {
  const entidade1 = await listarEntidade1()
  items.value = entidade1
}

const router = useRouter()
const editarEntidade1 = (cls: Entidade1) => {
  router.push({ name: 'entidade1-criar', params: { id: cls.Id }})
}

const excluirentidade1 = async (cls: Entidade1[]) => {
  const ids = cls.map((a) => a.Id)
  await excluirEntidade1s(ids)
  await carregarEntidade1s()
}

onBeforeMount(carregarEntidade1s)
</script>

<template>
  <data-table
    :headers="headers"
    :items="items"
    @editar="editarEntidade1"
    @excluir="excluirentidade1"
  />
</template>`;

srcModulesFiles[path.join(entidade2viewsPath, "Criar.vue")] = expandToString`
<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import {
  criarEntidade2,
  obterEntidade2,
  atualizarEntidade2
} from '../controllers/entidade2'
import { useUiStore } from '@/stores/ui'
import type { ValidationResultFunction } from '@/utils/regras'

const route = useRoute()

const modo = computed<'criar' | 'editar'>(() => {
  if (route.params.id) {
    return 'editar'
  }
  return 'criar'
})

const ui = useUiStore()

const id = ref('')
const nome = ref('')
const verificacao = ref('')


const primeiraMaiuscula: ValidationResultFunction = (novoNome: string) => {
  if (/^[A-Z].*$/.test(novoNome)) {
    return true
  }
  return 'O nome deve começar com uma letra maiúscula'
}

const regrasNome = [primeiraMaiuscula]

const nomeValido = ref(false)

const updateNomeValido = (novoValor: boolean) => {
  nomeValido.value = novoValor
}

const descricao = ref('')

const criar = async () => {
  if (!nomeValido.value) {
    ui.exibirAlerta({
      text: 'Por favor, corrija os campos incorretos.',
      color: 'error'
    })
    return false
  }
  const sucesso = await criarEntidade2({
    nome: nome.value,
    verificacao: verificacao.value

  })
  if (sucesso) {
    nome.value = ''
    verificacao.value = ''

  }
  return true
}

const atualizar = async () => {
  if (!nomeValido.value) {
    ui.exibirAlerta({
      text: 'Por favor, corrija os campos incorretos.',
      color: 'error'
    })
    return false
  }

  const sucesso = await atualizarEntidade2({
    Id: id.value,
    nome: nome.value,
    verificacao: verificacao.value

  })
  return true
}

const dispatchBotao = async () => {
  if (modo.value === 'criar') {
    return await criar()
  }
  return await atualizar()
}

onBeforeMount(async () => {
  if (modo.value === 'editar') {
    const routeId: string = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    const cls = await obterEntidade2(routeId)
    id.value = cls.Id
    nome.value = cls.nome
    verificacao.value = cls.verificacao

  }
})
</script>

<template>
  <card class="w-md">
<text-input
  class="w-full"
  placeholder="Nome"
  v-model="nome"
  :rules="regrasNome"
  @validationUpdate="updateNomeValido"
/>
<text-input
  class="w-full"
  placeholder="Verificacao"
  v-model="verificacao"
/>

    <div class="flex justify-end">
      <p-button
        @click="dispatchBotao"
      >
        {{ modo === 'criar' ? 'Registrar' : 'Atualizar' }}
      </p-button>
    </div>
  </card>
</template>`;

srcModulesFiles[path.join(entidade2viewsPath, "Listar.vue")] = expandToString`
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import {
  listarEntidade2,
  excluirEntidade2s,
} from '../controllers/entidade2'
import type { Entidade2 } from '../types/entidade2'



const ui = useUiStore()
const headers = [
    { value: 'nome', title: 'nome' },
    { value: 'verificacao', title: 'verificacao' }

]
const items = ref<Entidade2[]>([])

const carregarEntidade2s = async () => {
  const entidade2 = await listarEntidade2()
  items.value = entidade2
}

const router = useRouter()
const editarEntidade2 = (cls: Entidade2) => {
  router.push({ name: 'entidade2-criar', params: { id: cls.Id }})
}

const excluirentidade2 = async (cls: Entidade2[]) => {
  const ids = cls.map((a) => a.Id)
  await excluirEntidade2s(ids)
  await carregarEntidade2s()
}

onBeforeMount(carregarEntidade2s)
</script>

<template>
  <data-table
    :headers="headers"
    :items="items"
    @editar="editarEntidade2"
    @excluir="excluirentidade2"
  />
</template>`;
