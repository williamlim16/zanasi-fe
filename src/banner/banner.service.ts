import { BannerEntity } from "./banner.entity";
import pb from "../api/pocketbase"

const path = "banners"

export default  async function getBanners () {
  const res = await pb.collection(path).getFullList<BannerEntity>() 
  const formatData = res.map((banner) => ({ ...banner, created: Date.parse(banner.created), updated: Date.parse(banner.updated) })) 
  return formatData
}