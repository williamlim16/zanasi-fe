import {  ProductEntity, ProductEntityResponse } from "./product.entity";
import { filePath } from "../api/server"
import pb from "../api/pocketbase"
import { formatApplication } from "../application/application.service";
import { formatProductIllustrations } from "../product-illustrations/productIllustrations.service";
import { formatBenefit } from "../benefit/benefit.service";
import { formatSpecification }from "../specification/specification.service";

const path = "products"

export function formatProduct (product: ProductEntityResponse) :ProductEntity {
  let fixedFields: ProductEntity = {
    id: product.id,
    collectionId: product.collectionId,
    collectionName: product.collectionName,
    created: Date.parse(product.created),
    updated: Date.parse(product.updated),
    title: product.title,
    description: product.description,
    applicationDescription: product.applicationDescription,
    documentation: product.documentation,
    product: `${filePath}/${product.collectionId}/${product.id}/${product.product}`,
    banner: `${filePath}/${product.collectionId}/${product.id}/${product.banner}`,
  }
  if(product.expand.applications && product.expand.applications.length > 0){
    fixedFields = {
      ...fixedFields,
      applications:  product.expand.applications?.map((application) => (formatApplication(application))) 
    }
  }

  if(product.expand.product_illustrations && product.expand.product_illustrations.length > 0){
    fixedFields = {
      ...fixedFields,
      productIllustrations:  product.expand.product_illustrations?.map((productIllustration) => (formatProductIllustrations(productIllustration))) 
    }
  }

  if(product.expand.benefits && product.expand.benefits.length > 0){
    fixedFields = {
      ...fixedFields,
      benefits:  product.expand.benefits?.map((benefit) => (formatBenefit(benefit))) 
    }
  }

  if(product.expand.specifications && product.expand.specifications.length > 0){
    fixedFields = {
      ...fixedFields,
      specifications:  product.expand.specifications?.map((specification) => (formatSpecification(specification))) 
    }
  }
  return fixedFields
}

export const getProducts = async (): Promise<ProductEntity[]> => {
  const products = await pb.collection(path).getFullList<ProductEntityResponse>()
  const formatData: ProductEntity[] = products.map((product) => (formatProduct(product)))
  return formatData
}

export const getProduct = async (id: string): Promise<ProductEntity> => {
  const product = await pb.collection(path).getOne<ProductEntityResponse>(id, {
    expand: "product_illustrations,benefits,applications,specifications"
  })
  const res = formatProduct(product) 
  return res
}


