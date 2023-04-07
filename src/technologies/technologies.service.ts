
import { TechnologyEntity, TechnologyEntityResponse } from "./technology.entity";
import pb from "../api/pocketbase"
import { formatProduct } from "../product/product.service";
import { filePath } from "../api/server";

const path = "technologies"

function formatTechnology (technology: TechnologyEntityResponse) {
  if (technology.expand?.products){
    return {
      id: technology.id,
      collectionId: technology.collectionId,
      collectionName: technology.collectionName,
      created: Date.parse(technology.created),
      updated: Date.parse(technology.updated),
      title: technology.title,
      tagline: technology.tagline,
      description: technology.description,
      banner: `${filePath}/${technology.collectionId}/${technology.id}/${technology.banner}`,
      logo: `${filePath}/${technology.collectionId}/${technology.id}/${technology.logo}`,
      products: technology.expand.products.map((product) => (formatProduct(product)))
    }
  }
  return {
    id: technology.id,
    collectionId: technology.collectionId,
    collectionName: technology.collectionName,
    created: Date.parse(technology.created),
    updated: Date.parse(technology.updated),
    title: technology.title,
    tagline: technology.tagline,
    banner: `${filePath}/${technology.collectionId}/${technology.id}/${technology.banner}`,
    logo: `${filePath}/${technology.collectionId}/${technology.id}/${technology.logo}`,
    description: technology.description
  }
}


export const getTechnologies = async ()  => {
  const technologies = await pb.collection(path).getFullList<TechnologyEntityResponse>({
    expand: 'products'
  })
  const formatData: TechnologyEntity[] = technologies.map((technology) => (formatTechnology(technology)))
  return formatData
}

export const getTechnology = async (id: string) => {
  const technology = await pb.collection(path).getOne<TechnologyEntityResponse>(id,{
    expand: 'products'
  })
  return formatTechnology(technology)
}