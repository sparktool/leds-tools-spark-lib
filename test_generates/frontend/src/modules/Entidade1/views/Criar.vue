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
/>\n    <text-input
class="w-full"
placeholder="Numero"
v-model="numero"
/>\n

    <div class="flex justify-end">
      <p-button
        @click="dispatchBotao"
      >
        {{ modo === 'criar' ? 'Registrar' : 'Atualizar' }}
      </p-button>
    </div>
  </card>
</template>