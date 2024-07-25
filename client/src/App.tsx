import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Brain from "./assets/brain.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/about/About";
import Payment from "./pages/payment/Payment";
import Policy from "./pages/policy/Policy";
import PracticePage from "./pages/practice/PracticePage";
// import Updates from "./pages/updates/Update";

const TicketsLazy = lazy(() => import("./pages/tickets/Tickets"));
const ExamsLazy = lazy(() => import("./pages/exams/Exams"));
const RoadSignsLazy = lazy(() => import("./pages/roadSigns/RoadSigns"));
const DashboardLazy = lazy(() => import("./pages/dashboard/Dashboard"));
const NotFoundLazy = lazy(() => import("./pages/error/NotFound"));

const App = () => {
  return (
    <>
      {/* <Navigate to={"/updates"} /> */}
      <Header />
      <ToastContainer />
      <Suspense
        fallback={
          <img
            className="w-32 h-32 animate-bounce mt-44 mx-auto"
            src={Brain}
            alt="brain logo"
          />
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/tickets/:id" element={<TicketsLazy />} />
          <Route path="/tickets/:id" element={<TicketsLazy />} />
          <Route path="/dashboard" element={<DashboardLazy />} />
          <Route path="/exams" element={<ExamsLazy />} />
          <Route path="/signs" element={<RoadSignsLazy />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="*" element={<NotFoundLazy />} />
          {/* <Route path="/updates" element={<Updates />} /> */}
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
