
export type StoryEntity = {
  id: number
  collectionId: string
  collectionName: string
  created: number
  updated: number
  title: string
  description: string
  illustration: string
}
export type StoryEntityResponse = Omit<StoryEntity, "updated"| "created"> & {
  updated: string
  created: string
  expand: {}
}
