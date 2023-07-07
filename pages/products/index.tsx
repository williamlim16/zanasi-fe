import Image from "next/image"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import Head from "next/head"
import Card from "../../src/components/Card"
import { getTechnologies } from "../../src/technologies/technologies.service"
import { TechnologyEntity } from "../../src/technologies/technology.entity"
import BreadCrumbs from "../../src/components/BreadCrumbs"
import { BreadCrumbItem } from "../../src/breadcrumbs/breadcrumb.entity"
import useIndexAnimation from "../../src/sector/index/useIndexAnimation"

export async function getStaticProps () {
  const technologies = await getTechnologies()
  return {
    props: {
      technologies
    },
    revalidate: 10,
  }
}

type Props ={
  technologies: TechnologyEntity[]
}

function Products ({ technologies }: Props) {

  const { container  }  = useIndexAnimation()
  const router = useRouter()
  function goToProduct (id: string){
    router.push(`/products/${id}`)
  }
  const breadcrumbs: BreadCrumbItem[] = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Produk",
      url: "/products",
    }
  ]
  return (
    <div>
      <Head>
        <title>Zanasi - Produk</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico"/>
        <meta property="og:description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!"/>
        <meta property="og:title" content="Zanasi - Produk"/>
        <meta property="og:type" content="website"/>
      </Head>
      <BreadCrumbs data={breadcrumbs}/>
      <div className="flex w-full flex-col items-center bg-white text-black">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1 , y :0 }} transition={{ delay: 0.5 }}>
          <Image src="/static/SUB_BANNER_PRODUCTS.png" width={1264} height={400} alt="Products banner"/>
        </motion.div>
        <div className="flex  w-full flex-col items-center">
          {technologies?.map((technology) => (
            <div className="mx-5 mb-5 w-full max-w-[1264px] grow md:mx-0" key={technology.id}>
              <motion.div className="mb-5 bg-black py-2 px-3 text-white"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1 ,y :0 }} 
                transition={{ delay: 0.55, duration: 0.7 }}
              >
                {technology?.title}
              </motion.div>
              <motion.div className="flex flex-wrap"
                variants={container} initial="hidden"
                animate="show"
              >
                { technology && technology.products ? technology?.products?.map((product) => (
                  <Card id={product.id} logoPath={product.product} onClick={() => goToProduct(product.id)} title={product.title} key={product.id}/>
                )): null}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Products
