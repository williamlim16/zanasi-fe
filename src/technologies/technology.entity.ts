import { ProductEntity, ProductEntityResponse } from "../product/product.entity"

export type TechnologyEntity = {
  id: string
  collectionId: string
  collectionName: string
  created: number
  updated: number
  title: string
  tagline: string
  description: string
  banner: string
  logo: string
  products?: ProductEntity[]
}

export type TechnologyEntityResponse = Omit<TechnologyEntity, "created" | "updated"| "products"> & {
  created: string
  updated: string
  products?: ProductEntityResponse[]
  expand?:
  {
    products?:ProductEntityResponse[]
  }
}