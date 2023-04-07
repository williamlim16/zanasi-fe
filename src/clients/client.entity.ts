export type ClientEntity = {
  id: string
  collectionId: string
  collectionName: string
  created: number
  updated: number
  title: string
  logo: string
}

export type ClientEntityResponse = Omit<ClientEntity, "updated"| "created"> & {
  updated: string
  created: string
}