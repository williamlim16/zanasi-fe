import { useState, useEffect } from "react"

type Props = {
    content: string
}
function StoryReadMore ({ content }:Props) {
  const [dynamicContent, setDynamicContent] = useState<string>(content)
  const [opened, setOpened] = useState<boolean>(false) 
  const [helper, setHelper] = useState<boolean>(false)

  useEffect(() => {
    if(content.length > 1000){
      setDynamicContent(
        content.substring(0,1000)
      )
      setOpened(false)
      setHelper(true)
    }  },[content])

  function toggleOpen () {
    setOpened(true)
    setDynamicContent(content)
  }

  function toggleHide () {
    setOpened(false)
    setDynamicContent(content.substring(0,1000))
  }
  

  return (
    <div className="p-5 text-sm md:text-base">
      <div dangerouslySetInnerHTML={{ __html: dynamicContent }} />
      {!opened && helper && 
      <div className="flex cursor-pointer justify-end" onClick={() => {toggleOpen()}}>
        Read more
      </div>
      }
      {opened && helper &&
      <div className="flex cursor-pointer justify-end" onClick={() => {toggleHide()}}>
        Hide
      </div>
      }
    </div>
  )


}
export default StoryReadMore