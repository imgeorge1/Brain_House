import { Link } from "react-router-dom";
function BuyCourse() {
  return (
    <div className="border-4 mt-20 ">
      <h1 className="text-2xl text-center font-bold py-6 pb-2">კურსის შესახებ</h1>
      <iframe
        className="w-full max-w-4xl mx-auto h-[280px] md:h-[460px] my-2 border border-slate-300 
        border-solid rounded-sm"
        title="Video for sign in"
        src={
          "https://drive.google.com/file/d/1-TExdbkIyWgbS1jlgLawaANMqM7bkWZF/preview"
        }
        sandbox="allow-same-origin allow-scripts"
        allowFullScreen
      />
      <div className="mx-auto max-w-4xl">
        <p className="py-1">  
          🧠გახსენით ბრაუზერი (google chrome, opera ან რომელიმე სხვა ) 
        </p>
        <p className="py-1">
          ბრაუზერში ჩაწერეთ <span><Link to="https://www.brainhouse.ge/" target="_blank" className="course-info-link py-1 underline">brainhouse.ge</Link></span> და მარჯვნივ ნახავთ ღილაკს " შესვლა" .
        </p>
        <p className="py-1">
          👉გაიარეთ რეგისტრაცია, მიუთითეთ სწორი ინფორმაცია (მათ შორის ელ-ფოსტის მისამართი).
        </p>
        <p className="py-1">
        👉ამის შემდეგ, გამოვა თეთრი ფანჯარა სადაც იქნება საბანკო რეკვიზიტები მითითებული.
        </p>
        <p className="py-1">
        ✅თანხის გადახდის შემდეგ, გადმოგვიგზავნეთ ჩარიცხვის სქრინი და თქვენი ელ-ფოსტის მისამართი.
        </p>
        <p className="py-1">
        🎯ძალიან მალე, გაგეხსნებათ კურსი 💖
        </p>
        {/* <Link to="https://www.brainhouse.ge/tickets/21" target="_blank" className="course-info-link py-1 underline">https://www.brainhouse.ge/tickets/21</Link> */}
        
      </div>
    </div>
  );
}

export default BuyCourse;
