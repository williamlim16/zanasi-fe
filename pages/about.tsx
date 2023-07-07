import { GetStaticProps } from "next"
import Image from "next/image"
import { motion } from "framer-motion"
import Head from "next/head"
import { CertificateEntity } from "../src/certificate/certificate.entity"
import { getCertificates } from "../src/certificate/certificate.service"
import { ClientEntity } from "../src/clients/client.entity"
import { getClients } from "../src/clients/client.service"
import BreadCrumbs from "../src/components/BreadCrumbs"
import { BreadCrumbItem } from "../src/breadcrumbs/breadcrumb.entity"
import { useWindow } from "../src/utility/useWindow"

export const getStaticProps: GetStaticProps = async () => {
  const clients = await getClients()
  const certificates = await getCertificates()

  return {
    props: {
      clients,
      certificates
    },
    revalidate: 10
  }
}

type Props = {
  clients: ClientEntity[]
  certificates: CertificateEntity[]
}

function About ({ clients, certificates }: Props) {
  const breadcrumbs: BreadCrumbItem[] = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Tentang Kami",
      url: "/about",
    }
  ]

  const { isMobile }  = useWindow()

  return (
    <div>
      <Head>
        <title>Zanasi - Tentang Kami</title>
        <meta name="description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico"/>
        <meta property="og:description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!"/>
        <meta property="og:title" content="Zanasi - Tentang Kami"/>
        <meta property="og:type" content="website"/>
      </Head>
      <BreadCrumbs data={breadcrumbs}/>
      <div className="flex flex-col items-center bg-white text-black">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1 , y :0 }} 
          transition={{ delay: 0.5 }}>
          <Image priority src="/static/SUB_BANNER_ABOUT_US.png"  alt="contact us" width={1264} height={400}/>
        </motion.div>
        <div className="mx-5 mt-10 grid max-w-[1264px] grid-cols-2 gap-x-5 md:mx-0">
          <motion.div className=" col-span-2 justify-self-end text-right md:col-span-1" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1 , x :0 }} transition={{ delay: 0.8, duration: 1 }}>
            <h2 className="text-xl text-primary-30 md:text-3xl">&quot;YOUR RIGHT IDENTIFICATION SOLUTION&quot;</h2>
            {!isMobile ? 
              <Image src="/static/IDENTIFICATION.png" width={350} height={350} alt="Identification" className="mt-5 inline"/>:
              <Image src="/static/IDENTIFICATION.png" width={200} height={200} alt="Identification" className="mt-5 mb-3 inline"/>
            }
          </motion.div>
          <motion.div className="col-span-2 text-primary-20 md:col-span-1" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1 , x :0 }} transition={{ delay: 1.2, duration: 0.5 }}>
      PT. Printama Sukses has been growing since its establishment in 1997. Our head office in Indonesia is located in Jakarta, with a branch located in Surabaya to handle East of Indonesia, and another branch in Semarang to handle Central Java. With a total of around 150 employees, we are dedicated to provide both our principals and customers the finest service and support.
        We have been trusted as the sole distributor of Zanasi S.R.L Industrial Inkjet Printing System from Italy.
        We are also authorized distributor and partners of:<br/>
        Datamax - O&apos;neil, USA - Barcode Printers <br/>
        Intermec Honeywell, USA – Barcode Printers, Barcode Scanners, Mobile Computers <br/>
        Motorola Solutions, USA – Mobile Computers, Barcode Scanners, Access Points <br/>
        Armor Thermal Transfer Ribbon, France – Thermal Transfer Ribbons <br/>
        We also provide Inks, Hot Foil, Labels, and Thermal Papers. <br/>
        Sustaining a good and beneficial relationship with our principals has been one of our key foundations. Their continuous supports have kept PT. Printama Sukses in running smoothly.
        We believe that customers would only want the best, which is why we integrate our products to provide customers with the Right Identification Solution. We also know the importance of after-sales service and commitment; so, we have a dedicated team of capable technicians that will always ready to solve all your problems.
        Our customers mainly falls in industrial-manufacturer category such as Mondelez, Mayora, Charoen Pokphan Indonesia, Mulia Ceramic Group, Eternit, Phapros, Medifarma, Eka Hospital, Mitra Kemayoran Hospital, Propan Raya, ICI Paint, AETRA and many others.
          </motion.div>
        </div>
        <motion.div className="mt-5 w-full max-w-[1264px]" 
          initial={{ opacity: 0, y:15 }}
          whileInView={{ opacity: 1, y:0 }} 
          transition={{ delay:0.4 }} 
          viewport={{ once: true }}
        >
          <div className='mx-5 lg:mx-0'>
            <div className="w-full bg-black p-3 text-sm font-medium text-white md:text-xl">
              <h3>OUR CLIENTS</h3>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-5">
              {clients.map((client) => (
                <Image src={client.logo} width={200} height={100} alt={client.title} key={client.id}/>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="my-5 w-full max-w-[1264px]"
          initial={{ opacity: 0, y:15 }}
          whileInView={{ opacity: 1, y:0 }} 
          transition={{ delay:0.4 }} 
          viewport={{ once: true }}>
          <div className='mx-5 lg:mx-0'>
            <div className=" w-full bg-black p-3 text-sm font-medium text-white  md:text-xl">
              <h3>CERTIFICATES</h3>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-5">
              {certificates.map((certificate) => (
                <Image src={certificate.file} width={200} height={100} alt={certificate.title} key={certificate.id}/>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
export default About