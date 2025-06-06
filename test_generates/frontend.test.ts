import { afterAll, beforeAll, expect, test, vi } from "vitest";
import {generate} from "../src/frontend/vue-vite/generate.js";
// import PackageAbstraction from "seon-lib-implementation/dist/abstractions/project/PackageAbstraction.js";
import { checkIsDir, checkFileContent, checkIsFile  } from "./aux_frontend_tests/checkers.js";
import { deleteFolderRecursive } from "./aux_frontend_tests/deletionFrontend.js";
import path from 'path';
import { ClassAbstraction, PackageAbstraction, PrimitiveTypeAbstraction, ProjectAbstraction, TypeScriptAttribute, vueModularArchProjectSettings } from "seon-lib-implementation";
import { frontendFiles } from "./aux_frontend_tests/frontendDatas.js";
import { srcApiFiles } from "./aux_frontend_tests/srcExpectedFiles/apiDatas.js";
import { allFolderList, srcAssetsPath, frontEndPath, publicPath
    } from "./aux_frontend_tests/foldersDatas.js";
import { srcComponentsFiles } from "./aux_frontend_tests/srcExpectedFiles/componentsDatas.js";
import { srcLayoutsFiles } from "./aux_frontend_tests/srcExpectedFiles/layoutsDatas.js";
import { srcModulesFiles } from "./aux_frontend_tests/srcExpectedFiles/modulesDatas.js";
import { srcPluginsFiles } from "./aux_frontend_tests/srcExpectedFiles/pluginsDatas.js";
import { srcRootFiles } from "./aux_frontend_tests/srcExpectedFiles/rootDatas.js";
import { srcRoutesFiles } from "./aux_frontend_tests/srcExpectedFiles/routesDatas.js";
import { srcStoresFiles } from "./aux_frontend_tests/srcExpectedFiles/storesDatas.js";
import { srcTypesFiles } from "./aux_frontend_tests/srcExpectedFiles/typesDatas.js";
import { srcUtilsFiles } from "./aux_frontend_tests/srcExpectedFiles/utilsDatas.js";
import { srcViewsFiles } from "./aux_frontend_tests/srcExpectedFiles/viewsDatas.js";


let project: ProjectAbstraction = new ProjectAbstraction('Test', "Testes dos geradores do frontend", vueModularArchProjectSettings, 
    [
        new PackageAbstraction('Entidade1', [
            new ClassAbstraction('Entidade1', [], 
                [
                    new TypeScriptAttribute('nome', new PrimitiveTypeAbstraction('string')), 
                    new TypeScriptAttribute('numero', new PrimitiveTypeAbstraction('integer')), 
                ]),
            ], 
        ),
        new PackageAbstraction('Entidade2', [
            new ClassAbstraction('Entidade2', [], 
                [
                    new TypeScriptAttribute('nome', new PrimitiveTypeAbstraction('string')), 
                    new TypeScriptAttribute('verificacao', new PrimitiveTypeAbstraction('boolean')), 
                ]),
            ], 
        )
    ]
);


const logoPngFile = path.join(srcAssetsPath, 'logo.png')
const logoSvgFile = path.join(srcAssetsPath, 'logo.svg')
const faviconFile = path.join(publicPath, 'favicon.png')


beforeAll(() => {
    generate(project, __dirname);
});

/*
afterAll(() => {
    deleteFolderRecursive(path.join(__dirname, 'frontend'));
});
*/


test.each(allFolderList)(`Test existence of folder %s`, (dirPath) => {
    expect(() => checkIsDir(dirPath)).not.toThrow();
});


test.each([
    [logoPngFile], [ logoSvgFile], [faviconFile] 
])(`Test existence of %s `, (fileName) => { // non textual files, content will not be checked as a string
    expect(() => checkIsFile(fileName)).not.toThrow();
});


let eachFrontEndFileContent: [string, string][] = [];

for (const key in frontendFiles) {
    eachFrontEndFileContent.push([path.join(frontEndPath, key), frontendFiles[key]])
}

test.each(eachFrontEndFileContent)(`Test generated file in %s`, (filePath, file) => {
    expect(() => checkFileContent(filePath, file)).not.toThrow();
});


// merge dicts
const allSrcFiles: { [key: string] : string } = { 
    ...srcApiFiles, ...srcComponentsFiles, ...srcLayoutsFiles, 
    ...srcModulesFiles, ...srcPluginsFiles, ...srcRootFiles, ...srcRoutesFiles,
    ...srcStoresFiles, ...srcTypesFiles, ...srcUtilsFiles, ...srcViewsFiles
}

for (let i in allFolderList) {
    console.log(i, allFolderList[i])
}

let eachSrcFileContent: [string, string][] = [];

for (const key in allSrcFiles) {
    eachSrcFileContent.push([key, allSrcFiles[key]])
}

test.each(eachSrcFileContent)(`Test generated file in %s`, (filePath, file) => {
    expect(() => checkFileContent(filePath, file)).not.toThrow();
});