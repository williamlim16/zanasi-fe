export type WorkEntity = {
  id: string
  title: string
  description: string
  updated: number
  created: number
}

export type WorkEntityResponse = Omit<WorkEntity, "updated"| "created"> & {
  updated: string
  created: string
}