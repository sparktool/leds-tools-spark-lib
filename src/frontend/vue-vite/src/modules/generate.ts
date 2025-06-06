import { createPath } from "../../../../util/generator-utils.js";
import { generate as generateAPI} from "./api/generate.js"
import { generate as generateControllers} from "./controllers/generate.js"
import { generate as generateRoutes} from "./routes/generate.js"
import { generate as generateTypes} from "./types/generate.js"
import { generate as generateViews } from "./views/generate.js"
import fs from "fs"
import { expandToString } from "../../template-string.js";
import path from "path"
import ClassAbstraction from "seon-lib-implementation/dist/abstractions/oo/ClassAbstraction.js";
import ProjectAbstraction from "seon-lib-implementation/dist/abstractions/ProjectAbstraction.js";

export function generate(project_abstraction: ProjectAbstraction, target_folder: string) : void {
    const classList : ClassAbstraction[] = []

    for (const pkg of project_abstraction.getCoresPackages()) {
        for (const clazz of pkg.getPackageLevelClasses()){
            classList.push(clazz)
        }
    }

    fs.writeFileSync(path.join(target_folder, 'index.ts'), generateModulesIndex(classList));

    for (const cls of classList) {
        const folder = createPath(target_folder, `${cls.getName()}`)
        fs.mkdirSync(folder, {recursive:true})
        generateModule(project_abstraction, cls, folder)
    }
}

function generateModulesIndex(clsList : ClassAbstraction[]) : string {
    return expandToString`
import { type RouteRecordRaw } from 'vue-router'

${generateImportClass(clsList)}

export const routes: RouteRecordRaw[] = [
${generateExportClass(clsList)}
]
`
}

function generateImportClass(clsList: ClassAbstraction[]) : string {
    var str = ""

    for (const cls of clsList) {
        str = str.concat(`import { routes as ${cls.getName().toLowerCase()}Route } from './${cls.getName()}'\n`)
    }

    return str
}

function generateExportClass(clsList: ClassAbstraction[]) : string {
    var str = ""

    for (const cls of clsList) {
        str = str.concat(`  ...${cls.getName().toLowerCase()}Route,\n`)
    }

    return str
}

function generateModule(project_abstraction: ProjectAbstraction, cls: ClassAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, 'index.ts'), generateModIndex(cls))

    const api_folder = createPath(target_folder, "api")
    const controllers_folder = createPath(target_folder, "controllers")
    const routes_folder = createPath(target_folder, "routes")
    const types_folder = createPath(target_folder, "types")
    const views_folder = createPath(target_folder, "views")

    fs.mkdirSync(api_folder, {recursive:true})
    fs.mkdirSync(controllers_folder, {recursive:true})
    fs.mkdirSync(routes_folder, {recursive:true})
    fs.mkdirSync(types_folder, {recursive:true})
    fs.mkdirSync(views_folder, {recursive:true})

    generateAPI(project_abstraction, cls, api_folder)
    generateControllers(project_abstraction, cls, controllers_folder)
    generateRoutes(project_abstraction, cls, routes_folder)
    generateTypes(project_abstraction, cls, types_folder)
    generateViews(project_abstraction, cls, views_folder)
}

function generateModIndex(cls: ClassAbstraction) : string {
    return expandToString`
import { type RouteRecordRaw } from 'vue-router'
import { routes as _routes } from './routes'

export const routes: RouteRecordRaw[] = [
  {
    path: '/${cls.getName()}',
    children: _routes,
    meta: {
      requiresAuth: true
    }
  }
]
`
}