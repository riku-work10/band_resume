import { motion } from "framer-motion";

const IntroScreen = () => (
  <motion.div
    className="intro-screen fixed inset-0 bg-black z-50 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  >
    <h1 className="intro-logo text-white text-4xl">ハルカミライ履歴書</h1>
  </motion.div>
);

export default IntroScreen;
