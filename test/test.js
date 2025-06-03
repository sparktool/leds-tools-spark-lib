"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var seon_lib_implementation_1 = require("seon-lib-implementation");
var ProjectGenerator_js_1 = require("../src/ProjectGenerator.js");
function generate() {
    var softwareName = "Moranguinho";
    var softwareDescription = "Aplicativo de gestão de hortas comunitárias";
    var listPkg = generatePackages();
    return new seon_lib_implementation_1.default.ProjectAbstraction(softwareName, softwareDescription, seon_lib_implementation_1.default.vueModularArchProjectSettings, listPkg);
}
function generatePackages() {
    var listPackages = [];
    var name = "Agricultor";
    var listClasses = [new seon_lib_implementation_1.default.ClassAbstraction("Agricultor", [], [new seon_lib_implementation_1.default.TypeScriptAttribute("Idade", new seon_lib_implementation_1.default.PrimitiveTypeAbstraction("int"))])];
    var pkg = new seon_lib_implementation_1.default.PackageAbstraction("Agricultor", listClasses, []);
    listPackages.push(pkg);
    return listPackages;
}
var project = new ProjectGenerator_js_1.ProjectGenerator(generate());
project.generate();
