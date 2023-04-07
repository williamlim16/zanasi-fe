import { useEffect, useState } from "react"

export function useWindow () {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(()=> {
    if(typeof window !== "undefined"){
      if(window.innerWidth >= 768){
        setIsMobile(false)
      }else {
        setIsMobile(true)
      }
    }
  }, [])
  return {
    isMobile
  }
}

export default useWindow