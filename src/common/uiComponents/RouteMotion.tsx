import React, { FC } from "react";
import { motion } from "framer-motion";

interface Props {}

const RouteMotion: FC<Props> = ({ children }) => {
  return (
    <motion.div
      initial={{ y: 50 }}
      animate={{
        y: 0,
        transition: { duration: 0.8, type: "spring" },
      }}
      exit={{
        y: -500,
        transition: { duration: 0.8, type: "fade" },
      }}
    >
      {children}
    </motion.div>
  );
};

export default RouteMotion;
