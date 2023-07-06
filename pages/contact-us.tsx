import { GetStaticProps } from "next"
import Image from "next/image"
import { GoLocation } from "react-icons/go"
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io"
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai"
import { motion } from "framer-motion"
import Head from "next/head"
import { AboutEntity } from "../src/about/about.entity"
import getAbout from "../src/about/about.service"
import BreadCrumbs from "../src/components/BreadCrumbs"
import { BreadCrumbItem } from "../src/breadcrumbs/breadcrumb.entity"

export const getStaticProps: GetStaticProps = async () => {
  const about = await getAbout()

  return {
    props: {
      about
    },
    revalidate: 10
  }
}

type Props = {
  about: AboutEntity[]
}

function ContactUs ({ about }: Props) {

  const breadcrumbs: BreadCrumbItem[] = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Contact Us",
      url: "/contact-us",
    }
  ]

  return (
    <div>
      <Head>
        <title>Zanasi - Contact Us</title>
        <meta name="description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico"/>
        <meta property="og:description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!"/>
        <meta property="og:title" content="Zanasi - Contact Us"/>
        <meta property="og:type" content="website"/>
      </Head>
      <BreadCrumbs data={breadcrumbs}/>
      <div className="flex flex-col items-center bg-white">
        <motion.div className="flex justify-center"
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1 , y :0 }} transition={{ delay: 0.5 }}
        >
          <Image src="/static/SUB_BANNER_CONTACT_US.png"  alt="contact us" width={1264} height={400}/>
        </motion.div>
        <div className="my-10 flex h-full w-full max-w-[1264px] flex-wrap justify-center gap-x-5 px-5">
          <motion.div  className="grow"
            initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1 , x :0 }} transition={{ delay: 0.5 , duration: 0.7 }}
          > <iframe className="h-full w-full max-w-[750px]" title="map" src={process.env.googleMap} 
              allowFullScreen 
              loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </motion.div>
          <motion.div className="col-span-2  mt-5 flex max-w-md flex-col gap-y-7 gap-x-3 text-black md:col-span-1 md:mt-0"
            initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1 , x :0 }} transition={{ delay: 0.7 , duration: 0.7 }}
          >
            {about.map((element) => (
              <div key={element.id}>
                {
                  element.address && 
              <div className="mt-3 flex flex-wrap items-start gap-x-3 gap-y-2">
                <GoLocation className="rounded-md bg-gray-400 p-1 text-2xl text-white md:rounded-lg md:text-3xl"/>
                <div className="flex flex-col">
                  <h3>ADDRESS</h3>
                  <div className="text-sm md:text-base">
                    {element.address}
                  </div>
                </div>
              </div>
                }
                {
                  element.whatsapp &&
              <div className="mt-3 flex flex-wrap items-start gap-x-3  gap-y-2">
                <IoLogoWhatsapp className="rounded-md bg-gray-400 p-1 text-2xl text-white md:rounded-lg md:text-3xl"/>
                <div className="flex flex-col">
                  <h3>WHATSAPP</h3>
                  <div className="text-sm md:text-base">
                    {element.whatsapp}
                  </div>
                </div>
              </div>
                }
                {
                  element.telephone &&
              <div className=" mt-3 flex items-start gap-x-3 gap-y-2">
                <AiOutlinePhone className="rounded-md bg-gray-400 p-1 text-2xl text-white md:rounded-lg md:text-3xl"/>
                <div className="flex flex-col">
                  <h3>TELEPHONE</h3>
                  <div className="text-sm md:text-base">
                    {element.telephone}
                  </div>
                </div>
              </div>
                }
                {
                  element.email &&
              <div className=" mt-3 flex items-start gap-x-3 gap-y-2">
                <AiOutlineMail className="rounded-md bg-gray-400 p-1 text-2xl text-white md:rounded-lg md:text-3xl"/>
                <div className="flex flex-col">
                  <h3>EMAIL</h3>
                  <div className="text-sm md:text-base">
                    {element.email}
                  </div>
                </div>
              </div>
                }
                {
                  element.instagram &&
              <div className=" mt-3 flex items-start gap-x-3 gap-y-2">
                <IoLogoInstagram className="rounded-md bg-gray-400 p-1 text-2xl text-white md:rounded-lg md:text-3xl"/>
                <div className="flex flex-col">
                  <h3>INSTAGRAM</h3>
                  <div className="text-sm md:text-base">
                    {element.instagram}
                  </div>
                </div>
              </div>
                }
                <hr className="mt-7 h-0.5 bg-primary-20"/>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </div>
  )

}

export default ContactUs