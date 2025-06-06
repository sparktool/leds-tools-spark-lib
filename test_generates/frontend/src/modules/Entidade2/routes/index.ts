import type { RouteRecordRaw } from 'vue-router'
import Listar from '../views/Listar.vue'
import Criar from '../views/Criar.vue'

export const routes: RouteRecordRaw[] = [
  {
    name: 'entidade2-home',
    path: 'home',
    component: Listar,
  },
  {
    name: 'entidade2-criar',
    path: 'criar/:id?',
    component: Criar,
  }
]