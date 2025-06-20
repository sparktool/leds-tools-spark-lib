import path from "path";
import fs from "fs";
import { generate as generateVueModularArch} from "./frontend/vue-vite/generate.js";
import SEON from "seon-lib-implementation";

// Classe principal da Spark Lib
export class ProjectGenerator {
    private readonly project: SEON.ProjectAbstraction;

    constructor(project: SEON.ProjectAbstraction){
        this.project = project;
    }

    public generate(): void {
        const projectPath = path.join(process.cwd(), this.project.getProjectName());

        if (this.project.getSpecifications().architecture instanceof SEON.VueModularArchitecture) {
            fs.mkdirSync(projectPath, { recursive: true });
            generateVueModularArch(this.project, projectPath);
        }
    }
}

