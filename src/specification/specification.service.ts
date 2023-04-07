import { SpecificationEntity, SpecificationEntityResponse } from "./specification.entity";

export function formatSpecification (specification: SpecificationEntityResponse): SpecificationEntity {
  return {
    id: specification.id,
    collectionId: specification.collectionId,
    collectionName: specification.collectionName,
    created:Date.parse(specification.created),
    updated:Date.parse(specification.updated),
    specification: specification.specification,
  }
}

export default formatSpecification