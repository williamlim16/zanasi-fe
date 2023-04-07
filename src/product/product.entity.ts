import { ApplicationEntity, ApplicationEntityResponse } from "../application/application.entity"
import { BenefitEntity, BenefitEntityResponse } from "../benefit/benefit.entity"
import { ProductIllustration, ProductIllustrationResponse } from "../product-illustrations/productIllustrations.entity"
import { SectorEntity } from "../sector/sector.entity"
import { SpecificationEntity, SpecificationEntityResponse } from "../specification/specification.entity"

export type ProductEntity = {
  id: string
  collectionId: string
  collectionName: string
  created: number
  updated: number
  title: string
  description: string
  applicationDescription: string
  product: string
  banner: string
  documentation: string
  sectors?: SectorEntity[]
  benefits?: BenefitEntity[]
  applications?: ApplicationEntity[]
  productIllustrations?: ProductIllustration[]
  specifications?: SpecificationEntity[]
}

export type ProductEntityResponse = Omit<ProductEntity, "updated"| "created"> & {
  expand: {
    applications? : ApplicationEntityResponse[]
    benefits?: BenefitEntityResponse[]
    product_illustrations?: ProductIllustrationResponse[]
    specifications?: SpecificationEntityResponse[]
  }
  updated: string
  created: string
}