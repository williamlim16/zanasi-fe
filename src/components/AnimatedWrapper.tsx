import { ReactNode } from "react";

 type PropWrapper ={
    children: ReactNode
  }
  // Word wrapper
function AnimatedWrapper ({ children }: PropWrapper) {
  // We'll do this to prevent wrapping of words using CSS
  // eslint-disable-next-line tailwindcss/no-custom-classname
  return <span className="word-wrapper">{children}</span>;
}

export default AnimatedWrapper