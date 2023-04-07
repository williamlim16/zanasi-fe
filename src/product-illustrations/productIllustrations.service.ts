import { filePath } from "../api/server"
import { ProductIllustration, ProductIllustrationResponse } from "./productIllustrations.entity"

export function formatProductIllustrations (productIllustration: ProductIllustrationResponse): ProductIllustration {
  return {
    id: productIllustration.id,
    collectionId: productIllustration.collectionId,
    collectionName: productIllustration.collectionName,
    created: Date.parse(productIllustration.created),
    updated: Date.parse(productIllustration.updated),
    alt: productIllustration.alt,
    illustration: `${filePath}/${productIllustration.collectionId}/${productIllustration.id}/${productIllustration.illustration}`
  }
}
export default formatProductIllustrations