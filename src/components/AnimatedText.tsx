import { motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import AnimatedWrapper from "./AnimatedWrapper";

type Prop = {
  text: string
}
function AnimatedCharacters ({ text }: Prop) {
  const item = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 }
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 }
    }
  };

  const splitWords = text.split(" ");
  const words: Array<Array<string>> = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [, itemSplit] of splitWords.entries()) {
    words.push(itemSplit.split(""));
  }

  words.map((word) => word.push("\u00A0"));

  return (
    <h2>
      {words.map((word, index) => (
      // Wrap each word in the Wrapper component
        <AnimatedWrapper key={uuidv4()}>
          {words[index].flat().map((element): JSX.Element => (
            <span
              style={{
                overflow: "hidden",
                display: "inline-block"
              }}
              key={uuidv4()}
            >
              <motion.span
                style={{ display: "inline-block" }}
                variants={item}
                className="text-4xl md:text-5xl"
              >
                {element}
              </motion.span>
            </span>
          ))}
        </AnimatedWrapper>
      ))}
    </h2>
  );
}

export default AnimatedCharacters;
