import { useEffect } from "react";
import categoryData from "../../data/categoryData";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { useLocation } from "react-router-dom";
import { TicketsTypes } from "../../types/Types";

const TicketRoutes = ({
  setTicketData,
}: {
  setTicketData: React.Dispatch<React.SetStateAction<TicketsTypes[]>>;
}) => {
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

  return (
    <section className="flex align-center">
      <div className="flex flex-col p-3">
        <h1 className="font-bold ml-8">კატეგორიები</h1>
        <ul className="flex flex-col mt-4 gap-3 w-full max-w-[690px]">
          {categoryData.map((item) => (
            <li key={item.id} className="mt-3">
              <Link
                className={`no-underline text-white p-3 rounded-md fs-5 ${
                  item.id === categoryId ? "bg-[#230751]" : "bg-[#663aac]"
                }`}
                to={`/tickets/${item.id}`}
              >
                {item.id === 0 ? "" : item.id + "."} {item.category}{" "}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TicketRoutes;
