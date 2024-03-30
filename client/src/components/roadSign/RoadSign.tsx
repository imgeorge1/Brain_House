import roadSignsData from "../../data/roadSignsData";

const RoadSign = () => {
  return (
    <ul className="flex flex-wrap mx-auto justify-center gap-8 max-w-[950px] mt-10 mb-20">
      {roadSignsData.map((signs) => (
        <li key={signs.id}>
          <button className="flex items-center gap-2 text-2xl bg-slate-300 p-2 rounded-md">
            <img src={signs.icon} alt={signs.sign} width={20} height={20} />
            <span>{signs.sign}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RoadSign;
