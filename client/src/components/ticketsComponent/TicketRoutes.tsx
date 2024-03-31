import { Link } from "react-router-dom";
import category from "../../assets/category.png";
import { motion } from "framer-motion";
import useTicketRoutes from "../../hooks/useTicketRoutes/useTicketRoutes";

const TicketRoutes = () => {
  const {
    show,
    setShow,
    categoryName,
    width,
    categoryId,
    handleChooseCategory,
    categoryData,
  } = useTicketRoutes();

  return (
    <section className="flex align-center ">
      <div className="flex flex-col p-3">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <h1 className="font-bold text-3xl mb-4 mt-28">კატეგორიები</h1>
          <button onClick={() => setShow(!show)}>
            {width < 1024 && (
              <img src={category} alt="category icon" width={22} height={22} />
            )}
          </button>
        </motion.div>
        {(show || width >= 1024) && (
          <ul className="pl-0 w-full max-w-[690px]">
            {categoryData.map((item) => (
              <motion.li
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * item.id }}
                onClick={() => handleChooseCategory(item.category)}
                key={item.id}
              >
                <Link
                  className={`w-full no-underline mt-2 inline-block text-white p-3 rounded-md text-lg ${
                    item.id === categoryId ? "bg-[#230751]" : "bg-[#663aac]"
                  }`}
                  to={`/tickets/${item.id}`}
                >
                  {item.id === 0 ? "" : item.id + "."} {item.category}{" "}
                </Link>
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

export default TicketRoutes;
