import categoryData from "../../data/categoryData";
import { Link, NavLink } from "react-router-dom";
import category from "../../assets/category.png";
import useTicketRoutes from "../../hooks/useTicketRoutes/useTicketRoutes";
import { motion } from "framer-motion";

const TicketRoutes = () => {
  const {
    show,
    setShow,
    categoryName,
    width,
    categoryId,
    categoryNumber,
    handleChooseCategory,
    completedArray,
  } = useTicketRoutes();

  return (
    <section className="flex align-center mt-24">
      <div className="flex flex-col p-3">
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="drivebtnparent"
        >
          <Link
            className="drivebtn text-sm lg:text-lg text-black font-roboto buttonBorder mt-2 mb-2 px-6 py-2 pb-2 
            rounded-3xl duration-200 hover:bg-orange-500 roadSignsButtonImage"
            to="/signs"
          >
            საგზაო ნიშნები
          </Link>
          <NavLink
            to="/exams"
            className="drivebtn text-sm lg:text-lg text-black font-roboto buttonBorder mt-2 mb-2 px-6 py-2 pb-2 
            rounded-3xl duration-200 hover:bg-orange-500 hover:text-white"
          >
            გამოცდა
          </NavLink>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mt-6"
        >
          <h1
            onClick={() => setShow(!show)}
            className="font-bold text-2xl md:text-3xl mb-4"
          >
            კატეგორიები
            <button>
              {width < 1024 && (
                <img
                  src={category}
                  alt="category icon"
                  width={17}
                  height={17}
                  className="ml-1 md:w-22 md:h-22 md:ml-2"
                />
              )}
            </button>
          </h1>
        </motion.div>
        {(show || width >= 1024) && (
          <ul className="pl-0 w-full max-w-[690px]">
            {categoryData.map((item) => (
              <motion.li
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * item.index }}
                onClick={() => handleChooseCategory(item.category)}
                key={item.id}
              >
                {!completedArray.includes(item.index) ? (
                  <span className="w-full mt-2 inline-block text-white p-3 rounded-md text-lg bg-gray-300 cursor-not-allowed">
                    {item.id + "."} {item.category}{" "}
                  </span>
                ) : (
                  <Link
                    className={`w-full no-underline mt-2 inline-block text-white p-3 rounded-md text-lg ${
                      item.id === categoryNumber
                        ? "bg-[#230751]"
                        : "bg-[#663aac]"
                    }`}
                    to={`/tickets/${item.id}`}
                    state={item.index}
                  >
                    {item.id + "."} {item.category}{" "}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        )}
        {!show && width < 1024 && (
          <h2 className="w-full text-white mt-5 bg-[#663aac] p-3 rounded-md text-lg">
            {categoryId + ". " + categoryName}
          </h2>
        )}
      </div>
    </section>
  );
};

export default TicketRoutes;
