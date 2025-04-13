import { useState } from "react";
import API from "../../utils/API";
import { Images, SignCache } from "../../types/Types";
import axios from "axios";

const useRoadSign = () => {
  const [signId, setSignIn] = useState(1);
  const [signImages, setSignImages] = useState<Images[]>([]);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState<SignCache>({});

  const fetchRoadSignData = async () => {
    setLoading(true);
    try {
      if (cache[signId]) {
        // If data is cached, set it from cache
        setSignImages(cache[signId]);
      } else {
        // If data is not cached, fetch from API
        const res = await axios.get(`/signs/${signId}`, {
          withCredentials: true,
        });
        setSignImages(res.data);
        // Update cache
        setCache({ ...cache, [signId]: res.data });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return {
    signImages,
    loading,
    setSignIn,
    fetchRoadSignData,
  };
};

export default useRoadSign;
