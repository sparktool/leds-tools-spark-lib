import fs from "fs"
import { expandToString } from "../../template-string.js";
import path from "path"
import ProjectAbstraction from "seon-lib-implementation/dist/abstractions/ProjectAbstraction.js";
import ClassAbstraction from "seon-lib-implementation/dist/abstractions/oo/ClassAbstraction.js";

export function generate(project_abstraction: ProjectAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, 'auth.ts'), generateAuth(project_abstraction, target_folder))
    fs.writeFileSync(path.join(target_folder, 'ui.ts'), generateUi(project_abstraction, target_folder))
}

function generateAuth(project_abstraction: ProjectAbstraction, target_folder: string): string {
    const classList : ClassAbstraction[] = []

    for (const pkg of project_abstraction.getCoresPackages()) {
        for (const clazz of pkg.getPackageLevelClasses()){
            classList.push(clazz)
        }
    }

    return expandToString`
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'



export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const usuario = ref('')

  const cookies = useCookies(['token'])
  const getSessionToken = () => {
    return cookies.get('token')
  }
  const setSessionToken = (newToken: boolean) => {
    return cookies.set('token', newToken,
      {
        path: '/',
        // 10 minutos, para que seja possivel ver a expiracao de sessao
        // em funcionamento
        maxAge:  600
      })
  }

  const login = async (novoUsuario: string, senha: string) => {
    // requisicao a api vai aqui
    // talvez validar de novo?
    usuario.value = novoUsuario
    setSessionToken(true)
    return await router.push({ name: '${classList[0].getName().toLowerCase()}-home' })
  }
  const logout = async () => {
    usuario.value = ''
    setSessionToken(false)
    return await router.push({ name: 'login' })
  }
  const estaLogado = () => {
    return getSessionToken()
  }

  return {
    usuario,
    login,
    logout,
    estaLogado,
  }
})
`
}

function generateUi(project_abstraction: ProjectAbstraction, target_folder: string): string {
    return expandToString`
import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'



// tipo ruim. esperar vuetify implementar e expor o tipo
type Snackbar = Record<string, any>

interface PrivateUIStore {
  mensagensAlerta: Ref<Snackbar[]>
}
// pinia reclama quando usa uma store dentro da outra, por algum motivo
interface PrivateUIStore_ {
  mensagensAlerta: Snackbar[]
}
// https://masteringpinia.com/blog/how-to-create-private-state-in-stores
const usePrivateState = defineStore('ui-private', () => {
  const mensagensAlerta = ref<Snackbar>([])
  return {
    mensagensAlerta,
  } as PrivateUIStore
})


interface UIStore {
  mensagensAlerta: ComputedRef<Snackbar[]>
  exibirAlertas: (novaMsgAlerta: Snackbar) => boolean
  exibirAlerta: (novaMsgAlerta: Snackbar) => boolean
  fecharAlerta: (mensagensRestantes: Snackbar[]) => boolean
  carregando: Ref<boolean>
  mostrarBarraLateral: Ref<boolean>
}
export const useUiStore = defineStore('ui', () => {
  const privado = usePrivateState() as unknown as PrivateUIStore_

  const mensagensAlerta = computed(() => privado.mensagensAlerta)

  const exibirAlertas = (
    novasMensagens: Snackbar[]
  ) => {
    privado.mensagensAlerta.splice(0, 0, ...novasMensagens)
    return true
  }
  const exibirAlerta = (
    novaMsgAlerta: Snackbar
  ) => {
    return exibirAlertas([novaMsgAlerta])
  }

  const fecharAlerta = (mensagensRestantes: Snackbar[]) => {
    privado.mensagensAlerta = mensagensRestantes
    return true
  }

  const carregando = ref(false)

  const mostrarBarraLateral = ref(true)

  return {
    mensagensAlerta,
    exibirAlertas,
    exibirAlerta,
    fecharAlerta,
    carregando,
    mostrarBarraLateral
  } as UIStore
})
`
}