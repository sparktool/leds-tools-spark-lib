import path from "path";
import { srcStoresPath } from "../foldersDatas";


export const srcStoresFiles: { [key: string]: string } = {};

srcStoresFiles[path.join(srcStoresPath, "auth.ts")] = `import { defineStore } from 'pinia'
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
    return await router.push({ name: 'entidade1-home' })
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
})`;

srcStoresFiles[path.join(srcStoresPath, "ui.ts")] = `import { defineStore } from 'pinia'
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
})`;