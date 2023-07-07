import { useQuery } from "react-query"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi"
import { motion } from "framer-motion";
import { getSectors } from "../../sector/sector.service";
import { SectorEntity } from "../../sector/sector.entity";
import { getTechnologies } from "../../technologies/technologies.service";
import { TechnologyEntity } from "../../technologies/technology.entity";
import { HeaderMenu } from "../../header/header.entity";
import MobileMenu from "../MobileMenu";
import getAbout from "../../about/about.service";
import { AboutEntity } from "../../about/about.entity";

interface Props {
  children: JSX.Element
}

function HeaderFooterLayout ({ children } : Props) {
  const { data: sectors } = useQuery<SectorEntity[], Error>('sectors', getSectors)
  const { data: technologies } = useQuery<TechnologyEntity[], Error>('technologies', getTechnologies)
  const { data: about } = useQuery<AboutEntity[], Error>('about', getAbout)
  const [isMobileOpen, setMobileOpen] = useState(true)

  const variants = {
    open: { opacity: 1, x: 0, height: "auto" },
    closed: { opacity: 0, x: "-100%", height: 0 },
  }

  const [header, setHeader] = useState<HeaderMenu[]>([
    {
      title: "COMPANY",
      url: "/",
      children: [
        { 
          title: "About Us",
          url: "/about" 
        },
        { 
          title: "Work With Us",
          url: "/work" 
        },
      ]
    },
    {
      title: "SEKTOR",
      url: "/sectors",
      children: []
    },
    {
      title: "PRODUK",
      url: "/products",
      children: []
    },
    {
      title: "KONTAK",
      url: "/contact-us",
      children: []
    }
  ])

  useEffect(() => {
    setHeader((prev) => {
      const newArray = [...prev]
      newArray.forEach((element,index) => {
        if(element.title === 'SEKTOR'){
          newArray[index] = {
            title: "SEKTOR",
            url: "/sectors",
            children: sectors?.map((sector) => ({
              title: sector.title,
              url: `/sectors/${sector.id}`
            }))
          }
        }
        
        if(element.title === 'PRODUK'){
          newArray[index]  = {
            title: "PRODUK",
            url: "/products",
            children: technologies?.map((technology) => ({
              title: technology.title,
              url:`/technologies/${technology.id}`,
              children: technology.products ? technology.products.map((product) => (
                {
                  title: product.title,
                  url: `/products/${product.id}`
                }
              )): []
            }))
          }
        }

        if(element.title === 'KONTAK' && about && about[0].address){
          newArray[index]  = {
            title: "KONTAK",
            url: "/contact-us",
            children: [
              {
                title:  about[0].address,
                url: "/contact-us"
              },
              {
                title:  about[0].telephone,
                url: "/contact-us"
              },
              {
                title:  about[0].instagram,
                url: "/contact-us"
              },
              {
                title: about[0].email,
                url: "/contact-us"
              }
            ]
          }
        }
      }
      )
      return newArray
    })
  },[about, sectors, technologies])


  return (
    <div>
      <nav className=" bg-primary-10">
        {/* Desktop View */}
        <div className="hidden bg-black md:block">
          <div className="flex  w-full items-center justify-center">
            <div className="flex w-full max-w-[1264px] items-center">
              <Link href="/"  className="shrink-0">
                <Image
                  src="/static/logo.png"
                  alt="Workflow"
                  width={200}
                  height={44}
                />
              </Link>
              <div className="ml-auto  hidden h-36 items-center justify-center md:flex">
                <ul className="flex gap-y-4 text-sm font-medium">
                  {header.map((element) => (
                    <li className="group/parent relative flex h-36 w-40 cursor-pointer items-center justify-center text-xl text-white hover:text-primary-20" key={element.title}>
                      <Link
                        href={element.url}
                      >
                        {element.title}
                      </Link>
                      {element.children && element.title !== "KONTAK" ? 
                        ( 
                          <div className="absolute top-36 left-0 z-50  hidden bg-primary-20 text-base transition-colors  duration-300 ease-in-out group-hover/parent:block">
                            <ul className="z-20 flex flex-col items-center justify-center text-white">
                              {element.children.map((child) => (
                                <div className="group/child relative" key={child.title} >
                                  <Link href={child.url} className="flex h-16 w-60 cursor-pointer items-center justify-start px-10 text-left hover:bg-primary-10">
                                    {child.title}
                                  </Link>
                                  {child.children ? (
                                    <div className="absolute top-0 left-60 hidden group-hover/child:block">
                                      <ul className="z-20 flex  flex-col items-center justify-center ">
                                        {child.children.map((child2) => (
                                          <Link href={child2.url} className="flex h-16 w-40 cursor-pointer items-center justify-center bg-primary-20 hover:bg-primary-10" key={child2.title}>
                                            {child2.title}
                                          </Link>
                                        ))}
                                      </ul>
                                    </div>
                                  ): null}
                                </div>
                              ))}
                            </ul>
                          </div>
                        ): null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center bg-gray-800 p-2 text-gray-400 hover:bg-primary-20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        {/* Mobile View */}
        <div className=" md:hidden" id="mobile-menu">
          <div  className="flex items-center justify-center px-5 pt-5">
            <Link href="/">
              <Image
                src="/static/logo.png"
                alt="Workflow"
                width={133}
                height={30}
              />
            </Link>
            <GiHamburgerMenu className="ml-auto" onClick={() => {setMobileOpen((prev) => !prev)}}/>
          </div>
          <motion.div className="space-y-1 px-4 py-3 sm:px-3" variants={variants} animate={isMobileOpen ? "open" : "closed"} transition={{
            ease: "easeInOut",
            duration: 0.5,
          }}>
            {header.map((element) => (
              <MobileMenu menu={element} key={`${element.title}mobile`}/>
            ))}
          </motion.div>
        </div>
      </nav>
      <div className="h-2 bg-red-700" />
      <div>
        {children}
      </div>
      <div className="h-2 bg-red-700" />
      <div className="flex items-center justify-center bg-black py-7">
        <div className="grid w-full max-w-[1264px]  grid-cols-4 justify-center ">
          {header.map((head) => (
            <div key={`${head.title}footer`} className=" col-span-4 mt-10 flex flex-col gap-1 px-8 text-white md:col-span-1 md:gap-0">
              <Link href={head.url}> {head.title}</Link>
              {head.children && head.children.length > 0 &&
                head.children.map((child) => (
                  <Link className="mt-3" href={child.url} key={`${child.title}footer`}>{child.title}</Link>
                ))
              }
            </div>
          ))}
        </div>
      </div>
    </div>
    
  )
}

export default HeaderFooterLayout