import Practice from "../../components/practice/Practice";
import { useUserContext } from "../../context/UserContext";

const PracticePage = () => {
  const { currentUser, booleanPaid } = useUserContext();
  return (
    <>
      {(currentUser?.email === "b.ejibishvili1@gmail.com" && booleanPaid) ||
      (currentUser?.email === "shvangiradze22giorgi@gmail.com" &&
        booleanPaid) ||
      (currentUser?.email === "ubitoz133@gmail.com" && booleanPaid) ? (
        <Practice />
      ) : (
        <p className="text-3xl my-80 text-red-600 font-bold text-center">
          პრაქტიკა გამოჩნდება ფასიანი პაკეტის შეძენის შემდეგ
        </p>
      )}
    </>
  );
};

export default PracticePage;
