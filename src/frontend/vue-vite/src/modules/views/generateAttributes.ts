import ClassAbstraction from "seon-lib-implementation/dist/abstractions/oo/ClassAbstraction.js"

// Nome: nome.value, 
// Descricao: descricao.value
export function generateAttributesAsParameters(cls: ClassAbstraction) : string {
    var str = ""
    for (const attr of cls.getAttributes()) {
        if (cls.getAttributes().indexOf(attr) + 1 == cls.getAttributes().length) {
            str = str.concat(`${attr.getName()}: ${attr.getName().toLowerCase()}.value\n`)
        }
        else {
            str = str.concat(`${attr.getName()}: ${attr.getName().toLowerCase()}.value,\n`)
        }
    }
    return str
}

//  nome.value = ''
//  descricao.value = ''
export function generateAttributesValue(cls: ClassAbstraction): string {
    var str = ""
    for (const attr of cls.getAttributes()) {
        str = str.concat(`${attr.getName().toLowerCase()}.value = ''\n`)
    }
    return str
}


//  nome.value = class.Nome
//  descricao.value = class.Descricao

export function generateValuesEqualsAttributes(cls: ClassAbstraction): string {
    var str = ""
    for (const attr of cls.getAttributes()) {
        str = str.concat(`${attr.getName().toLowerCase()}.value = cls.${attr.getName()}\n`)
    }
    return str
}


//{ value: 'Nome', title: 'Nome' },
//{ value: 'Descricao', title: 'Descrição' }

export function generateAttributesAsHeader(cls: ClassAbstraction): string {
    var str = ""
    for (const attr of cls.getAttributes()) {
        if (cls.getAttributes().indexOf(attr) + 1 == cls.getAttributes().length) {
            str = str.concat(`{ value: '${attr.getName()}', title: '${attr.getName()}' }\n`)
        }
        else {
            str = str.concat(`{ value: '${attr.getName()}', title: '${attr.getName()}' },\n`)
        }
    }
    return str
}