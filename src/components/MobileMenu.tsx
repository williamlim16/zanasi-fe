import Link from "next/link"
import { useState } from "react"
import { AiOutlineArrowDown } from "react-icons/ai"
import { motion } from "framer-motion"
import { HeaderMenu } from "../header/header.entity"
import MobileSubMenu from "./MobileSubMenu"

type Props = {
  menu: HeaderMenu
}
function MobileMenu ({ menu }: Props){

  const [isMobileSubMenuOpen, setMobileSubMenuOpen] = useState(false)

  const arrow = {
    open: { rotate: 180 },
    close: { rotate: 0 },
  }

  const submenuVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    }
  }

  return (
    <div>

      <div className="flex items-center justify-center">
        <Link
          href={menu.url}
          className="block px-3 py-2 text-base font-medium text-white "
        >
          {menu.title}
        </Link>
        {menu.children && menu.children.length > 0 ?
          (
            <motion.div animate={isMobileSubMenuOpen ? "open": "close"} variants={arrow} className="ml-auto">
              <AiOutlineArrowDown  
                className="ml-auto" 
                onClick={() => setMobileSubMenuOpen(!isMobileSubMenuOpen)}/>
            </motion.div>
          ): <div className="ml-auto" />
        }

      </div>
      {isMobileSubMenuOpen && menu.children && menu.children.length > 0 ? ( 
        <motion.div variants={submenuVariant} initial="hidden" animate={isMobileSubMenuOpen ? "show" : "hidden"}>
          <MobileSubMenu submenus={menu.children}/>
        </motion.div> ):null}
    </div>
  )
}

export default MobileMenu