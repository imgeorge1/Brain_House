import SignImages from "./SignImages";
import useRoadSign from "../../hooks/useRoadSign/useRoadSign";
import roadSignsData from "../../data/roadSignsData";

const RoadSign = () => {
  const { signImages, loading, setSignIn } = useRoadSign();

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
