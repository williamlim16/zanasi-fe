import { motion } from "framer-motion";
import Image from "next/image";

type Props ={
  title: string
  logoPath: string
  id: string
  onClick: (id: string) => void
}

function Card ({ title, logoPath, onClick,id }: Props) {

  const variant = {
    hidden: {
      opacity: 0,
      scale: 0
    },
    show: {
      opacity: 1,
      scale: 1,
    },
  }

  return(
    <motion.div
      variants={variant}>
      <motion.div whileHover={{ scale: 1.1 }} className="m-5 flex max-w-md flex-col items-center overflow-hidden  rounded-2xl bg-black hover:cursor-pointer">
        <div className="relative flex h-[20vh] w-56 content-center bg-black md:h-[25vh]" onClick={() => onClick(id)}>
          <Image src={logoPath} fill style={{ objectFit: "contain" }} alt="workwithus"/>
        </div>
        <div className="w-full bg-primary-20 py-2 px-3 text-center text-xl text-white">
          {title}
        </div>
      </motion.div>
    </motion.div>
  )
}
export default Card