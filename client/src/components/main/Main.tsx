import BrainHouse from "../../assets/newlogofull.png";
import Light from "../../assets/lightbulb1.png";

const Main = () => {
  return (
    <main className="w-full mt-4 items-center px-4 md:px-20">
      <div className="flex flex-col md:flex-row justify-evenly gap-3">
        <img
          className="w-full h-full md:max-w-[550px]"
          src={BrainHouse}
          alt="Brain House logo"
        />
        <div className="">
          <h2 className="text-4xl font-bold">რა არის ბრეინ ჰაუსი?</h2>
          <p className="text-2xl mt-2 max-w-[550px]">
            &nbsp; ბრეინ ჰაუსი არის სასწავლო ცენტრი, სადაც სახლიდან გაუსვლელად
            და მარტივად შეგიძლიათ უცხო ენის შესწავლა. ჩვენთან შეგიძლიათ:
            ინგლისური, რუსული, ჩინური, გერმანული და ფრანგული ენების შესწავლა!
            ბრეინ ჰაუსი გთავაზობთ საშინაო დავალებებს და ტესტებს, თქვენი უნარების
            გასაუმჯობესებლად. ბრეინ ჰაუსი დაარსდა 2021 წელს ბექა ეჯიბიშვილის
            მიერ.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-evenly mt-8">
        <div className="">
          <h2 className="text-4xl font-bold">ბრეინ ჰაუსში ...</h2>
          <ul className="list-disc text-2xl p-6 max-w-[550px]">
            <li>სწავლა ადვილია!</li>
            <li>
              სწავლა შესაძლებელია ნებისმიერი ქვეყნიდან, ქალაქიდან ან სოფლიდან!
            </li>
            <li>მოსწავლე შეიძლება იყოს 13-დან 60 წლამდე!</li>
            <li>სწავლა ყველასთვის ხელმისაწვდომია!</li>
            <li>მოსწავლეებს აქვთ საშინაო დავალებები და ტესტები!</li>
          </ul>
        </div>
        <img src={Light} alt="newlogo" className="max-w-[500px] h-full" />
      </div>
    </main>
  );
};

export default Main;
