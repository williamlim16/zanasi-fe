import { useEffect, useState } from "react"

export function useWindow () {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  useEffect(()=> {
    if(typeof window !== "undefined"){
      if(window.innerWidth > 1280){
        setIsMobile(false)
        setIsTablet(false)
      }else if (window.innerWidth >=768 && window.innerWidth <= 1280) {
        setIsTablet(true)
        setIsMobile(false)
      }else {
        setIsMobile(true)
      }
    }
  }, [])
  return {
    isMobile,
    isTablet
  }
}

export default useWindow