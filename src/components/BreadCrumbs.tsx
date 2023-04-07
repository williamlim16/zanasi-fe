/* eslint-disable react/no-array-index-key */
import Link from "next/link"
import { BreadCrumbItem } from "../breadcrumbs/breadcrumb.entity"

type Props = {
  data: BreadCrumbItem[]
}
function BreadCrumbs ({ data }: Props) {
  return (
    <div className="flex w-full items-center justify-center gap-x-7 bg-primary-20 text-sm md:text-base">
      <div className="flex w-full max-w-[1264px] gap-x-3 px-3 py-2">
        {data.map((breadcrumb, index) => (
          <div className="flex gap-x-2 " key={index}>
            <Link href={breadcrumb.url} className="hover:text-black">
              {breadcrumb.title} 
            </Link>  
            |
          </div>
        ))}
      </div>
    </div>
  )

}

export default BreadCrumbs