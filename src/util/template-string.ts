import * as os from 'os';

/**
 * Template literal tag para alinhar automaticamente strings multilinha,
 * removendo a indentação comum e utilizando o separador de linha da plataforma.
 */

export function expandToString(
    strings: TemplateStringsArray,
    ...values: any[]
): string {
    // Interpola as expressões
    let raw = strings.raw.reduce((acc, str, i) => {
        return acc + str + (i < values.length ? values[i] : '');
    }, '');

    const lines = raw.split(/\r?\n/);

    // Remove linhas vazias no início e fim
    const trimmedLines = lines.slice(
        lines.findIndex(line => line.trim() !== ''),
        lines.length - [...lines].reverse().findIndex(line => line.trim() !== '')
    );

    // Descobre a menor indentação em espaços/tabs nas linhas não vazias
    const indentLengths = trimmedLines
        .filter(line => line.trim() !== '')
        .map(line => RegExp(/^\s*/).exec(line)?.[0].length ?? 0);

    const minIndent = indentLengths.length > 0 ? Math.min(...indentLengths) : 0;

    // Remove a indentação comum e junta usando EOL da plataforma
    const aligned = trimmedLines
        .map(line => line.slice(minIndent))
        .join(os.EOL);

    return aligned;
}
