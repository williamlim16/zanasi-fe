import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import AnimatedText from "../../src/components/AnimatedText";
import Card from "../../src/components/Card";
import { SectorEntity } from "../../src/sector/sector.entity";
import { getSectors } from "../../src/sector/sector.service";
import useIndexAnimation from "../../src/sector/index/useIndexAnimation";
import BreadCrumbs from "../../src/components/BreadCrumbs";
import { BreadCrumbItem } from "../../src/breadcrumbs/breadcrumb.entity";

export async function getStaticProps () {
  const sectors = await getSectors()
  return {
    props: {
      sectors
    }
  }
}

type Props ={
  sectors: SectorEntity[]
}

function Sectors ({ sectors }: Props) {
  const { container, descriptionContainer, textContainer , placeholderText }  = useIndexAnimation()
  const router = useRouter()

  function goToSector (id: string){
    router.push(`/sectors/${id}`)
  }

  const breadcrumbs: BreadCrumbItem[] = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Sectors",
      url: "/sectors",
    }
  ]

  return (
    <div>
      <Head>
        <title>Zanasi - Sektor</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico"/>
        <meta property="og:description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!"/>
        <meta property="og:title" content="Zanasi - Sektor"/>
        <meta property="og:type" content="website"/>
      </Head>
      <BreadCrumbs data={breadcrumbs}/>
      <div className=" flex flex-col content-center items-center justify-center gap-y-10 bg-white" >
        <motion.div className="relative  flex content-center " 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1 , y :0 }} transition={{ delay: 0.5 }}
        >
          <Image src="/static/SUB_BANNER_SECTORS.png" width={1264} height={400} alt="workwithus"/>
        </motion.div>
        <div className="mx-5 flex flex-wrap items-center justify-center gap-x-10 md:gap-x-5">
          <motion.div className="  text-right text-5xl text-primary-20" variants={textContainer} initial="hidden" animate="visible">
            {placeholderText.map((item) => <AnimatedText text={item.text} key={item.text}/>)}
          </motion.div>
          <motion.div className="max-w-lg text-black" variants={descriptionContainer} initial="hidden" animate="visible">
            A wide range of marking systems for coding in accordance with the requirements, able to adapt to the different processes, types of packaging, production environments, regulations and environmental conditions of the various sectors. The internal skills and realibility of Zanasi systems ensure total traceability of the product and of the packaging, both primary and secondary
          </motion.div>
        </div>
        <motion.div className=" flex max-w-[1264px] flex-wrap justify-center  gap-5" variants={container} initial="hidden"
          animate="show">
          {sectors.map((sector) => (
            <Card id={sector.id} title={sector.title} logoPath={sector.logo} key={sector.title} onClick={(id) => goToSector(id)}/>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Sectors