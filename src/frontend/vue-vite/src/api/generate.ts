import { expandToString } from "../../../../util/template-string.js";
import fs from "fs";
import path from "path";
import SEON from "seon-lib-implementation";


export function generate(project_abstraction: SEON.ProjectAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, 'admin.ts'), generateAdminApi());
}

function generateBearer() : string {
    const str = "`" + "Bearer ${import.meta.env.VITE_BACKEND_ADMIN_AUTH_TOKEN}" + "`"
    return str
}

function generateAdminApi() : string {
    return expandToString`
import axios from 'axios'
import { useUiStore } from '@/stores/ui'


// api para backend-admin, por isso adminApi.
export const adminApiConfig = {
  baseURL: import.meta.env.VITE_BACKEND_ADMIN_BASE_URL,
  headers: {
    'Authorization': ${generateBearer()}
  }
}

const adminApi = axios.create(adminApiConfig)

adminApi.interceptors.request.use((config) => {
  const ui = useUiStore()
  ui.carregando = true
  return config
}, (error) => {
  const ui = useUiStore()
  ui.carregando = false
  throw error
})

adminApi.interceptors.response.use((config) => {
  const ui = useUiStore()
  ui.carregando = false
  return config
}, (error) => {
  const ui = useUiStore()
  ui.carregando = false
  throw error
})

export default adminApi
`
}