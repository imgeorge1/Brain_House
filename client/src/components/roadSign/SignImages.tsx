import { motion } from "framer-motion";
import { Images } from "../../types/Types";

const SignImages = ({ signImages }: { signImages: Images[] }) => {
  console.log(signImages);

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex mx-auto justify-between flex-wrap gap-y-4 max-w-[1300px]"
    >
      {signImages.map((signImage) => (
        <div key={signImage.id}>
          <img
            className="w-full"
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
