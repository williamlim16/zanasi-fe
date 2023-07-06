import Head from 'next/head'
import Image from "next/image";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import styles from '../styles/Home.module.css'
import getBanners from '../src/banner/banner.service';
import { BannerEntity } from '../src/banner/banner.entity';
import '@splidejs/react-splide/css';
import { filePath } from '../src/api/server';

type Props ={
  banners: BannerEntity[]
}

export async function getStaticProps () {
  const banners = await getBanners()
  return {
    props: {
      banners
    },
    revalidate: 10
  }
}

function  Home ({ banners }: Props ){
  return (
    <div className={styles.home}>
      <Head>
        <title>Zanasi</title>
        <meta name="description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico"/>
        <meta property="og:description" content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!"/>
        <meta property="og:title" content="Zanasi - Home"/>
        <meta property="og:type" content="website"/>
      </Head>
      <Splide options={{ rewind: true, autoplay: true }} className='relative'>
        {banners?.map((element) =>
          (
            < SplideSlide key={element.id} className='z-10' >
              <Image priority width={1920} height={680} src={`${filePath}/${element.collectionId}/${element.id}/${element.banner}`} alt={element.collectionName}/>
            </ SplideSlide>
          )
        )}
      </Splide>
    </div>
  )

}

export default Home
