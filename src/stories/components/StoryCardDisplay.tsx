import Image from "next/image"
// import {  useState } from "react"
import { StoryEntity } from "../story.entity"
import StoryReadMore from "./StoryReadMore"

type Props = {
    stories: StoryEntity[]
}

function StoryCardDisplay ({ stories }: Props) {

  return (
    <div className="col-span-5 flex flex-col gap-y-10  text-white">
      {stories && stories.map((element) => (
        <div className="grid grid-cols-3  justify-center  gap-x-10 overflow-hidden rounded-2xl border-8 border-primary-20 bg-primary-20" key={element.id}>
          <div className="col-span-3 flex  w-full items-center justify-center bg-white p-5 md:col-span-1">
            <Image src={ element.illustration} width={250} height={250}  alt="workwithus" className="flex-none"/>
          </div>
          <div className="col-span-3  md:col-span-2">
            <StoryReadMore content={element.description}/>
          </div>
        </div>
      ))}
    </div>
  )
}
export default StoryCardDisplay