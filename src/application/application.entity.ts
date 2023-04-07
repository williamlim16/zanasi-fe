export type ApplicationEntity = {
  id: string
  collectionId: string
  collectionName: string
  created: number
  updated: number
  title: string
  illustration: string
}

export type ApplicationEntityResponse = Omit<ApplicationEntity, "updated"| "created"> & {
  updated: string
  created: string
}