import pb from "../api/pocketbase"
import { AboutEntity, AboutEntityResponse } from "./about.entity"

const path = "about"

function formatAbout (about: AboutEntityResponse): AboutEntity{
  return {
    id: about.id,
    collectionId: about.collectionId,
    collectionName: about.collectionName,
    created: Date.parse(about.created),
    updated: Date.parse(about.updated),
    whatsapp: about.whatsapp,
    telephone: about.telephone,
    email: about.email,
    instagram: about.instagram,
    address: about.address,
  }
}

export default async function getAbout () {
  const res = await pb.collection(path).getFullList<AboutEntityResponse>()
  const formatData = res.map((about: AboutEntityResponse) => (formatAbout(about)))
  return formatData
}
