import path from "path";



export const frontEndPath = path.join(__dirname, 'frontend');
export const publicPath = path.join(frontEndPath, 'public');
const publicAssetsPath = path.join(publicPath, 'assets');
const publicImagesPath = path.join(publicAssetsPath, 'images');
export const srcPath = path.join(frontEndPath, 'src');
export const srcApiPath = path.join(srcPath, 'api');
export const srcAssetsPath = path.join(srcPath, 'assets');
export const srcComponentsPath = path.join(srcPath, 'components');
export const srcIconsComponentsPath = path.join(srcComponentsPath, 'icons');
export const srcSidenavComponentsPath = path.join(srcComponentsPath, 'sidenav'); // TODO: refazer tudo, usando testes realmente unitários para cada um dos arquivos e pastas (usar um test foreach para evitar repetição de código)
export const srcLayoutsPath = path.join(srcPath, 'layouts');
export const srcModulesPath = path.join(srcPath, 'modules');
export const entidade1Path = path.join(srcModulesPath, 'Entidade1');
export const entidade1viewsPath = path.join(entidade1Path, 'views');
export const entidade2Path = path.join(srcModulesPath, 'Entidade2');
export const entidade2viewsPath = path.join(entidade2Path, 'views');
export const pluginsPath = path.join(srcPath, 'plugins');
export const routesPath = path.join(srcPath, 'routes');


export const allFolderList: string[][] = [
    [frontEndPath], 
    [publicPath], [publicAssetsPath], [publicImagesPath], [srcPath], 
    [srcApiPath], [srcAssetsPath], [srcComponentsPath], [srcIconsComponentsPath],
    [srcSidenavComponentsPath], [srcLayoutsPath], [entidade1Path],
    [entidade1viewsPath], [entidade2Path], [entidade2viewsPath], [pluginsPath], 
    [routesPath]
];