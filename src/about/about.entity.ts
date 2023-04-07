export type AboutEntity = {
  id: string
  collectionId: string
  collectionName: string
  created: number
  updated: number
  address: string
  whatsapp: string
  telephone: string
  email: string
  instagram: string
}

export type AboutEntityResponse = Omit<AboutEntity, "updated"| "created" | "stories"> & {
  updated: string
  created: string
}
