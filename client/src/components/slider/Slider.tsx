import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";
import "../../index.css";

import { Navigation } from "swiper/modules";

function Slider() {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      <SwiperSlide className="border-3 border-yellow-500">
        <div
          className="bg-cover bg-center bg-about bg-no-repeat h-screen border-5 border-black w-full"
          style={{
            filter: "blur(5px) brightness(62.5%)",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center right-1/2">
          <div className=" flex flex-col gap-4 items-start ">
            <h2 className="text-8xl font-bold text-[#272559]">კურსები</h2>
            <p className="text-2xl text-yellow-300 mt-2">ონლაინ კურსები</p>
            <button className="flex items-center justify-between w-60 px-7 py-3 rounded-2xl bg-blue-700 text-2xl text-white">
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
            filter: "blur(5px) brightness(62.5%)",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className=" flex flex-col gap-5 items-center">
            <h2 className="text-7xl font-bold text-[#272559]">რატომ ჩვენ ?</h2>
            <p className="text-2xl text-yellow-300 mt-2">
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
            filter: "blur(5px) brightness(62.5%)",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className=" flex flex-col gap-5 items-center">
            <h2 className="text-8xl font-bold text-[#272559]">რეგისტრაცია</h2>
            <p className="text-2xl text-yellow-300 mt-2">
              შეეგიძლიათ გაიაროთ რეგისტრაცია ახლა უკვე ჩვენი საიტიდან!
            </p>
            <button className="flex items-center justify-between w-60 px-7 py-3 rounded-2xl bg-blue-700 text-2xl text-white ">
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
