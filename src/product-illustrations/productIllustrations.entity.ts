export type ProductIllustration = {
  id: number
  collectionId: string
  collectionName: string
  created: number
  updated: number
  illustration: string
  alt: string
}

export type ProductIllustrationResponse = Omit<ProductIllustration, "updated"| "created"> & {
  updated: string
  created: string
}