import fs from "fs"
import { expandToString } from "../../../../util/template-string.js";
import path from "path"
import SEON from "seon-lib-implementation";

export function generate(project_abstraction: SEON.ProjectAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, 'logo.png'), generatePng(project_abstraction, target_folder))
    fs.writeFileSync(path.join(target_folder, 'logo.svg'), generateSvg(project_abstraction, target_folder))

    fs.writeFileSync(path.join(target_folder, 'style.css'), generateStyle(project_abstraction, target_folder))
}

function generatePng(project_abstraction: SEON.ProjectAbstraction, target_folder: string) : string {
    return expandToString`

`
}

function generateSvg(project_abstraction: SEON.ProjectAbstraction, target_folder: string) : string {
    return expandToString` 

`
}

function generateStyle(project_abstraction: SEON.ProjectAbstraction, target_folder: string) : string {
    return expandToString`
@import "tailwindcss";
`
}