import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "../../index.css";
import { Navigation } from "swiper/modules";

function Slider() {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper mt-20">
      <SwiperSlide className="border-3 border-[#FDE047]">
        <div
          className="bg-cover bg-center bg-about bg-no-repeat h-screen border-5 border-black w-full"
          style={{
            filter: "blur(6px) brightness(60%)",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className=" flex flex-col gap-4 items-center ">
            <h2 className="text-5xl md:text-8xl font-bold text-[#2D2862]">
              კურსები
            </h2>
            <p className="text-1xl md:text-2xl text-[#FDE047] mt-2">
              ონლაინ კურსები
            </p>
            <button className="flex items-center justify-between w-[12rem] px-4 py-2 md:w-60 md:px-7 md:py-3 rounded-2xl bg-[#2D2862] text-xl  md:text-2xl text-white slider-button">
              გაიგეთ მეტი
              <FaArrowRight />
            </button>
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
            <h2 className="text-5xl md:text-8xl font-bold text-[#2D2862]">
              რატომ ჩვენ ?
            </h2>
            <p className="text-1xl md:text-2xl text-[#FDE047] mt-2">
              ჩვენ ვასწავლით ონლაინ, უმარტივესი მეთოდებით
            </p>
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
            <h2 className="text-5xl md:text-8xl font-bold text-[#2D2862]">
              რეგისტრაცია
            </h2>
            <p className="text-1xl md:text-2xl text-[#FDE047] mt-2">
              შეეგიძლიათ გაიაროთ რეგისტრაცია ახლა უკვე ჩვენი საიტიდან!
            </p>
            <button className="flex items-center justify-between w-[12rem] px-4 py-2 md:w-60 md:px-7 md:py-3 rounded-2xl bg-[#2D2862] md:text-2xl text-white slider-button">
              რეგისტრაცია
              <FaPenToSquare />
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;
