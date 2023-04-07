import { filePath } from '../api/server'
import { BenefitEntity, BenefitEntityResponse } from './benefit.entity'

export function formatBenefit (benefit: BenefitEntityResponse): BenefitEntity{
  return {
    id: benefit.id,
    collectionId: benefit.collectionId,
    collectionName: benefit.collectionName,
    created: Date.parse(benefit.created),
    updated: Date.parse(benefit.updated),
    title: benefit.title,
    description: benefit.description,
    logo: `${filePath}/${benefit.collectionId}/${benefit.id}/${benefit.logo}`,
  }
}

export default formatBenefit