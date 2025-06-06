export type Entidade2 = {
  nome : string
verificacao : boolean
Id : string

}

export type Entidade2CreateReq = Pick<Entidade2, "nome" | "verificacao">


export type Entidade2ListRes = {
  "@odata.context": string
  value: Entidade2[]
}

export type Entidade2CreateRes = {
  statusCode: number
  uri: string
  message: string
}

export type Entidade2GetRes = Entidade2ListRes


export type Entidade2UpdateRes = {
  statusCode: number
  message: string
}

export type Entidade2DeleteRes = Entidade2UpdateRes