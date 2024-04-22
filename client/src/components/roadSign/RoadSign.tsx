import SignImages from "./SignImages";
import useRoadSign from "../../hooks/useRoadSign/useRoadSign";
import roadSignsData from "../../data/roadSignsData";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import back from "../../assets/back.png";
import { useEffect, useMemo } from "react";

const RoadSign = () => {
  const { signImages, loading, setSignIn, fetchRoadSignData } = useRoadSign();

  useEffect(() => {
    fetchRoadSignData();
  }, [fetchRoadSignData]);

  const memoizedSignImages = useMemo(
    () => <SignImages signImages={signImages} />,
    [signImages]
  );

  return (
    <div className="min-h-[800px] pt-20">
      <button className="m-3 mt-5">
        {" "}
        <Link
          to="/tickets/21"
          className="flex rounded-lg hover:bg-slate-300 duration-200"
        >
          <img src={back} width={16} alt="back" />{" "}
          <p className="px-2">დაბრუნება</p>
        </Link>
      </button>
      <ul className="flex flex-wrap mx-auto justify-center gap-8 max-w-[950px]  mb-20">
        {roadSignsData.map((signs) => (
          <motion.li
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            key={signs.id}
          >
            <button
              onClick={() => setSignIn(signs.id)}
              className="flex items-center gap-2 text-xs sm:text-sm md:text-2xl bg-slate-300 hover:bg-slate-400 focus:outline-none 
              duration-200 focus:ring focus:ring-slate-400 p-2 rounded-md"
            >
              <img src={signs.icon} alt={signs.sign} width={20} height={20} />
              <span>{signs.sign}</span>
            </button>
          </motion.li>
        ))}
      </ul>
      {loading ? (
        <p className="text-center text-2xl mt-28">Loading...</p>
      ) : (
        memoizedSignImages
      )}
    </div>
  );
};

export default RoadSign;
