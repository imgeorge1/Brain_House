import { motion } from "framer-motion";
import { TicketTypes } from "../../types/Types";

const Ticket = ({
  data,
  clickedAnswers,
  handleButtonClick,
  getAnswerClass,
}: TicketTypes) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="flex flex-col bg-[#230751] items-center mt-16 rounded-lg w-full !scale-[1.07]"
      key={data.id}
    >
      <div className="w-full md:w-[790px] md:h-[680px]">
        <img
          loading="lazy"
          src={data.image}
          alt={`drive ticket image ${data.id}`}
          className="w-full h-full rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://via.placeholder.com/500x300.png?text=Image+Not+Available";
          }}
        />
      </div>
      <div className="flex gap-3 py-3">
        {Array.from(
          { length: data.quantityAnswer },
          (_, index) => index + 1
        ).map((item) => (
          <button
            className={`p-5 text-2xl font-bold rounded-md ${
              clickedAnswers[data.id] !== undefined
                ? ""
                : "lg:hover:bg-blue-400"
            } lg:transition-all ${getAnswerClass(data.id, item)}`}
            key={item}
            onClick={() => handleButtonClick(data.id, item)}
          >
            {item}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default Ticket;
