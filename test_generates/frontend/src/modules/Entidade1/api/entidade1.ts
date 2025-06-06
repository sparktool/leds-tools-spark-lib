/**
 * arquivo de api trata da parte de requisicao e suas configuracoes
 */
import adminApi, { adminApiConfig } from '@/api/admin'
import type {
  Entidade1,
  Entidade1CreateReq,
  Entidade1ListRes,
  Entidade1CreateRes,
  Entidade1GetRes,
  Entidade1UpdateRes,
  Entidade1DeleteRes,
} from '../types/entidade1.d.ts'

const entidade1ReqConf = {
  baseURL: adminApiConfig.baseURL + 'entidade1',
}

export const listarEntidade1 = async () => {
  return await adminApi.get<Entidade1ListRes>('/', entidade1ReqConf)
}

export const criarEntidade1 = async (entidade1: Entidade1CreateReq) => {
  return await adminApi.post<Entidade1CreateRes>('/', entidade1, entidade1ReqConf)
}

export const obterEntidade1 = async (id: string) => {
  const { data } = await adminApi.get<Entidade1GetRes>('/' + id, entidade1ReqConf)
  return data.value[0]
}

export const atualizarEntidade1 = async (entidade1: Entidade1) => {
  return await adminApi.put<Entidade1UpdateRes>('/' + entidade1.Id, entidade1, entidade1ReqConf)
}

export const excluirEntidade1 = async (id: string) => {
  return await adminApi.delete<Entidade1DeleteRes>('/' + id, entidade1ReqConf)
}    