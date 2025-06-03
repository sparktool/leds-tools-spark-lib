import fs from "fs"
import { expandToString } from "../../../template-string.js";
import path from "path"
import ProjectAbstraction from "seon-lib-implementation/dist/abstractions/ProjectAbstraction.js";
import ClassAbstraction from "seon-lib-implementation/dist/abstractions/oo/ClassAbstraction.js";

export function generate(project_abstraction: ProjectAbstraction, cls: ClassAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, `${cls.getName().toLowerCase()}.ts`), generateApi(project_abstraction, cls))
}

function generateApi(project_abstraction: ProjectAbstraction, cls: ClassAbstraction) : string {
    return expandToString`
/**
 * arquivo de api trata da parte de requisicao e suas configuracoes
 */
import adminApi, { adminApiConfig } from '@/api/admin'
import type {
  ${cls.getName()},
  ${cls.getName()}CreateReq,
  ${cls.getName()}ListRes,
  ${cls.getName()}CreateRes,
  ${cls.getName()}GetRes,
  ${cls.getName()}UpdateRes,
  ${cls.getName()}DeleteRes,
} from '../types/${cls.getName().toLowerCase()}.d.ts'

const ${cls.getName().toLowerCase()}ReqConf = {
  baseURL: adminApiConfig.baseURL + '${cls.getName().toLowerCase()}',
}

export const listar${cls.getName()} = async () => {
  return await adminApi.get<${cls.getName()}ListRes>('/', ${cls.getName().toLowerCase()}ReqConf)
}

export const criar${cls.getName()} = async (${cls.getName().toLowerCase()}: ${cls.getName()}CreateReq) => {
  return await adminApi.post<${cls.getName()}CreateRes>('/', ${cls.getName().toLowerCase()}, ${cls.getName().toLowerCase()}ReqConf)
}

export const obter${cls.getName()} = async (id: string) => {
  const { data } = await adminApi.get<${cls.getName()}GetRes>('/' + id, ${cls.getName().toLowerCase()}ReqConf)
  return data.value[0]
}

export const atualizar${cls.getName()} = async (${cls.getName().toLowerCase()}: ${cls.getName()}) => {
  return await adminApi.put<${cls.getName()}UpdateRes>('/' + ${cls.getName().toLowerCase()}.Id, ${cls.getName().toLowerCase()}, ${cls.getName().toLowerCase()}ReqConf)
}

export const excluir${cls.getName()} = async (id: string) => {
  return await adminApi.delete<${cls.getName()}DeleteRes>('/' + id, ${cls.getName().toLowerCase()}ReqConf)
}    
`
}