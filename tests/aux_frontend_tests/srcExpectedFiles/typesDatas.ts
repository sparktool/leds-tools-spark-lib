import path from "path";
import { srcTypesPath } from "../foldersDatas";
import { expandToString } from "../../../src/util/template-string";


export const srcTypesFiles: { [key: string]: string } = {};


srcTypesFiles[path.join(srcTypesPath, "ui.ts")] = expandToString`
import type { InjectionKey, Ref } from "vue";



export const chaveModal = Symbol() as InjectionKey<{
  estaAberto: Readonly<Ref<boolean, boolean>>;
  abrirModal: (novoTexto?: string) => void;
  fecharModal: () => void;
}>`;