export type Entidade1 = {
  nome : string
numero : integer
Id : string

}

export type Entidade1CreateReq = Pick<Entidade1, "nome" | "numero">


export type Entidade1ListRes = {
  "@odata.context": string
  value: Entidade1[]
}

export type Entidade1CreateRes = {
  statusCode: number
  uri: string
  message: string
}

export type Entidade1GetRes = Entidade1ListRes


export type Entidade1UpdateRes = {
  statusCode: number
  message: string
}

export type Entidade1DeleteRes = Entidade1UpdateRes