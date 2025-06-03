import SEON, { type PackageAbstraction, type ProjectAbstraction} from "seon-lib-implementation";
import ClassAbstraction from "seon-lib-implementation";
import { ProjectGenerator } from "../src/ProjectGenerator.js";

function generate() : ProjectAbstraction {
    const softwareName = "Moranguinho";
    const softwareDescription = "Aplicativo de gestão de hortas comunitárias";
    const listPkg = generatePackages();
    return new SEON.ProjectAbstraction(softwareName, softwareDescription, SEON.vueModularArchProjectSettings, listPkg);
}

function generatePackages() : PackageAbstraction[] {
    const listPackages: PackageAbstraction[] = []
    const listClasses = [new SEON.ClassAbstraction("Agricultor", [], [new SEON.TypeScriptAttribute("Idade", new SEON.PrimitiveTypeAbstraction("int"))])]

    
    const pkg = new SEON.PackageAbstraction("Agricultor", listClasses, []);
    listPackages.push(pkg);
    return listPackages
}

const project = new ProjectGenerator(generate());
project.generate();