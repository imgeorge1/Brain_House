import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mt-40 mb-60 text-center"
    >
      <h1 className="text-4xl font-bold pt-28 pb-16">
        თქვენ წარმატებით გაიარეთ რეგისტაცია!
      </h1>
      <Link
        to="/"
        className="text-xl font-semibold bg-black text-white p-2 rounded-md"
      >
        დაბრუნდი მთავარზე
      </Link>
    </motion.div>
  );
};

export default Success;
