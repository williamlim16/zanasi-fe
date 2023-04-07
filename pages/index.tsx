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
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Splide options={{ rewind: true, autoplay: true }} className='relative'>
        {banners?.map((element) =>
          (
            < SplideSlide key={element.id} className='z-10' >
              <Image width={1920} height={680} src={`${filePath}/${element.collectionId}/${element.id}/${element.banner}`} alt={element.collectionName}/>
            </ SplideSlide>
          )
        )}
      </Splide>
    </div>
  )

}

export default Home