import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { ParsedUrlQuery } from "querystring"
import { motion } from "framer-motion";
import Head from "next/head";
import { SectorEntity } from "../../src/sector/sector.entity"
import { getSector, getSectors } from "../../src/sector/sector.service"
import StoryCardDisplay from "../../src/stories/components/StoryCardDisplay";
import BreadCrumbs from "../../src/components/BreadCrumbs";
import { BreadCrumbItem } from "../../src/breadcrumbs/breadcrumb.entity";

export const getStaticPaths: GetStaticPaths = async () => {
  const sectors = await getSectors()
  const paths: {
    params: {
      id: string
    }
  }[] = []

  sectors.forEach((element) => {
    const obj = {
      params: {
        id: element.id.toString()
      }
    }
    paths.push({ ...obj })
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const param = params as ParsedUrlQuery
  const sector = await getSector(param.id as string)
  return {
    props: {
      sector
    },
    revalidate: 10,
  }
}

type Props = {
  sector: SectorEntity
}

function SectorView({ sector }: Props) {

  const breadcrumbs: BreadCrumbItem[] = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Sektor Industri",
      url: "/sectors",
    },
    {
      title: `${sector?.title}`,
      url: `/sectors/${sector?.id}`,
    }
  ]

  return (
    <div>
      <Head>
        <title>{`Zanasi - Sektor - ${sector && sector.title}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!" />
        <meta property="og:title" content="Zanasi - Sektor" />
        <meta property="og:type" content="website" />
      </Head>
      <BreadCrumbs data={breadcrumbs} />
      <div className="flex items-center justify-center bg-white">
        <div className="mx-5 mb-10 grid max-w-[1264px] grid-cols-5 items-center justify-center gap-y-5 gap-x-10 md:mx-10" >
          <motion.div className="col-span-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}>
            <Image className="max-w-full" src={sector?.banner} width={1264} height={400} alt="workwithus" />
          </motion.div>

          <motion.div className="col-span-5 text-black" dangerouslySetInnerHTML={{ __html: sector?.briefDescription }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}

          />
          <motion.div className="col-span-3 md:col-span-1"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}>
            <Image src={sector?.illustration} width={350} height={350} style={{ objectFit: "contain" }} alt="workwithus" />
          </motion.div>

          <motion.div className="col-span-4 text-black md:col-span-4"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}>
            <div className="text-left" dangerouslySetInnerHTML={{ __html: sector?.description }} />
          </motion.div>
          {
            (sector && sector.stories) ?
              <StoryCardDisplay stories={sector.stories} /> : null
          }
        </div>
      </div>
    </div>
  )

}
export default SectorView