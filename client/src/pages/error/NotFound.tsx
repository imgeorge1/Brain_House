import { Link } from "react-router-dom";
import back from "../../assets/back.png";

const NotFound = () => {
  return (
    <div className="text-center mt-40 mb-96 md:mb-20">
      <h2 className="text-[44px] font-thin errorpage-oops mb-6">Oops!</h2>
      <h1 className="text-[64px] font-black errorpage-404 my-8">
        404 Page Not Found
      </h1>
      <p className="text-[18px] errorpage-text mb-5">
        გვერდი, რომელსაც თქვენ ეძებთ, ვერ მოიძებნა.
        <br />
      </p>
      <Link to="/" className="justify-center flex text-[18px]">
        <a>
          <span className="errorpage-link">
            <p className="gap-2 flex">
              <img src={back} width={20} alt="back" />
              მთავარ გვერდზე დაბრუნება
            </p>
          </span>
          {/* <span className="text-[25px]">
            <img src={back} width={16} alt="back" />
          </span> */}
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
