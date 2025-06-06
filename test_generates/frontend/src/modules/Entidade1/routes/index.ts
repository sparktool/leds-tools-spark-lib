import type { RouteRecordRaw } from 'vue-router'
import Listar from '../views/Listar.vue'
import Criar from '../views/Criar.vue'

export const routes: RouteRecordRaw[] = [
  {
    name: 'entidade1-home',
    path: 'home',
    component: Listar,
  },
  {
    name: 'entidade1-criar',
    path: 'criar/:id?',
    component: Criar,
  }
]