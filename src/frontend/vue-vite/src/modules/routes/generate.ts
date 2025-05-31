import fs from "fs"
import { expandToString } from "../../../template-string";
import path from "path"
import ProjectAbstraction from "seon-lib-implementation/dist/abstractions/ProjectAbstraction";
import ClassAbstraction from "seon-lib-implementation/dist/abstractions/oo/ClassAbstraction";

export function generate(project_abstraction: ProjectAbstraction, cls: ClassAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, `index.ts`), generateRoute(project_abstraction, cls))
}

function generateRoute(project_abstraction: ProjectAbstraction, cls: ClassAbstraction) : string {
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