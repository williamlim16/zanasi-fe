import '@splidejs/react-splide/css';
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import Image from "next/image"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useRef } from 'react';
import { motion } from "framer-motion"
import Head from "next/head"
import { ProductEntity } from "../../src/product/product.entity"
import { getProducts, getProduct } from "../../src/product/product.service"
import BreadCrumbs from '../../src/components/BreadCrumbs';
import { BreadCrumbItem } from '../../src/breadcrumbs/breadcrumb.entity';
import useWindow from '../../src/utility/useWindow';

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProducts()
  const paths: {
    params: {
      id: string
    }
  }[] = []

  products.forEach((element) => {
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
  const product = await getProduct(param.id as string)

  return {
    props: {
      product
    },
    revalidate: 10,
  }
}

type Props = {
  product: ProductEntity
}

function ProductView({ product }: Props) {
  const applications = useRef<HTMLHeadingElement>(null)
  const benefits = useRef<HTMLHeadingElement>(null)
  const documentation = useRef<HTMLHeadingElement>(null)
  const specifications = useRef<HTMLHeadingElement>(null)

  function scrollTo(target: string) {
    if (target === 'applications' && applications.current) {
      applications.current.scrollIntoView({ behavior: 'smooth' })
    }

    if (target === 'benefits' && benefits.current) {
      benefits.current.scrollIntoView({ behavior: 'smooth' })
    }

    if (target === 'documentation' && documentation.current) {
      documentation.current.scrollIntoView({ behavior: 'smooth' })
    }

    if (target === 'specifications' && specifications.current) {
      specifications.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const breadcrumbs: BreadCrumbItem[] = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Produk",
      url: "/products",
    },
    {
      title: `${product?.title}`,
      url: `/products/${product?.id}`,
    }
  ]

  const itemA = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }
  const { isTablet } = useWindow()

  return (
    <div>
      <Head>
        <title>{`Zanasi - Produk - ${product && product.title}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!" />
        <meta property="og:title" content="Zanasi - Produk" />
        <meta property="og:type" content="website" />
      </Head>
      <BreadCrumbs data={breadcrumbs} />
      <motion.div
        className="flex flex-col items-center gap-y-4 bg-white text-black">
        <motion.div className="relative grid w-full max-w-[1264px] grid-cols-4">
          <motion.div className="absolute z-0 h-full max-h-[400px] w-full max-w-[1264px]"
            style={{
              backgroundImage: `url(${product?.banner})`,
              alignItems: "center"
            }}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          />
          <div className="col-span-3 h-[450px] xl:h-0" />
          <div className="col-span-4 flex items-center justify-center xl:col-span-1">
            {product?.productIllustrations && product.productIllustrations.length > 0 &&
              <Splide options={{
                rewind: true,
                width: isTablet ? 250 : 550,
                pagination: false,
              }} className='w-full'>
                {product?.productIllustrations?.map((productIllustration) => (
                  <SplideSlide key={productIllustration.id} className='flex items-center '>
                    <Image className='hidden xl:block' src={productIllustration?.illustration} width={500} height={500} alt="illustrations" />
                    <Image className='block xl:hidden' src={productIllustration?.illustration} width={200} height={200} alt="illustrations" />
                  </SplideSlide>
                ))}
              </Splide>
            }
          </div>
        </motion.div>

        <motion.div className="w-full max-w-[1264px]"
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1 }}
        >
          <div className=" flex flex-row flex-wrap gap-x-2 bg-black px-5 py-2 text-xs text-white xl:text-base">
            <p>{product?.title} |</p>
            <span onClick={() => { scrollTo('benefits') }} className="cursor-pointer  hover:text-primary-20">Keuntungan</span> |
            <span onClick={() => { scrollTo('applications') }} className="cursor-pointer hover:text-primary-20">Aplikasi</span> |
            <span onClick={() => { scrollTo('documentation') }} className="cursor-pointer hover:text-primary-20">Dokumentasi</span> |
            <span onClick={() => { scrollTo('specifications') }} className="cursor-pointer hover:text-primary-20">Spesifikasi</span> |
          </div>
        </motion.div>

        <div className="max-w-[1264px]">
          <div className='mx-5 lg:mx-0'>
            <motion.div className="grid grid-cols-4 items-center gap-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Image src={product?.product} width={225} height={300} alt={`product ${product?.title}`} className="col-span-4 md:col-span-1" />
              <div dangerouslySetInnerHTML={{ __html: product?.description }} className="col-span-4 md:col-span-3" />
            </motion.div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-[1264px]">
          <div className='mx-5 lg:mx-0'>
            <h2 className="text-2xl font-semibold text-primary-30" ref={benefits}>
              KEUNTUNGAN
            </h2>
            <motion.div className="mt-3 grid max-w-[1264px] grid-cols-1  gap-y-4 md:grid-cols-2"

              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: true }}
            >
              {product?.benefits?.map((benefit) => (
                <div key={benefit.id} className="flex items-center gap-x-4">
                  <Image src={benefit?.logo} width={161} height={161} alt={benefit?.title} />
                  <div>
                    <h3 className="text-lg font-bold text-primary-30">{benefit.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: benefit.description }} />
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>

        <div className="mt-8 w-full max-w-[1264px]" ref={applications}>
          <div className='mx-5 lg:mx-0'>
            <motion.h2 className="text-2xl font-semibold text-primary-30"
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: true }}
            >
              APLIKASI
            </motion.h2>
            <motion.div dangerouslySetInnerHTML={{ __html: product?.applicationDescription }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: true }}
            />
          </div>

          <div className="mt-2 flex max-w-[1264px] flex-wrap gap-4 px-3 xl:px-0">
            {product?.applications?.map((application) => (
              <Image src={application?.illustration} width={328} height={280} alt={application?.title} key={application.id} />
            ))}
          </div>
        </div>

        <div className="my-8 mx-0 w-full max-w-[1264px] md:mx-8" ref={documentation} >
          <div className='mx-5 lg:mx-0'>
            <h2 className="text-2xl font-semibold text-primary-30">
              DOKUMENTASI
            </h2>
            <div className='relative mt-3 h-96 max-w-[1264px]'>
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%"
                }}
                src={product?.documentation} width="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
          </div>
        </div>

        <div className="mb-10 w-full max-w-[1264px]" ref={specifications} >
          <div className='mx-5 lg:mx-0'>
            <h2 className="text-2xl font-semibold text-primary-30">
              SPESIFIKASI TEKNIS
            </h2>
            <motion.div className=' mt-3 grid grid-cols-1  md:grid-cols-2'
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: true }}>
              {product?.specifications?.map((specification) => (
                <motion.div variants={itemA} className='mt-3 flex flex-col' key={`${specification.id}${product.title}`}>
                  {specification.specification}
                  <hr className=' max-w-[3em] border-2 border-primary-20 drop-shadow-xl ' />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

    </div>
  )

}
export default ProductView