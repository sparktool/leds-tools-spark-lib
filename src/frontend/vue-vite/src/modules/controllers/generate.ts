import fs from "fs"
import { expandToString } from "../../../../../util/template-string.js";
import path from "path"
import SEON from "seon-lib-implementation";

export function generate(project_abstraction: SEON.ProjectAbstraction, cls: SEON.ClassAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, `${cls.getName().toLowerCase()}.ts`), generateController(project_abstraction, cls))
}

function generateController(project_abstraction: SEON.ProjectAbstraction, cls: SEON.ClassAbstraction) : string {
    return expandToString`
/**
 * arquivo controller trata da parte de erros e interface de usuario
 */
import {
  criar${cls.getName()} as _criar${cls.getName()},
  listar${cls.getName()} as _listar${cls.getName()},
  obter${cls.getName()} as _obter${cls.getName()},
  atualizar${cls.getName()} as _atualizar${cls.getName()},
  excluir${cls.getName()} as _excluir${cls.getName()},
} from '../api/${cls.getName().toLowerCase()}'
import type { ${cls.getName()}, ${cls.getName()}CreateReq } from '../types/${cls.getName().toLowerCase()}'
import { useUiStore } from '@/stores/ui'
import { AxiosError } from 'axios'

export const listar${cls.getName()} = async () => {
  try {
    const { data } = await _listar${cls.getName()}()
    return data.value
  } catch (error) {
    throw error
  }
}

export const criar${cls.getName()} = async (${cls.getName().toLowerCase()}: ${cls.getName()}CreateReq) => {
  const ui = useUiStore()

  try {
    const { data } = await _criar${cls.getName()}(${cls.getName().toLowerCase()})

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

export const obter${cls.getName()} = async (id: string) => {
  try {
    const data = await _obter${cls.getName()}(id)
    return data
  } catch (error) {
    throw error
  }
}

export const atualizar${cls.getName()} = async (${cls.getName().toLowerCase()}: ${cls.getName()}) => {
  try {
    const { data } = await _atualizar${cls.getName()}(${cls.getName().toLowerCase()})
    return true
  } catch (error) {
    throw error
  }
}

export const excluir${cls.getName()} = async (id: string) => {
  try {
    const { data } = await _excluir${cls.getName()}(id)
    return true
  } catch (error) {
    throw error
  }
}

export const excluir${cls.getName()}s = async (ids: string[]) => {
  try {
    for (const id of ids) {
      const sucesso = await excluir${cls.getName()}(id)
    }
    return true
  } catch (error) {
    throw error
  }
}    
`
}