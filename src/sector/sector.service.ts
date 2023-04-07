import { SectorEntity, SectorEntityResponse } from "./sector.entity"
import pb from "../api/pocketbase"
import { filePath } from "../api/server";
import { formatStory } from "../stories/story.service";

const path = "sectors"

function formatSector (sector: SectorEntityResponse):SectorEntity {
  let fixedFields:SectorEntity = {
    id: sector.id,
    collectionId: sector.collectionId,
    collectionName: sector.collectionName,
    title: sector.title,
    description: sector.description,
    briefDescription: sector.briefDescription,
    created: Date.parse(sector.created),
    updated: Date.parse(sector.updated),
    logo: `${filePath}/${sector.collectionId}/${sector.id}/${sector.logo}`,
    illustration: `${filePath}/${sector.collectionId}/${sector.id}/${sector.illustration}`,
    banner: `${filePath}/${sector.collectionId}/${sector.id}/${sector.banner}`,
  }

  if(sector.expand.stories && sector.expand.stories.length > 0){
    fixedFields = {
      ...fixedFields,
      stories: sector.expand.stories.map((story) => (formatStory(story)))
    }
  }

  return fixedFields

}

export const getSectors = async () => {
  const sectors = await pb.collection(path).getFullList<SectorEntityResponse>()
  const formatData: SectorEntity[] = sectors.map((sector) => (formatSector(sector)))
  return formatData
}

export const getSector = async (id: string): Promise<SectorEntity> => {
  const sector = await pb.collection(path).getOne<SectorEntityResponse>(id, {
    expand: 'stories'
  })
  const formatData: SectorEntity = formatSector(sector)
  return formatData
}

