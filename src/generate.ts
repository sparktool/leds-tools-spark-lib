import SEON from "seon-lib-implementation"
import { ProjectGenerator } from "./ProjectGenerator.js"
import { isAttribute, isLocalEntity, isModule, Model } from "./backend/models/model.js"

export function generate(model: Model): void {
    const project = new ProjectGenerator(translate(model))

    project.generate()
}

export function translate(model: Model): SEON.ProjectAbstraction {
    const softwareName = model.configuration?.name ?? ""
    const softwareDescription = model.configuration?.description ?? ""    
    
    const packagesList: SEON.PackageAbstraction[] = []

    for (const absElem of model.abstractElements) {
        if (isModule(absElem)) {
            for (const elem of absElem.elements) {
                if (isLocalEntity(elem)) {
                    const listAttr: SEON.TypeScriptAttribute[] = []

                    for (const attr of elem.attributes) {
                        if (isAttribute(attr)) {
                            listAttr.push(new SEON.TypeScriptAttribute(attr.name, new SEON.PrimitiveTypeAbstraction(attr.type.toString())))
                        }
                    }

                    const cls = new SEON.ClassAbstraction(elem.name, [], listAttr)

                    packagesList.push(new SEON.PackageAbstraction(elem.name, [cls], []))
                }
            }
        }
    }

    return new SEON.ProjectAbstraction(softwareName, softwareDescription, SEON.vueModularArchProjectSettings, packagesList)
}