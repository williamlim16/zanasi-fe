import { ClientEntity, ClientEntityResponse } from "./client.entity";
import pb from "../api/pocketbase"
import { filePath } from "../api/server";

const path = "clients"

export function formatClient (client: ClientEntityResponse): ClientEntity {
  return {
    id: client.id,
    collectionId: client.collectionId,
    collectionName: client.collectionName,
    created: Date.parse(client.created),
    updated: Date.parse(client.updated),
    title: client.title,
    logo: `${filePath}/${client.collectionId}/${client.id}/${client.logo}`,
  }
}

export async function getClients () {
  const clients = await pb.collection(path).getFullList<ClientEntityResponse>()
  const formatData = clients.map((client) => (formatClient(client)))
  return formatData
}

export default formatClient