/**
 * arquivo controller trata da parte de erros e interface de usuario
 */
import {
  criarEntidade1 as _criarEntidade1,
  listarEntidade1 as _listarEntidade1,
  obterEntidade1 as _obterEntidade1,
  atualizarEntidade1 as _atualizarEntidade1,
  excluirEntidade1 as _excluirEntidade1,
} from '../api/entidade1'
import type { Entidade1, Entidade1CreateReq } from '../types/entidade1'
import { useUiStore } from '@/stores/ui'
import { AxiosError } from 'axios'

export const listarEntidade1 = async () => {
  try {
    const { data } = await _listarEntidade1()
    return data.value
  } catch (error) {
    throw error
  }
}

export const criarEntidade1 = async (entidade1: Entidade1CreateReq) => {
  const ui = useUiStore()

  try {
    const { data } = await _criarEntidade1(entidade1)

    ui.exibirAlerta({
      text: data.message,
      color: 'success'
    })

    return true

  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.status === 400 &&
      error.response.data.errors
    ) {
      ui.exibirAlertas(
        error.response.data.errors
          .map((err: { mensagem: string }) => ({ text: err.mensagem, color: 'error' }))
      )

      return false

    } else {
      throw error
    }
  }
}

export const obterEntidade1 = async (id: string) => {
  try {
    const data = await _obterEntidade1(id)
    return data
  } catch (error) {
    throw error
  }
}

export const atualizarEntidade1 = async (entidade1: Entidade1) => {
  try {
    const { data } = await _atualizarEntidade1(entidade1)
    return true
  } catch (error) {
    throw error
  }
}

export const excluirEntidade1 = async (id: string) => {
  try {
    const { data } = await _excluirEntidade1(id)
    return true
  } catch (error) {
    throw error
  }
}

export const excluirEntidade1s = async (ids: string[]) => {
  try {
    for (const id of ids) {
      const sucesso = await excluirEntidade1(id)
    }
    return true
  } catch (error) {
    throw error
  }
}    