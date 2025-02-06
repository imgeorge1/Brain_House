import { useState, useEffect } from "react";
import beqaImage from "../../assets/theory-info-images/beqa.png";
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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const toggleDropdown1 = () => {
    setIsDropdownOpen1((prevState) => !prevState);
  };
  const toggleDropdown2 = () => {
    setIsDropdownOpen2((prevState) => !prevState);
  };

  return (
    <div className="border-4 mt-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-roboto text-2xl text-center mb-4">ბექა ეჯიბიშვილი:</h1>
        <div className="flex justify-center w-[90%] md:w-[60%]">
          <div className="w-full mix-blend-difference text-white text-[0.52rem] 
          min-[490px]:text-[0.6rem] min-[590px]:text-[0.7rem] min-[660px]:text-[0.8rem] min-[890px]:text-[0.9rem]
          lg:text-[1rem] min-[1200px]:text-[1.2rem] 2xl:text-[1.5rem] min-[2000px]:text-[2rem]">
            <p className="my-2 font-roboto font-semibold">
              " შეიძლება ვინმემ 1 თვე მოანდომა სწავლას, ვიღაცამ 2 თვე, ან სულაც ვერ ისწავლა, მაგრამ შენ იქ
              მოხვდი, სადაც თეორიას 4 დღეში სწავლობენ ! "
            </p>
            <p className="my-2 font-roboto font-semibold">
              უნდა დაიჯერო საკუთარი თავის და რაც შეეხება კურსს, თავად დარწმუნდები მის შესაძლებლობებში,
              როდესაც გამოცდი "
            </p>
            <p className="my-2 font-roboto ">
              თეორიის ჭკვიანი პროგრამის ავტორი,  თეორიული კურსის მენტორი , 5000-ზე მეტი ჩატარებული ლექცია ;
            </p>
            <p className="my-2 font-roboto ">
              2000 - ზე მეტი წარმატებული სტუდენტი ! 
            </p>
          </div>
          <img className="w-[60%] object-cover overflow-hidden" src={beqaImage} />
        </div>
        <div className="flex justify-center items-center">
          <div className="relative flex justify-center items-center mt-4 transform translate-x-12">
            <img className="w-[30%]" src={olive} alt="Olive" />
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            text-black font-roboto text-center text-[0.5rem] min-[490px]:text-[0.8rem] min-[590px]:text-[1rem]">
              <p>შეფასება</p>
              <p>5.0</p>
            </div>
          </div>

          <h2 className="absolute font-roboto text-center text-[0.5rem] transform translate-y-12
          min-[390px]:text-[0.8rem] min-[590px]:text-[1rem] md:text-[1.3rem] lg:text-[1.5rem]">რეკომენდაციები👇</h2>
          
          <div className="relative flex justify-center items-center mt-4 transform -translate-x-12">
          <img className="w-[30%]" src={olive} alt="Olive" />
          <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          text-black font-roboto text-center text-[0.5rem] min-[490px]:text-[0.8rem] min-[590px]:text-[1rem]">
            <p>ტოპ</p>
            <p>კურსი</p>
          </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-[60%] md:w-[50%] mt-6">
          <div className="relative w-full h-56 md:h-96 rounded-lg flex items-center justify-center border 
          border-gray-300 shadow-xl shadow-[#2D2862]">
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
            className="absolute top-0 left-0 left-[-3.5rem] md:left-[-3.5rem] z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
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
            className="absolute top-0 right-0 right-[-3.5rem] md:right-[-3.5rem] z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
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




        {/* Page Expanding Dropdown */}
        <div className="mt-6 md:w-[60%]">
          <button
            onClick={toggleDropdown1}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white py-2 px-4 
            text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 
            focus:ring-indigo-500 focus:ring-offset-2 font-roboto"
          >
            კურსის შესახებ ინფორმაცია
            <svg className="pl-2" fill="#000000" width="24px" height="24px" viewBox="0 0 48 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.256 8.606c0-0.269 0.106-0.544 0.313-0.75 0.412-0.412 1.087-0.412 1.5 0l14.119 14.119 13.913-13.912c0.413-0.412 1.087-0.412 1.5 0s0.413 1.088 0 1.5l-14.663 14.669c-0.413 0.413-1.088 0.413-1.5 0l-14.869-14.869c-0.213-0.213-0.313-0.481-0.313-0.756z"></path>
            </svg>
          </button>

          {/* Expanding Text Content */}
          <div
            className={`mt-4 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out`}
            style={{
              maxHeight: isDropdownOpen1 ? '2200px' : '0', // When open, set max-height to a large value
            }}
          >
            <h1 className="font-roboto text-2xl text-center my-4">კურსის შესახებ ინფორმაცია</h1>
            <p className="my-2 font-roboto">
              🚀პირდაპირ გეტყვი, რომ ეს კურსი მხოლოდ მათთვის არის,
              ვისაც ნამდვილად სურს თეორიის შესწავლა.
            </p>
            <p className="my-2 font-roboto">👉ამ კურსის დახმარებით, 4 დღეში, შეგიძლია სრული მასალის გავლა, დაზეპირების გარეშე🎯</p>
            <p className="my-2 font-roboto">ეს არის უნიკალური პროგრამა, რომლის მეშვეობით, 2000-ზე მეტმა მოსწავლემ ჩააბარა გამოცდა🎯 </p>
            <p className="my-2 font-roboto">გაინტერესებს, რატომ აქვს კურსს ასეთი შედეგი?</p>
            <p className="my-2 font-roboto">✅სწავლობ ჩვენს ვებ გვერდზე, დისტანციურ რეჟიმში, როცა და სადაც გინდა ; </p>
            <p className="my-2 font-roboto">✅ზოგავ ძალიან დიდ დროსა და ფინანსებს ; </p>
            <p className="my-2 font-roboto">✅თეორიას სწავლობ თემების სპეციალური მიმდევრობით ; </p>
            <p className="my-2 font-roboto">✅ყოველი ლექციის შემდეგ, იწყება ტესტირება, რითიც აზუსტებ შენს ცოდნას ; </p>
            <p className="my-2 font-roboto">✅ სწავლობ, დაზეპირებისა და ზედმეტი სტრესის გარეშე და იღებ ძალიან მაგარ შედეგს ; </p>
            <p className="my-2 font-roboto">🗣️ნათქვამია, გაგონილს ნანახი სჯობიაო, ამიტომ გაძლევ შესაძლებლობას, თავად დარწმუნდე ამ ყველაფერში : </p>
            <p className="my-2 font-roboto">გადადი ბმულზე, დაესწარი კურსის პირველ, ანუ 21-ე ლექციას, სრულიად უფასოდ 👇</p>
            <a href="https://www.brainhouse.ge/tickets/21" className="text-indigo-500 my-2">21-ე ლექცია</a>
            <p className="my-2 font-roboto">👉ლექციის შემდეგ, ავტომატურად დაიწყება ტესტირება და შენი ცოდნა,  დაადასტურე ტესტირებით✅</p>
            <p className="my-2 font-roboto">✅კურსი, შეძენიდან 30 დღეა აქტიური ;</p>
            <p className="my-2 font-roboto">ნახავ, რომ ძალიან მაგარი შედეგი გექნება🎯</p>
            <p className="my-2 font-roboto">🎄 მოქმედებს -80% საახალწლო ფასდაკლება და საფასური: </p>
            <p className="my-2 font-roboto font-semibold">🎁 85 ლარს შეადგენს🎁</p>
            <p className="my-2 font-roboto">❗350 ლარის ნაცვლად❗</p>
            <p className="my-2 font-roboto">თუ დამატებითი კითხვები გექნება, დამირეკე 📞</p>
            <p className="my-2 font-roboto">🗣️ბექა ეჯიბიშვილი - 599795767</p>
            <p className="my-2 font-roboto">როდესაც კურსის შეძენას გადაწყვეტ 👇</p>
          </div>
        </div>


         {/* Page Expanding Dropdown */}
         <div className="mt-6 md:w-[60%]">
          <button
            onClick={toggleDropdown2}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white py-2 px-4 
            text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 
            focus:ring-indigo-500 focus:ring-offset-2 font-roboto"
          >
            კურსის ყიდვა
            <svg className="pl-2" fill="#000000" width="24px" height="24px" viewBox="0 0 48 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.256 8.606c0-0.269 0.106-0.544 0.313-0.75 0.412-0.412 1.087-0.412 1.5 0l14.119 14.119 13.913-13.912c0.413-0.412 1.087-0.412 1.5 0s0.413 1.088 0 1.5l-14.663 14.669c-0.413 0.413-1.088 0.413-1.5 0l-14.869-14.869c-0.213-0.213-0.313-0.481-0.313-0.756z"></path>
            </svg>
          </button>

          {/* Expanding Text Content */}
          <div
            className={`mt-4 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out`}
            style={{
              maxHeight: isDropdownOpen2 ? '2200px' : '0', // When open, set max-height to a large value
            }}
          >
           <h1 className="font-roboto text-2xl text-center my-4">კურსის ყიდვა</h1>
           <p className="my-2 font-roboto">🧠გახსენი ბრაუზერი (google chrome, opera ან რომელიმე სხვა ) </p>
           <p className="my-2 font-roboto">ბრაუზერში ჩაწერე brainhouse.ge და მარჯვნივ ნახავთ ღილაკს " შესვლა" .</p>
           <p className="my-2 font-roboto">👉გაიარეთ რეგისტრაცია, მიუთითე სწორი ინფორმაცია (მათ შორის ელ-ფოსტის მისამართი).</p>
           <p className="my-2 font-roboto">👉ამის შემდეგ, გამოვა თეთრი ფანჯარა სადაც იქნება საბანკო რეკვიზიტები მითითებული.</p>
           <p className="my-2 font-roboto">✅თანხის გადახდის შემდეგ, გადმოგვიგზავნე ჩარიცხვის სქრინი და თქვენი ელ-ფოსტის მისამართი.</p>
           <p className="my-2 font-roboto">🎯ძალიან მალე, გაგეხსნებათ კურსი .</p>
           <p className="my-2 font-roboto">აბა, დროებით !</p>
          </div>
        </div>



      </div>
    </div>
  );
};

export default TheoryInfo;
