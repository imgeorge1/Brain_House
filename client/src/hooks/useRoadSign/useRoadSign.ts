import { useEffect, useState } from "react";
import API from "../../utils/API";
import { Images, SignCache } from "../../types/Types";

const useRoadSign = () => {
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

  return {
    signImages,
    loading,
    setSignIn,
  };
};

export default useRoadSign;
