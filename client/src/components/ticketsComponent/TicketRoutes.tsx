import { useEffect, useState } from "react";
import categoryData from "../../data/categoryData";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { useLocation } from "react-router-dom";
import { TicketsTypes } from "../../types/Types";
import category from "../../assets/category.png";
import useWidth from "../../hooks/useWidth";

const TicketRoutes = ({
  setTicketData,
}: {
  setTicketData: React.Dispatch<React.SetStateAction<TicketsTypes[]>>;
}) => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("ყველა");
  const width = useWidth();
  const location = useLocation();

  const categoryId = parseInt(location.pathname.split("/")[2]);
  useEffect(() => {
    const getCategories = async (categoryId: number) => {
      try {
        const response = await API.get(`/tickets/${categoryId}`);
        setTicketData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCategories(categoryId);
  }, [categoryId, setTicketData]);

  const handleChooseCategory = (category: string) => {
    setShow(!show);
    setCategoryName(category);
  };

  return (
    <section className="flex align-center ">
      <div className="flex flex-col p-3">
        <div className="flex items-center gap-2">
          <h1 className="font-bold">კატეგორიები</h1>
          <button onClick={() => setShow(!show)}>
            {width < 1024 && (
              <img src={category} alt="category icon" width={22} height={22} />
            )}
          </button>
        </div>
        {(show || width >= 1024) && (
          <ul className="pl-0 w-full max-w-[690px]">
            {categoryData.map((item) => (
              <li
                onClick={() => handleChooseCategory(item.category)}
                key={item.id}
              >
                <Link
                  className={`no-underline mt-2 inline-block text-white p-3 rounded-md text-lg ${
                    item.id === categoryId ? "bg-[#230751]" : "bg-[#663aac]"
                  }`}
                  to={`/tickets/${item.id}`}
                >
                  {item.id === 0 ? "" : item.id + "."} {item.category}{" "}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!show && width < 1024 && (
          <h2 className="text-2xl text-[#230751] mt-5">{categoryName}</h2>
        )}
      </div>
    </section>
  );
};

export default TicketRoutes;
