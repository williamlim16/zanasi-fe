import { StoryEntity, StoryEntityResponse } from "../stories/story.entity"

export type SectorEntity = {
  id: string
  collectionId: string
  collectionName: string
  created: number
  updated: number
  title: string
  description: string
  briefDescription: string
  logo: string
  illustration: string
  banner: string
  stories?: StoryEntity[]
}

export type SectorEntityResponse = Omit<SectorEntity, "updated"| "created" | "stories"> & {
  updated: string
  created: string
  stories: StoryEntityResponse[]
  expand:
  {
    stories:StoryEntityResponse[]
  }
}
