import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "../../index.css";
import { Navigation } from "swiper/modules";

function Slider() {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="mySwiper mt-20 cursor-grab"
    >
      <SwiperSlide className="border-3 border-[#FDE047]">
        <div
          className="bg-cover bg-center bg-about bg-no-repeat h-screen border-5 border-black w-full"
          style={{
            filter: "blur(6px) brightness(60%)",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className=" flex flex-col gap-4 items-center ">
            <h2 className="text-5xl md:text-8xl font-semibold text-[#2D2862] font-roboto">
              მართვის ბარათი
            </h2>
            <p className="text-1xl md:text-2xl text-[#FDE047] mt-2 font-roboto">
              მართვის მოწმობის გაკვეთილები
            </p>
            <a href="/tickets/21">
              <button className="font-roboto flex items-center justify-between w-[12rem] px-4 py-2 md:w-60 md:px-7 md:py-3 rounded-2xl bg-[#2D2862] text-xl  md:text-2xl text-white slider-button">
                გაიგეთ მეტი
                <FaArrowRight />
              </button>
            </a>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        {" "}
        <div
          className="bg-cover bg-center bg-aboutus bg-no-repeat h-screen w-full"
          style={{
            filter: "blur(6px) brightness(60%)",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className=" flex flex-col gap-5 items-center">
            <h2 className="text-4xl md:text-8xl font-semibold text-[#2D2862] font-roboto">
              რატომ ჩვენ?
            </h2>
            <p className="text-1xl md:text-2xl text-[#FDE047] mt-2 font-roboto">
              ჩვენ ვასწავლით ონლაინ, უმარტივესი მეთოდებით
            </p>
            <a href="/about">
              <button className="font-roboto flex items-center justify-between w-[12rem] px-4 py-2 md:w-60 md:px-7 md:py-3 rounded-2xl bg-[#2D2862] text-xl  md:text-2xl text-white slider-button">
                გაიგეთ მეტი
                <FaArrowRight />
              </button>
            </a>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <div
          className="bg-cover bg-center bg-contact bg-no-repeat h-screen w-full"
          style={{
            filter: "blur(6px) brightness(60%)",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className=" flex flex-col gap-5 items-center">
            <h2 className="text-4xl md:text-8xl font-semibold text-[#2D2862] font-roboto">
              რეგისტრაცია
            </h2>
            <p className="text-lg md:text-2xl text-[#FDE047] mt-2 font-roboto">
              ახლა რეგისტრაცია ჩვენი საიტიდან შეგიძლიათ!
            </p>
            <a href="/register">
              <button className="font-roboto flex items-center justify-between w-[12rem] px-4 py-2 md:w-60 md:px-6 md:py-3 rounded-2xl bg-[#2D2862] md:text-2xl text-white slider-button">
                რეგისტრაცია
                <FaPenToSquare />
              </button>
            </a>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;
