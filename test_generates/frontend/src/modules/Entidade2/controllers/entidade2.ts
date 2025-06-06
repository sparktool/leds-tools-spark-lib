/**
 * arquivo controller trata da parte de erros e interface de usuario
 */
import {
  criarEntidade2 as _criarEntidade2,
  listarEntidade2 as _listarEntidade2,
  obterEntidade2 as _obterEntidade2,
  atualizarEntidade2 as _atualizarEntidade2,
  excluirEntidade2 as _excluirEntidade2,
} from '../api/entidade2'
import type { Entidade2, Entidade2CreateReq } from '../types/entidade2'
import { useUiStore } from '@/stores/ui'
import { AxiosError } from 'axios'

export const listarEntidade2 = async () => {
  try {
    const { data } = await _listarEntidade2()
    return data.value
  } catch (error) {
    throw error
  }
}

export const criarEntidade2 = async (entidade2: Entidade2CreateReq) => {
  const ui = useUiStore()

  try {
    const { data } = await _criarEntidade2(entidade2)

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

export const obterEntidade2 = async (id: string) => {
  try {
    const data = await _obterEntidade2(id)
    return data
  } catch (error) {
    throw error
  }
}

export const atualizarEntidade2 = async (entidade2: Entidade2) => {
  try {
    const { data } = await _atualizarEntidade2(entidade2)
    return true
  } catch (error) {
    throw error
  }
}

export const excluirEntidade2 = async (id: string) => {
  try {
    const { data } = await _excluirEntidade2(id)
    return true
  } catch (error) {
    throw error
  }
}

export const excluirEntidade2s = async (ids: string[]) => {
  try {
    for (const id of ids) {
      const sucesso = await excluirEntidade2(id)
    }
    return true
  } catch (error) {
    throw error
  }
}    