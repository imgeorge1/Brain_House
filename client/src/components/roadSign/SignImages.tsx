import { motion } from "framer-motion";
import { Images } from "../../types/Types";
import { useState } from "react";

const SignImages = ({ signImages }: { signImages: Images[] }) => {
  const [visibleImages, setVisibleImages] = useState(12);

  const loadMoreImages = () => {
    setVisibleImages((prevVisibleImages) => prevVisibleImages + 12);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex mx-auto justify-around flex-wrap gap-y-4 max-w-[1300px] p-2"
      >
        {signImages.slice(0, visibleImages).map((signImage) => (
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
      {visibleImages < signImages.length && (
        <button
          onClick={loadMoreImages}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded mx-auto block"
        >
          Load More
        </button>
      )}
    </>
  );
};

export default SignImages;
