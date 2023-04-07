import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineArrowDown } from "react-icons/ai"

interface Props  {
  title: string;
  description: string;
  className?: string;
}

export default function Accordion ({ title, description, className } : Props){
  const [isOpen, setOpen] = useState<boolean>(false)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    }
  }

  const arrow = {
    open: { rotate: 180 },
    close: { rotate: 0 },
  }
  return (
    <div className={`flex w-full flex-col text-black ${className}`} >
      <div className="flex items-center justify-around bg-black px-5 py-2 font-medium text-white">
        <div className="grow">{title}</div>
        <motion.div animate={isOpen ? "open": "close"} variants={arrow}>
          <AiOutlineArrowDown onClick={() => setOpen(!isOpen)}/>
        </motion.div>
      </div>
      {isOpen ?
        <motion.div variants={container} initial="hidden"
          animate="show"
          className="bg-grey px-5 py-3" >
          <div  dangerouslySetInnerHTML={{ __html: description }} />
        </motion.div>
        : null
      }
    </div>
  )

}