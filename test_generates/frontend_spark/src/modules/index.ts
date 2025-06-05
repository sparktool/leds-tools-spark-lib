import { type RouteRecordRaw } from 'vue-router'

import { routes as entidade1Route } from './Entidade1'
import { routes as entidade2Route } from './Entidade2'


export const routes: RouteRecordRaw[] = [
  ...entidade1Route,
  ...entidade2Route,

]