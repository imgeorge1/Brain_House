import categoryData2 from "../../data/categoryData2";
import { Link } from "react-router-dom";
import category from "../../assets/category.png";
import useWidth from "../../hooks/useWidth/useWidth";
import { motion } from "framer-motion";
import useCategoryData from "../../hooks/useCategoryData/useCategoryData";

const Course = ({ completed }: { completed: number[] }) => {
  const { show, setShow, categoryName, categoryId, handleChooseCategory } =
    useCategoryData();
  const width = useWidth();

  return (
    <section className="flex align-center mt-32">
      <div className="flex flex-col p-3">
        <Link className="text-xl text-yellow-600" to="/signs">
          საგზაო ნიშნები
        </Link>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <h1 className="font-bold text-3xl mb-4 ">კატეგორიები</h1>
          <button onClick={() => setShow(!show)}>
            {width < 1024 && (
              <img src={category} alt="category icon" width={22} height={22} />
            )}
          </button>
        </motion.div>
        {(show || width >= 1024) && (
          <ul className="pl-0 w-full max-w-[690px]">
            {categoryData2.map((item) => (
              <motion.li
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * item.index }}
                onClick={() => handleChooseCategory(item.category)}
                key={item.id}
              >
                {!completed.includes(item.index) ? (
                  <span className="w-full mt-2 inline-block text-white p-3 rounded-md text-lg bg-gray-300 cursor-not-allowed">
                    {item.id === 0 ? "" : item.id + "."} {item.category}{" "}
                  </span>
                ) : (
                  <Link
                    state={item.index}
                    className={`w-full no-underline mt-2 inline-block text-white p-3 rounded-md text-lg ${
                      item.id === categoryId ? "bg-[#230751]" : "bg-[#663aac]"
                    }`}
                    to={`/courses/${item.id}`}
                  >
                    {item.id === 0 ? "" : item.id + "."} {item.category}{" "}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        )}
        {!show && width < 1024 && (
          <h2 className="text-2xl text-[#230751] mt-5">{categoryName}</h2>
        )}
      </div>
    </section>
  );
};

export default Course;
