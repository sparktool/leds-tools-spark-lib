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
</template>