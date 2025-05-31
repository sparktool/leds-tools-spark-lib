import ProjectAbstraction from "seon-lib-implementation/dist/abstractions/ProjectAbstraction";
import SEON from "seon-lib-implementation";
import fs from "fs";
import path from "path";
import { generate as helpersGenerator } from "./helpers-generator.js";
import { generate as publicGenerator } from "./public/generate.js";
import { generate as srcGenerator } from "./src/generate.js";


export function generate(project_abstraction: ProjectAbstraction, target_folder: string) : void {
    const frontend_folder = path.join(target_folder, "frontend");
    fs.mkdirSync(frontend_folder, { recursive: true });
    helpersGenerator(project_abstraction, frontend_folder)
    publicGenerator(project_abstraction, frontend_folder)
    srcGenerator(project_abstraction, frontend_folder)

}
