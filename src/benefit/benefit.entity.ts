export type BenefitEntity = {
  id: string
  collectionId: string
  collectionName: string
  created: number
  updated: number
  title: string
  description: string
  logo: string
}

export type BenefitEntityResponse = Omit<BenefitEntity, "updated"| "created"> & {
  updated: string
  created: string
}