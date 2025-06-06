/**
 * arquivo de api trata da parte de requisicao e suas configuracoes
 */
import adminApi, { adminApiConfig } from '@/api/admin'
import type {
  Entidade2,
  Entidade2CreateReq,
  Entidade2ListRes,
  Entidade2CreateRes,
  Entidade2GetRes,
  Entidade2UpdateRes,
  Entidade2DeleteRes,
} from '../types/entidade2.d.ts'

const entidade2ReqConf = {
  baseURL: adminApiConfig.baseURL + 'entidade2',
}

export const listarEntidade2 = async () => {
  return await adminApi.get<Entidade2ListRes>('/', entidade2ReqConf)
}

export const criarEntidade2 = async (entidade2: Entidade2CreateReq) => {
  return await adminApi.post<Entidade2CreateRes>('/', entidade2, entidade2ReqConf)
}

export const obterEntidade2 = async (id: string) => {
  const { data } = await adminApi.get<Entidade2GetRes>('/' + id, entidade2ReqConf)
  return data.value[0]
}

export const atualizarEntidade2 = async (entidade2: Entidade2) => {
  return await adminApi.put<Entidade2UpdateRes>('/' + entidade2.Id, entidade2, entidade2ReqConf)
}

export const excluirEntidade2 = async (id: string) => {
  return await adminApi.delete<Entidade2DeleteRes>('/' + id, entidade2ReqConf)
}    