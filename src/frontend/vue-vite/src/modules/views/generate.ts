import fs from "fs"
import { expandToString } from "../../../template-string.js";
import path from "path"
import { generateAttributesAsParameters } from "./generateAttributes.js"
import { generateAttributesValue } from "./generateAttributes.js"
import { generateValuesEqualsAttributes } from "./generateAttributes.js"
import { generateAttributesAsHeader } from "./generateAttributes.js"
import ProjectAbstraction from "seon-lib-implementation/dist/abstractions/ProjectAbstraction.js";
import ClassAbstraction from "seon-lib-implementation/dist/abstractions/oo/ClassAbstraction.js";

export function generate(project_abstraction: ProjectAbstraction, cls: ClassAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, "Criar.vue"), generateCriar(project_abstraction, cls))
    fs.writeFileSync(path.join(target_folder, "Listar.vue"), generateListar(project_abstraction, cls))
}

function generateCriar(project_abstraction: ProjectAbstraction, cls: ClassAbstraction) : string {
    return expandToString`
<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import {
  criar${cls.getName()},
  obter${cls.getName()},
  atualizar${cls.getName()}
} from '../controllers/${cls.getName().toLowerCase()}'
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
${generateRefs(cls)}

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
  const sucesso = await criar${cls.getName()}({
    ${generateAttributesAsParameters(cls)}
  })
  if (sucesso) {
    ${generateAttributesValue(cls)}
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

  const sucesso = await atualizar${cls.getName()}({
    Id: id.value,
    ${generateAttributesAsParameters(cls)}
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
    const cls = await obter${cls.getName()}(routeId)
    id.value = cls.Id
    ${generateValuesEqualsAttributes(cls)}
  }
})
</script>

<template>
  <card class="w-md">
    ${generateTextInputs(cls)}

    <div class="flex justify-end">
      <p-button
        @click="dispatchBotao"
      >
        {{ modo === 'criar' ? 'Registrar' : 'Atualizar' }}
      </p-button>
    </div>
  </card>
</template>
`
}

function generateListar(project_abstraction: ProjectAbstraction, cls: ClassAbstraction) : string {
    return expandToString`
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import {
  listar${cls.getName()},
  excluir${cls.getName()}s,
} from '../controllers/${cls.getName().toLowerCase()}'
import type { ${cls.getName()} } from '../types/${cls.getName().toLowerCase()}'



const ui = useUiStore()
const headers = [
   ${generateAttributesAsHeader(cls)}
]
const items = ref<${cls.getName()}[]>([])

const carregar${cls.getName()}s = async () => {
  const ${cls.getName().toLowerCase()} = await listar${cls.getName()}()
  items.value = ${cls.getName().toLowerCase()}
}

const router = useRouter()
const editar${cls.getName()} = (cls: ${cls.getName()}) => {
  router.push({ name: '${cls.getName().toLowerCase()}-criar', params: { id: cls.Id }})
}

const excluir${cls.getName().toLowerCase()} = async (cls: ${cls.getName()}[]) => {
  const ids = cls.map((a) => a.Id)
  await excluir${cls.getName()}s(ids)
  await carregar${cls.getName()}s()
}

onBeforeMount(carregar${cls.getName()}s)
</script>

<template>
  <data-table
    :headers="headers"
    :items="items"
    @editar="editar${cls.getName()}"
    @excluir="excluir${cls.getName().toLowerCase()}"
  />
</template>
`
}


// Gera as reactive variables para cada atributo da classe
function generateRefs(cls: ClassAbstraction) : string {
    var str = ""
    for (const attr of cls.getAttributes()) {
        str = str.concat(`const ${attr.getName()} = ref('')\n`)
    }
    return str
}

// Gera text inputs para cada atributo da classe
function generateTextInputs(cls: ClassAbstraction) : string {
    var str = ""
    for (const attr of cls.getAttributes()) {
      if (attr.getName().toLowerCase() === "nome") {
        str = str.concat(expandToString`
          <text-input
      class="w-full"
      placeholder="Nome"
      v-model="nome"
      :rules="regrasNome"
      @validationUpdate="updateNomeValido"
      />\n`)
      }
      else{
        str = str.concat(expandToString`
          <text-input
      class="w-full"
      placeholder="${capitalizeFirstLetter(attr.getName())}"
      v-model="${attr.getName()}"
      />\n`)
      }
    }
    return str
}

function capitalizeFirstLetter(str: string): string {
  if (!str) return str; // Retorna como está se a string for vazia
  return str.charAt(0).toUpperCase() + str.slice(1);
}