import { motion } from "framer-motion";
import { Images } from "../../types/Types";

const SignImages = ({ signImages }: { signImages: Images[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex mx-auto justify-around flex-wrap gap-y-4 max-w-[1300px] p-2"
    >
      {signImages.map((signImage) => (
        <div key={signImage.id}>
          <img
            className="w-full sign-image"
            src={signImage.image}
            loading="lazy"
            alt="signs image"
          />
        </div>
      ))}
    </motion.div>
  );
};

export default SignImages;
