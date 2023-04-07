
import pb from "../api/pocketbase"
import { filePath } from "../api/server";
import { CertificateEntity, CertificateEntityResponse } from "./certificate.entity";

const path = "certificates"

export function formatCertificate (certificate: CertificateEntityResponse): CertificateEntity {
  return {
    id: certificate.id,
    collectionId: certificate.collectionId,
    collectionName: certificate.collectionName,
    created: Date.parse(certificate.created),
    updated: Date.parse(certificate.updated),
    title: certificate.title,
    file: `${filePath}/${certificate.collectionId}/${certificate.id}/${certificate.file}`,
  }
}

export async function getCertificates () {
  const certificates = await pb.collection(path).getFullList<CertificateEntityResponse>()
  const formatData = certificates.map((certificate) => (formatCertificate(certificate)))
  return formatData
}

export default formatCertificate