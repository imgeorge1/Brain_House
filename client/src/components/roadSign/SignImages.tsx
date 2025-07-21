import { motion } from "framer-motion";
import { Images } from "../../types/Types";
import { useState } from "react";

const SignImages = ({ signImages }: { signImages: Images[] }) => {
  const [visibleImages, setVisibleImages] = useState(12);

  const sortedSignImages = [...signImages].sort((a, b) => {
    if (a.signID === b.signID) return a.id - b.id;
    return a.signID - b.signID;
  });

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
        {sortedSignImages.slice(0, visibleImages).map((signImage) => (
          <div key={`${signImage.signID}-${signImage.id}`}>
            <img
              className="w-full sign-image"
              src={signImage.image}
              loading="lazy"
              alt="signs image"
            />
          </div>
        ))}
      </motion.div>
      {visibleImages < sortedSignImages.length && (
        <button
          onClick={loadMoreImages}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded mx-auto block"
        >
          მეტის ნახვა
        </button>
      )}
    </>
  );
};

export default SignImages;
