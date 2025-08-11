import fs from "fs"
import { expandToString } from "../../../../util/template-string.js";
import path from "path"
import SEON from "seon-lib-implementation";

export function generate(project_abstraction: SEON.ProjectAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, 'ui.ts'), generateUi(project_abstraction, target_folder))
}

function generateUi(project_abstraction: SEON.ProjectAbstraction, target_folder: string) : string {
    return expandToString`
import type { InjectionKey, Ref } from "vue";



export const chaveModal = Symbol() as InjectionKey<{
  estaAberto: Readonly<Ref<boolean, boolean>>;
  abrirModal: (novoTexto?: string) => void;
  fecharModal: () => void;
}>
`
}