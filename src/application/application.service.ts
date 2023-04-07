import { filePath } from "../api/server"
import { ApplicationEntity, ApplicationEntityResponse } from "./application.entity"
import pb from "../api/pocketbase"

const path = "applications"

export function formatApplication (application: ApplicationEntityResponse): ApplicationEntity {
  return {
    id: application.id,
    collectionId: application.collectionId,
    collectionName: application.collectionName,
    created: Date.parse(application.created),
    updated: Date.parse(application.updated),
    title: application.title,
    illustration: `${filePath}/${application.collectionId}/${application.id}/${application.illustration}`
  }
}

export const getApplications = async (): Promise<ApplicationEntity[]> => {
  const products = await pb.collection(path).getFullList<ApplicationEntityResponse>()
  const formatData: ApplicationEntity[] = products.map((application) => (formatApplication(application)))
  return formatData
}