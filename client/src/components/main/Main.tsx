import BrainHouse from "../../assets/newlogofull.png";
import Light from "../../assets/lightbulb1.png";

const Main = () => {
  return (
    <main className="w-full mt-4 items-center px-4 md:px-20">
      <div className="flex flex-col md:flex-row justify-evenly gap-3">
        <div className="">
          <h2 className="text-4xl font-bold main-text">რა არის ბრეინ ჰაუსი?</h2>
          <p className="text-xl mt-8 max-w-[550px] main-desc">
            &nbsp; ბრეინ ჰაუსი არის სასწავლო ცენტრი, სადაც სახლიდან გაუსვლელად
            და მარტივად შეგიძლიათ უცხო ენის შესწავლა. ჩვენთან შეგიძლიათ:
            ინგლისური, რუსული, ჩინური, გერმანული და ფრანგული ენების შესწავლა!
            ბრეინ ჰაუსი გთავაზობთ საშინაო დავალებებს და ტესტებს, თქვენი უნარების
            გასაუმჯობესებლად. ბრეინ ჰაუსი დაარსდა 2021 წელს ბექა ეჯიბიშვილის
            მიერ.
          </p>
        </div>
        <img
          className="w-full h-full md:max-w-[350px] main-img"
          src={BrainHouse}
          alt="Brain House logo"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-evenly mt-8">
        <div className="">
          <h2 className="text-4xl font-bold main-text">ბრეინ ჰაუსში ...</h2>
          <ul className=" text-xl mt-2 p-6 max-w-[550px]">
            <li className="li-item">სწავლა ადვილია!</li>
            <li className="li-item">
              სწავლა შესაძლებელია ნებისმიერი ქვეყნიდან, ქალაქიდან ან სოფლიდან!
            </li>
            <li className="li-item">
              მოსწავლე შეიძლება იყოს 13-დან 60 წლამდე!
            </li>
            <li className="li-item">სწავლა ყველასთვის ხელმისაწვდომია!</li>
            <li className="li-item">
              მოსწავლეებს აქვთ საშინაო დავალებები და ტესტები!
            </li>
          </ul>
        </div>
        <img
          src={Light}
          alt="newlogo"
          className="md:max-w-[350px] h-full main-img"
        />
      </div>
    </main>
  );
};

export default Main;
