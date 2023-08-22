import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import Head from "next/head"
import { getTechnologies, getTechnology } from "../../src/technologies/technologies.service"
import { TechnologyEntity } from "../../src/technologies/technology.entity"
import useIndexAnimation from "../../src/sector/index/useIndexAnimation"
import Card from "../../src/components/Card"
import BreadCrumbs from "../../src/components/BreadCrumbs"
import { BreadCrumbItem } from "../../src/breadcrumbs/breadcrumb.entity"

export const getStaticPaths: GetStaticPaths = async () => {
  const technologies = await getTechnologies()
  const paths: {
    params: {
      id: string
    }
  }[] = []

  technologies.forEach((element) => {
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
  const technology = await getTechnology(param.id as string)
  return {
    props: {
      technology
    },
    revalidate: 10,
  }
}

type Props = {
  technology: TechnologyEntity
}

function TechnologyView({ technology }: Props) {
  const router = useRouter()
  function goToProduct(id: string) {
    router.push(`/products/${id}`)
  }

  const breadcrumbs: BreadCrumbItem[] = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: technology?.title,
      url: `/${technology?.id}`,
    }
  ]
  const { descriptionContainer, container } = useIndexAnimation()
  return (
    <div>
      <Head>
        <title>{`Zanasi - Teknologi -${technology && technology?.title}`}</title>
        <meta name="description" content={technology?.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:description" content={technology?.description} />
        <meta property="og:title" content="Zanasi - Teknologi" />
        <meta property="og:type" content="website" />
      </Head>
      <BreadCrumbs data={breadcrumbs} />
      <div className="flex flex-col items-center justify-center bg-white">

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Image className="max-w-full" src={technology?.banner} width={1264} height={400} alt="workwithus" />
        </motion.div>

        <div className="mx-5 mt-10 grid max-w-[1264px] grid-cols-5 items-center justify-center gap-y-7 gap-x-10 text-primary-20 md:mx-10" >
          <motion.div className="col-span-5  flex flex-col gap-y-4 md:col-span-2" >
            <motion.h2 className=" text-right font-bold text-primary-20 md:text-5xl"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >{technology?.tagline}</motion.h2>
          </motion.div>

          <motion.div className="col-span-5  md:col-span-3" variants={descriptionContainer} initial="hidden" animate="visible">
            <div className="text-left" dangerouslySetInnerHTML={{ __html: technology?.description }} />
          </motion.div>

          <div className="col-span-5 text-left text-2xl">
            Produk dengan {technology?.title}:
          </div>
          <motion.div className=" col-span-5 flex flex-wrap justify-center gap-5 " variants={container} initial="hidden"
            animate="show">
            {technology?.products?.map((product) => (
              <Card id={product.id} logoPath={product.product} onClick={() => { goToProduct(product.id) }} title={product.title} key={product.id} />
            ))}
          </motion.div>

        </div>
      </div>

    </div>
  )

}

export default TechnologyView