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
</template>