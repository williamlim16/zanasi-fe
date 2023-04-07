import { WorkEntity, WorkEntityResponse } from "./work.entity";
import api from "../api/server"
import pb from "../api/pocketbase"

const path = "works"

export const getWorks = async (): Promise<WorkEntity[]> => {

  const works = await pb.collection(path).getFullList<WorkEntityResponse>()
  const formatData = works.map((work) => ({
    ...work,
    updated: Date.parse(work.updated),
    created: Date.parse(work.created)
  }))
  return formatData
}

export const getWork = async (id: string): Promise<WorkEntity> => {
  const res = await fetch(`${api}/${path}/${id}`)
  return res.json()
}
