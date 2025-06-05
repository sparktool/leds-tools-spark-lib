import { afterAll, beforeAll, expect, test, vi } from "vitest";
import {generate} from "../src/frontend/vue-vite/generate.js";
// import PackageAbstraction from "seon-lib-implementation/dist/abstractions/project/PackageAbstraction.js";
import { checkIsDir, checkFileContent, checkIsFile  } from "./checkers.js";
import { deleteFolderRecursive } from "./deletionFrontend.js";
import path from 'path';
import { ClassAbstraction, PackageAbstraction, PrimitiveTypeAbstraction, ProjectAbstraction, TypeScriptAttribute, vueModularArchProjectSettings } from "seon-lib-implementation";
import { frontendFiles } from "./frontendDatas.js";
import { srcApiFiles } from "./srcExpectedFiles/apiDatas.js";
import { allFolderList, srcAssetsPath, frontEndPath, publicPath,
        srcPath, srcApiPath, srcComponentsPath, srcLayoutsPath, 
        srcIconsComponentsPath, srcModulesPath, srcSidenavComponentsPath,
    } from "./foldersDatas.js";


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


afterAll(() => {
    deleteFolderRecursive(path.join(__dirname, 'frontend'));
});


test.each(allFolderList)(`Test existence of folder %s`, (dirPath) => {
    expect(() => checkIsDir(dirPath)).not.toThrow();
});


test.each([
    [logoPngFile], [ logoSvgFile], [faviconFile] 
])(`Test existence of %s `, (fileName) => { // non textual files, content will not be checked as a string
    expect(() => checkIsFile(fileName)).not.toThrow();
});


let eachFrontEndFilesEach: [string, string][] = [];

for (const key in frontendFiles) {
    eachFrontEndFilesEach.push([path.join(frontEndPath, key), frontendFiles[key]])
}

test.each(eachFrontEndFilesEach)(`Test generated file in %s`, (folder, file) => {
    expect(() => checkFileContent(folder, file)).not.toThrow();
});