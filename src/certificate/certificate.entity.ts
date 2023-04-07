export type CertificateEntity = {
  id: string
  collectionId: string
  collectionName: string
  created: number
  updated: number
  title: string
  file: string
}

export type CertificateEntityResponse = Omit<CertificateEntity, "updated"| "created"> & {
  updated: string
  created: string
}