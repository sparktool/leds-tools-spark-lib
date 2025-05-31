import fs from "fs"
import { expandToString } from "../../template-string.js";
import path from "path"
import ProjectAbstraction from "seon-lib-implementation/dist/abstractions/ProjectAbstraction.js";

export function generate(project_abstraction: ProjectAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, 'ui.ts'), generateUi(project_abstraction, target_folder))
}

function generateUi(project_abstraction: ProjectAbstraction, target_folder: string) : string {
    return expandToString`
import type { InjectionKey, Ref } from "vue";



export const chaveModal = Symbol() as InjectionKey<{
  estaAberto: Readonly<Ref<boolean, boolean>>;
  abrirModal: (novoTexto?: string) => void;
  fecharModal: () => void;
}>
`
}