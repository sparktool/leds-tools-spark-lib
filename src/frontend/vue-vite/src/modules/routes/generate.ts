import fs from "fs"
import { expandToString } from "../../../../../util/template-string.js";
import path from "path"
import SEON from "seon-lib-implementation";

export function generate(project_abstraction: SEON.ProjectAbstraction, cls: SEON.ClassAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, `index.ts`), generateRoute(project_abstraction, cls))
}

function generateRoute(project_abstraction: SEON.ProjectAbstraction, cls: SEON.ClassAbstraction) : string {
    return expandToString`
import type { RouteRecordRaw } from 'vue-router'
import Listar from '../views/Listar.vue'
import Criar from '../views/Criar.vue'

export const routes: RouteRecordRaw[] = [
  {
    name: '${cls.getName().toLowerCase()}-home',
    path: 'home',
    component: Listar,
  },
  {
    name: '${cls.getName().toLowerCase()}-criar',
    path: 'criar/:id?',
    component: Criar,
  }
]
`
}