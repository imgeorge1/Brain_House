import { useEffect, useState } from "react";
import roadSignsData from "../../data/roadSignsData";
import API from "../../utils/API";
import SignImages from "./SignImages";
import { Images, SignCache } from "../../types/Types";

const RoadSign = () => {
  const [signId, setSignIn] = useState(1);
  const [signImages, setSignImages] = useState<Images[]>([]);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState<SignCache>({});

  useEffect(() => {
    const fetchSigns = async () => {
      setLoading(true);
      try {
        if (cache[signId]) {
          // If data is cached, set it from cache
          setSignImages(cache[signId]);
        } else {
          // If data is not cached, fetch from API
          const res = await API.get(`/signs/${signId}`);
          setSignImages(res.data);
          // Update cache
          setCache({ ...cache, [signId]: res.data });
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchSigns();
  }, [signId, cache]);

  return (
    <div className="min-h-[800px]">
      <ul className="flex flex-wrap mx-auto justify-center gap-8 max-w-[950px] mt-32 mb-20">
        {roadSignsData.map((signs) => (
          <li key={signs.id}>
            <button
              onClick={() => setSignIn(signs.id)}
              className="flex items-center gap-2 text-2xl bg-slate-300 hover:bg-slate-400 focus:outline-none 
              duration-200 focus:ring focus:ring-slate-400 p-2 rounded-md"
            >
              <img src={signs.icon} alt={signs.sign} width={20} height={20} />
              <span>{signs.sign}</span>
            </button>
          </li>
        ))}
      </ul>
      {loading ? (
        <p className="text-center text-2xl mt-28">Loading...</p>
      ) : (
        <SignImages signImages={signImages} />
      )}
    </div>
  );
};

export default RoadSign;
