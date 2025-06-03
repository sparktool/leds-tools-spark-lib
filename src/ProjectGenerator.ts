import path from "path";
import fs from "fs";
import { generate as generateVueModularArch} from "./frontend/vue-vite/generate.ts";
import type ProjectAbstraction from "seon-lib-implementation/dist/abstractions/ProjectAbstraction";
import { VueModularArchitecture } from "seon-lib-implementation";


export class ProjectGenerator {
    private project: ProjectAbstraction;

    constructor(project: ProjectAbstraction){
        this.project = project;
    }

    public generate(): void {
        const projectPath = path.join(process.cwd(), this.project.getProjectName());

        if (this.project.getSpecifications().architecture instanceof VueModularArchitecture) {
            fs.mkdirSync(projectPath, { recursive: true });
            generateVueModularArch(this.project, projectPath);
        }
    }
}

