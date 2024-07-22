import BrainHouse from "../../assets/newlogofull.png";

const Main = () => {
  return (
    <main className="w-full mt-4 items-center px-4 md:px-20">
      <div className="flex flex-col md:flex-row justify-evenly mt-8">
        <div className="">
          <h2 className="text-4xl font-semibold main-text font-roboto">
            ბრეინ ჰაუსში ...
          </h2>
          <ul className=" text-xl mt-2 p-6 max-w-[550px]">
            <li className="li-item font-roboto">სწავლა ადვილია!</li>
            <li className="li-item font-roboto">
              სწავლა შესაძლებელია ნებისმიერი ქვეყნიდან, ქალაქიდან ან სოფლიდან!
            </li>
            <li className="li-item font-roboto">
              სწავლა ყველასთვის ხელმისაწვდომია!
            </li>
          </ul>
        </div>
        <img
          className="w-full h-full md:max-w-[350px] main-img rounded-lg mt-8 md:mt-0"
          src={BrainHouse}
          alt="Brain House logo"
        />
      </div>
    </main>
  );
};

export default Main;
