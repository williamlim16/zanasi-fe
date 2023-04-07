export type SpecificationEntity = {
  id: string
  collectionId: string
  collectionName: string
  created: number
  updated: number
  specification: string
}

export type SpecificationEntityResponse = Omit<SpecificationEntity, "updated"| "created"> & {
  updated: string
  created: string
}