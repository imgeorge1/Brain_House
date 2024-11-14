
import { Link } from "react-router-dom";
function CourseInfo() {
  return (
    <div className="border-4 mt-20 ">
      <h1 className="text-2xl text-center font-bold py-6 pb-2">კურსის შესახებ</h1>
      <iframe
        className="w-full max-w-4xl mx-auto h-[280px] md:h-[460px] my-2 border border-slate-300 
        border-solid rounded-sm"
        title="Video for sign in"
        src={
          "https://drive.google.com/file/d/1InmxVMYkEjoXuZAtPbUNjhzDkqg2mWtR/preview"
        }
        sandbox="allow-same-origin allow-scripts"
        allowFullScreen
      />
      <div className="px-4 py-2 md:px-24">
        <p className="py-1">
          🚦 ჩვენი უნიკალური კურსი მიმდინარეობს brainhouse.ge-ზე🧠 რომლის მეშვეობით, დისტანციურ რეჟიმში სწავლობთ თეორიას (B;B1)
        </p>
        <p className="py-1">
        სულ რაღაც 4 დღეში (ჩვენი მოსწავლეთა გამოცდილებით) შეგიძლია თეორიის შესწავლა ყოველგვარი დაზეპირების გარეშე🎯
        </p>
        <p className="py-1">
        მომდევნო აქციის ფარგლებში, კურსის საფასური 350 ლარის ნაცვლად
        </p>
        <p className="py-1  font-bold">
        ❗შეადგენს 85 ლარს🎁❗
        </p>
        <p className="py-1">
        გაინტერესებს, რატომ არის კურსი ეფექტური ? 
        </p>
        <ul className="info-list">
          <li>ზოგავ დროს, ფინანსებს და უფრთხილდები ნერვებს;</li>
          <li>ვიდეო ლექციებს ესწრები როცა გინდა და სადაც გინდა;</li>
          <li>ყველა ვიდეო ლექციის შემდეგ, ავტომატურად იწყება ტესტირება და მომდევნო თემაზე გადასასვლელად, აუცილებელია წარმატებით ჩახურო წინა თემა;</li>
          <li>ინახება შენი პროგრესი და იქედან აგრძელებ მეცადინეობას, სადაც შეწყვიტე;</li>
          <li>რამდენიმე დღეში, სრულად სწავლობ თეორიას დაზეპირების გარეშე;</li>
        </ul>
        <p className="py-1">
        🤔 მაინც დაუჯერებელია ? 
        </p>
        <p className="py-1">
        👉იმისთვის, რომ დარწმუნდე მის უნიკალურობაში, შეგიძლია დაესწრო პირველ ვიდეო ლექციას უფასოდ და შემდეგ გააკეთო ამ თემის ტესტები.
        </p>
        <p className="py-1">
        👉გადადი ბმულზე, დაელოდე რამდენიმე წამი და შენს წინაშე 21 თემა გამოჩნდება 👇
        </p>
        <Link to="https://www.brainhouse.ge/tickets/21" target="_blank" className="course-info-link py-1 underline">https://www.brainhouse.ge/tickets/21</Link>
        <p className="py-1">
        ვიდეო-ლექციის შემდეგ, გააკეთეთ ამ თემის ტესტები და ნახავთ, რომ ძალიან მარტივია 🎯
        </p>
        <p className="py-1">
        კურსზე წვდომა გაქვს, შეძენიდან 30 დღის განმავლობაში.
        </p>
        <p className="py-1">
        📞კონსულტაციისთვის შეგიძლია დაუკავშირდე თეორიული კურსის მენტორს: 
        🗣️ბექა ეჯიბიშვილს : 599795767;
        </p>
        <p className="py-1">
        🎯როდესაც გადაწყვეტთ კურსის შეძენას, მოგვწერეთ და გადმოგიგზავნით სარეგისტრაციო ინფორმაციას❤️
        </p>
      </div>
    </div>
  );
}

export default CourseInfo;
