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
    categoryNumber,
    handleChooseCategory,
    completedArray,
  } = useTicketRoutes();
  const isPaid = localStorage.getItem("paid") === "true";

  console.log(isPaid);

  return (
    <section className="flex align-center mt-28 w-full sm:w-[492px]">
      <div className="flex flex-col p-3 w-full sm:w-[492px]">
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="drivebtnparent"
        >
          <NavLink
            to="/practice"
            className="drivebtn text-sm lg:text-lg text-black font-roboto buttonBorder mt-2 mb-2 px-6 py-2 pb-2 
            rounded-3xl duration-200 hover:bg-orange-500 hover:text-white"
          >
            პრაქტიკა
          </NavLink>
          <Link
            className="drivebtn text-sm lg:text-lg text-black font-roboto buttonBorder mt-2 mb-2 px-6 py-2 pb-2 
            rounded-3xl duration-200 hover:bg-orange-500 roadSignsButtonImage"
            to="/signs"
          >
            საგზაო ნიშნები
          </Link>
          {true ? (
            <NavLink
              to="/exams"
              className="drivebtn text-sm lg:text-lg text-black font-roboto buttonBorder mt-2 mb-2 px-6 py-2 pb-2 
            rounded-3xl duration-200 hover:bg-orange-500 hover:text-white"
            >
              გამოცდა
            </NavLink>
          ) : (
            <span
              className="text-center text-sm lg:text-lg text-black font-roboto buttonBorder mt-2 mb-2 px-6 py-2 pb-2 
            rounded-3xl"
            >
              გამოცდა
            </span>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mt-6"
        >
          <h1
            onClick={() => setShow(!show)}
            className="font-bold text-xl md:text-2xl justify-left font-roboto"
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
          <ul className="w-full max-w-[690px] xl:w-[469px] font-roboto">
            {categoryData.map((item) => {
              // If isPaid is false, only render the item at index 0
              if (true) {
                return (
                  <motion.li
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 * item.index }}
                    onClick={() => handleChooseCategory(item.category)}
                    key={item.id}
                  >
                    {!completedArray.includes(item.index) ? (
                      <span className="w-full mt-2 inline-block text-white p-3 rounded-md text-lg bg-gray-300 cursor-not-allowed font-roboto">
                        ვიდეო გაგეხსნებათ შეძენის შემდეგ
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
                        {item.id + "."} {item.category}
                      </Link>
                    )}
                  </motion.li>
                );
              } else {
                return (
                  <motion.li
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * item.index }}
                    onClick={() => handleChooseCategory(item.category)}
                    key={item.id}
                  >
                    {!completedArray.includes(item.index) ? (
                      <span className="w-full mt-2 inline-block text-white p-3 rounded-md text-lg bg-gray-300 cursor-not-allowed font-roboto">
                        ვიდეო გაგეხსნებათ შეძენის შემდეგ
                      </span>
                    ) : (
                      <span
                        title={
                          item.id +
                          `  თავი გაგეხსნებათ ფასიანი პაკეტის შეძენის შემდეგ`
                        }
                        className={`w-full no-underline mt-2 inline-block text-white p-3 rounded-md text-lg font-roboto  ${
                          item.id === categoryNumber
                            ? "bg-[#230751]"
                            : "bg-[#663aac]"
                        }`}
                      >
                        {item.id + ". " + item.category}
                      </span>
                    )}
                  </motion.li>
                );
              }
            })}
          </ul>
        )}
        {!show && width < 1024 && (
          <h2 className="w-full text-white mt-5 bg-[#663aac] p-3 rounded-md text-lg font-roboto">
            {categoryNumber + ". " + categoryName}
          </h2>
        )}
      </div>
    </section>
  );
};

export default TicketRoutes;
