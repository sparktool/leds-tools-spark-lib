import fs from "fs"
import { expandToString } from "../../template-string.js";
import path from "path"
import ProjectAbstraction from "seon-lib-implementation/dist/abstractions/ProjectAbstraction.js";
import ClassAbstraction from "seon-lib-implementation/dist/abstractions/oo/ClassAbstraction.js";

export function generate(project_abstraction: ProjectAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, 'index.ts'), generateIndex(project_abstraction, target_folder))
}

function generateIndex(project_abstraction: ProjectAbstraction, target_folder: string): string {
    const classList : ClassAbstraction[] = []

    for (const pkg of project_abstraction.getCorePackages()) {
        for (const clazz of pkg.getClasses()){
            classList.push(clazz)
        }
    }

    return expandToString`
import { type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Login from '@/views/Login.vue'



export const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/',
    // impedindo que o usuario navege para a pagina de login
    // se estiver logado
    beforeEnter: () => {
      const auth = useAuthStore()
      if (auth.estaLogado()) {
        return { name: '${classList[0].getName().toLowerCase()}-home' }
      }
      return true

    },
    component: Login
  }
]
`
}