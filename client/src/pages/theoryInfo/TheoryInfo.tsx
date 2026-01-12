import { useState, useEffect } from "react";
import olive from "../../assets/theory-info-images/olive.png";
import comment1 from "../../assets/theory-info-images/comment (1).jpeg";
import comment2 from "../../assets/theory-info-images/comment (2).jpeg";
import comment3 from "../../assets/theory-info-images/comment (3).jpeg";
import comment4 from "../../assets/theory-info-images/comment (4).jpeg";
import comment5 from "../../assets/theory-info-images/comment (5).jpeg";
import comment6 from "../../assets/theory-info-images/comment (6).jpeg";
import comment7 from "../../assets/theory-info-images/comment (7).jpeg";
import comment8 from "../../assets/theory-info-images/comment (8).jpeg";
import comment9 from "../../assets/theory-info-images/comment (9).jpeg";
import comment10 from "../../assets/theory-info-images/comment (10).jpeg";
import comment11 from "../../assets/theory-info-images/comment (11).jpeg";

const TheoryInfo = () => {
  const images = [
    comment1,
    comment2,
    comment3,
    comment4,
    comment5,
    comment6,
    comment7,
    comment8,
    comment9,
    comment10,
    comment11,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };


  return (
    <div className="border-4 mt-20">
 
      <div className="flex flex-col justify-center items-center">
       
       <div className="rounded-2xl pt-6 px-10 m-4 w-[90%] md:w-[80%] text-[0.6rem] min-[490px]:text-[0.85rem] min-[590px]:text-[1rem] font-roboto leading-relaxed space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-[#2D2862] mb-2">
          🧠თეორიის ჭკვიანი კურსის დახმარებით, თეორიას 4 დღეში სწავლობ, ონლაინ რეჟიმში🎯
        </h2>
        <p>🚦ჭკვიანი კურსის დახმარებით, <strong>თეორიას სწავლობ 4 დღეში</strong>, მარტივად, ონლაინ რეჟიმში და დაზეპირების გარეშე🎯</p>
        <p>
✅4 დღე ესწრები, ცოცხალ, ინტერაქციულ ლექციებს ონლაინ რეჟიმში და შენ, მენტორთან ერთად ხარ ჩართული, თემების ახსნისა და ტესტირების პროცესში, რაც <strong>დაზეპირებას გამორიცხავს;</strong> </p>
        <p>✅+30 დღით გიაქტიურდება ჩვენი სასწავლო პლატფორმა,<strong> განახლებული ტესტები და ვიდეო წიგნი</strong>, სადაც დავალებებს აკეთებ და ნებისმიერ დროს სწავლობ;</p>

        <p>💥<strong>სწავლობ, ზედმეტი დროისა და ფინანსების დახარჯვის გარეშე</strong>, არ გჭირდება ზედმეტი წიგნები და კონსპექტები, რადგან ყველაფერს ჭკვიანი კურსი მოიცავს; </p>
        <p>🧠ჭკვიანი კურსი მიმდინარეობს <strong> 1+4 დღიანი სასწავლო ფორმატით</strong>, სადაც პირველი სალექციო დღე, ეთმობა საგზაო ნიშნებისა და საწყისი თემების განხილვას, ხოლო მომდევნო 4 შეხვედრა, ძირითად თემებს;</p>
        <p className="text-lg font-bold text-green-600">
          🎉 კურსის ფასი: 95₾ <span className="line-through text-gray-500 text-sm">130₾</span>
        </p>

        <p>
          სანამ კურსზე დარეგისტრირდები, იქამდე გადახედე მოსწავლეთა შედეგებსა და რეკომენდაციებს.
          <br />
          👉ასევე, კურსზე რეგისტრაციამდე, შეგიძლია <strong>21-ე ლექციის ვიდეო გაკვეთილს</strong>  დაესწრო, ახსნის მეთოდიკასაც გაეცნო და შემდეგ ტესტებს უპასუხო 👇
        </p>

        <p className="text-blue-500 underline"><a href="https://www.brainhouse.ge/tickets/21">https://www.brainhouse.ge/tickets/21</a></p>

        <p className="font-semibold text-pink-600">📩კურსზე რეგისტრაციას რომ გადაწყვეტ მოგვწერე და სარეგისტრაციო ინფორმაციასაც გადმოგიგზავნით💖</p>
      </div>


        <div className="flex justify-center items-center">
          <div className="relative flex justify-center items-center mt-4 transform translate-x-12">
            <img className="w-[30%]" src={olive} alt="Olive" />
            <div
              className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            text-black font-roboto text-center text-[0.5rem] min-[490px]:text-[0.8rem] min-[590px]:text-[1rem]"
            >
              <p>შეფასება</p>
              <p>5.0</p>
            </div>
          </div>

          <h2
            className="absolute font-roboto text-center text-[0.5rem] transform translate-y-12
          min-[390px]:text-[0.8rem] min-[590px]:text-[1rem] md:text-[1.3rem] lg:text-[1.5rem]"
          >
            რეკომენდაციები👇
          </h2>

          <div className="relative flex justify-center items-center mt-4 transform -translate-x-12">
            <img className="w-[30%]" src={olive} alt="Olive" />
            <div
              className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          text-black font-roboto text-center text-[0.5rem] min-[490px]:text-[0.8rem] min-[590px]:text-[1rem]"
            >
              <p>ტოპ</p>
              <p>კურსი</p>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-[70%] md:w-[50%] mt-6">
          <div
            className="relative w-full h-56 md:h-96 rounded-lg flex items-center justify-center border 
          border-gray-300 shadow-xl shadow-[#2D2862]"
          >
            <img
              src={images[currentIndex]}
              alt={`carousel-item-${currentIndex}`}
              className="w-full h-auto max-h-full object-contain "
            />
          </div>
          {/* Slider controls */}
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute top-0 left-[-3.5rem] z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#2D2862]">
              <svg
                className="w-4 h-4 text-white dark:text-gray-200 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute top-0 right-[-3.5rem] z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#2D2862]">
              <svg
                className="w-4 h-4 text-white dark:text-gray-200 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>

        <div className="flex justify-center items-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#2D2862]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>


      </div>
    </div>
  );
};

export default TheoryInfo;
