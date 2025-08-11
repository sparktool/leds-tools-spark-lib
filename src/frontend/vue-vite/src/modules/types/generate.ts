import fs from "fs"
import { expandToString } from "../../../../../util/template-string.js";
import path from "path"
import SEON from "seon-lib-implementation";

export function generate(project_abstraction: SEON.ProjectAbstraction, cls: SEON.ClassAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, `${cls.getName().toLowerCase()}.d.ts`), generateType(project_abstraction, cls))
}

function generateType(project_abstraction: SEON.ProjectAbstraction, cls: SEON.ClassAbstraction) : string {
    return expandToString`
export type ${cls.getName()} = {
  ${generateAttributes(project_abstraction, cls)}
}

export type ${cls.getName()}CreateReq = Pick<${cls.getName()}, ${generateAttributesToPick(project_abstraction, cls)}>


export type ${cls.getName()}ListRes = {
  "@odata.context": string
  value: ${cls.getName()}[]
}

export type ${cls.getName()}CreateRes = {
  statusCode: number
  uri: string
  message: string
}

export type ${cls.getName()}GetRes = ${cls.getName()}ListRes


export type ${cls.getName()}UpdateRes = {
  statusCode: number
  message: string
}

export type ${cls.getName()}DeleteRes = ${cls.getName()}UpdateRes
`
}

function generateAttributes(project_abstraction: SEON.ProjectAbstraction, cls: SEON.ClassAbstraction) : string{
    let str = ""

    for (const attr of cls.getAttributes()) {
        str = str.concat(`${attr.getName()} : ${attr.getType().getName()}\n`)
    }

    str = str.concat(`Id : string\n`)

    return str
}

function generateAttributesToPick(project_abstraction: SEON.ProjectAbstraction, cls: SEON.ClassAbstraction) : string {
    let str = ""
    for (const attr of cls.getAttributes()) {
        if (cls.getAttributes().indexOf(attr) + 1 == cls.getAttributes().length) {
            str = str.concat(`"${attr.getName()}"`)
        }
        else {
            str = str.concat(`"${attr.getName()}" | `)
        }
    }
    return str
}