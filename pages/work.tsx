import Image from "next/image";
import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import Head from "next/head";
import Accordion from "../src/components/Accordion";
import { WorkEntity } from "../src/work/work.entity";
import { getWorks } from "../src/work/work.service";
import BreadCrumbs from "../src/components/BreadCrumbs";
import { BreadCrumbItem } from "../src/breadcrumbs/breadcrumb.entity";

export const getStaticProps: GetStaticProps = async () => {
  const works = await getWorks()
  return {
    props: {
      works
    },
    revalidate: 10
  }
}

type Props ={
  works: WorkEntity[]
}

function Work ({ works }: Props) {

  const breadcrumbs: BreadCrumbItem[] = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Lowongan",
      url: `/work`,
    }
  ]

  return (
    <div>
      <Head>
        <title>Zanasi - Work With Us</title>
        <meta name="description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico"/>
        <meta property="og:description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!"/>
        <meta property="og:title" content="Zanasi - Lowongan"/>
        <meta property="og:type" content="website"/>
      </Head>
      <BreadCrumbs data={breadcrumbs}/>
      <div className=" flex flex-col content-center items-center justify-center bg-white ">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1 , y :0 }} transition={{ delay: 0.5 }}>
          <Image src="/static/workwithus.png" width={1264} height={400} alt="work with us"/>
        </motion.div>
        <motion.div className="mt-10 mb-5 flex w-full flex-col items-center justify-center gap-y-5 px-5 md:px-0 "
          initial={{ opacity: 0, y:15 }}
          whileInView={{ opacity: 1, y:0 }} 
          transition={{ delay:0.4 }} 
          viewport={{ once: true }}>
          {works.map((element) => <Accordion title={element.title} description={element.description} className="max-w-[1264px]" key={element.id}/>)}
        </motion.div>
      </div>
    </div>
  )
}

export default Work