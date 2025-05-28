import { generate as generateVueModularArch} from "./frontend/vue-vite/generate";

import SEON from "seon-lib-implementation";
import ProjectAbstraction from "seon-lib-implementation/dist/abstractions/ProjectAbstraction";
import VueModularArchitecture from "seon-lib-implementation/dist/prefabs/sintaxes/typescript/VueModularArchitecture";

export class Spark {
    private project: ProjectAbstraction;

    constructor(project: ProjectAbstraction){
        this.project = project;
    }

    private generate(): void {
       if (this.project.getSpecifications() instanceof VueModularArchitecture) {
            generateVueModularArch(this.project);
        }
    }
}
