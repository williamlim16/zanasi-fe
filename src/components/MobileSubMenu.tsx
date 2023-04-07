import Link from "next/link"
import { HeaderMenu } from "../header/header.entity"

type Props = {
  submenus: HeaderMenu[]
}
function MobileSubMenu ({ submenus }: Props) {
  
  return (
    <div  className="flex flex-col gap-y-3 bg-primary-20 px-3 py-2 text-sm">
      {submenus.map((submenu) => (
        <div className="flex flex-col" key={submenu.title}>
          <Link href={submenu.url}>
            {submenu.title}
          </Link>
          { submenu.children && submenu.children.length > 0 &&
          submenu.children.map((child) => (
            <Link href={child.url} className="mt-3 bg-primary-10 px-3 py-1 text-xs" key={child.title}>
              {child.title}
            </Link>
          ))
          }
        </div>
      ))}
    </div>
  )

}
export default MobileSubMenu