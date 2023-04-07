function useIndexAnimation () {
  const container = {
    hidden: {  },
    show: {
      transition: {
        delay: 1,
        duration: 0.75,
        staggerChildren: 0.5,
        delayChildren: 1,
      },
    },
  }

  const descriptionContainer={
    hidden:{
      opacity: 0,
      y:100,
    },
    visible: {
      opacity: 1,
      y:0,
      transition:{
        delay:1.3,
        duration:0.75
      }
    }
  }

  const textContainer={
    visible: {
      transition: {
        staggerChildren: 0.025
      }
    }
  }

  const placeholderText = [
    {  text: "WE WANT TO TELL" },
    { text: "ABOUT OURSELVES" },
    {  text: "THROUGH OUR" },
    {  text: "EXPERIENCES" }
  ];
  return {
    container, descriptionContainer, textContainer, placeholderText
  }

}
export default useIndexAnimation