import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { CertificateEntity } from '../src/certificate/certificate.entity';
import { getCertificates } from '../src/certificate/certificate.service';
import { ClientEntity } from '../src/clients/client.entity';
import { getClients } from '../src/clients/client.service';
import BreadCrumbs from '../src/components/BreadCrumbs';
import { BreadCrumbItem } from '../src/breadcrumbs/breadcrumb.entity';
import { useWindow } from '../src/utility/useWindow';

export const getStaticProps: GetStaticProps = async () => {
  const clients = await getClients();
  const certificates = await getCertificates();

  return {
    props: {
      clients,
      certificates,
    },
    revalidate: 10,
  };
};

type Props = {
  clients: ClientEntity[];
  certificates: CertificateEntity[];
};

function About({ clients, certificates }: Props) {
  const breadcrumbs: BreadCrumbItem[] = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'Tentang Kami',
      url: '/about',
    },
  ];

  const { isMobile } = useWindow();

  return (
    <div>
      <Head>
        <title>Zanasi - Tentang Kami</title>
        <meta
          name="description"
          content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
        <meta
          property="og:description"
          content="Specialization in industrial inkjet printers. This is the identity of Zanasi, an Italian industrial marker manufacturer. Visit our new website!"
        />
        <meta
          property="og:title"
          content="Zanasi - Tentang Kami"
        />
        <meta property="og:type" content="website" />
      </Head>
      <BreadCrumbs data={breadcrumbs} />
      <div className="flex flex-col items-center bg-white text-black">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Image
            priority
            src="/static/SUB_BANNER_ABOUT_US.png"
            alt="contact us"
            width={1264}
            height={400}
          />
        </motion.div>
        <div className="mx-5 mt-10 grid max-w-[1264px] grid-cols-2 gap-x-5 md:mx-0">
          <motion.div
            className=" col-span-2 flex w-full flex-col items-center justify-self-end text-right xl:col-span-1"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <h2 className="mx-6 self-end text-xl text-primary-30 xl:mx-0 xl:text-3xl">
              &quot;YOUR RIGHT IDENTIFICATION SOLUTION&quot;
            </h2>
            {!isMobile ? (
              <Image
                src="/static/IDENTIFICATION.png"
                width={250}
                height={250}
                alt="Identification"
                className="mt-5 inline"
              />
            ) : (
              <Image
                src="/static/IDENTIFICATION.png"
                width={150}
                height={150}
                alt="Identification"
                className="mt-5 mb-3 inline"
              />
            )}
          </motion.div>
          <motion.div
            className="col-span-2 mx-6 text-justify text-primary-20 xl:col-span-1 xl:mx-0"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            ZANASI adalah perusahaan Italia yang melayani
            industri manufaktur.
            <br />
            <br />
            Dibuat di Italia dalam{' '}
            <b>
              marking, coding, and product traceability.
            </b>
            <br />
            <br />
            Didirikan pada tahun 1978, teknologi ZANASI
            sepenuhnya dibuat di Italia, sebuah nilai yang
            diakui di seluruh dunia, ditentukan oleh
            keterampilan dan semangat para karyawan, staf
            yang terspesialisasi dan giat, yang menulis
            sejarah pencetakan inkjet setiap hari.
            <br />
            <br />
            Berada di lebih dari 50 negara di dunia, dengan
            salah satunya di Indonesia. PT PRINTAMA telah
            berkerja sama dengan ZANASI selama lebih dari 20
            tahun dan telah mengembangkan sayap melayani
            industry manufaktur di Indonesia. Dengan pangsa
            pasar di industri makanan dan minuman, farmasi,
            FMCG, dan bahan-bahan konstruksi; PRINTAMA
            bersama dengan ZANASI berkerja sama untuk
            melayani industry manufaktur di Indonesia.
            <br />
            <br />
            PT PRINTAMA percaya bahwa pelanggan hanya
            menginginkan yang terbaik, oleh karena itu kami
            mengintegrasikan produk kami untuk memberikan
            <b>Solusi Identifikasi yang Tepat</b> kepada
            seluruh pelanggan kami.
            <br />
            Kami juga mengetahui betapa pentingnya{' '}
            <b>layanan purna jual,</b> jadi kami memiliki
            tim teknisi handal tersertifikasi yang
            berdedikasi untuk selalu siap menyelesaikan
            semua masalah Anda.
          </motion.div>
        </div>
        <motion.div
          className="mt-5 w-full max-w-[1264px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="mx-5 lg:mx-0">
            <div className="w-full bg-black p-3 text-sm font-medium text-white md:text-xl">
              <h3>KLIEN KAMI</h3>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-5">
              {clients.map((client) => (
                <Image
                  src={client.logo}
                  width={200}
                  height={100}
                  alt={client.title}
                  key={client.id}
                />
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          className="my-5 w-full max-w-[1264px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="mx-5 lg:mx-0">
            <div className=" w-full bg-black p-3 text-sm font-medium text-white  md:text-xl">
              <h3>SERTIFIKAT</h3>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-5">
              {certificates.map((certificate) => (
                <Image
                  src={certificate.file}
                  width={200}
                  height={100}
                  alt={certificate.title}
                  key={certificate.id}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default About;
