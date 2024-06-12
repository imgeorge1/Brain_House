import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Brain from "./assets/brain.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicketsLazy = lazy(() => import("./pages/tickets/Tickets"));
const ExamsLazy = lazy(() => import("./pages/exams/Exams"));
const RoadSignsLazy = lazy(() => import("./pages/roadSigns/RoadSigns"));
const DashboardLazy = lazy(() => import("./pages/dashboard/Dashboard"));
const NotFoundLazy = lazy(() => import("./pages/error/NotFound"));

const App = () => {
  return (
    <>
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
          <Route path="/register" element={<Register />} />
          <Route path="/tickets/:id" element={<TicketsLazy />} />
          <Route path="/dashboard" element={<DashboardLazy />} />
          <Route path="/exams" element={<ExamsLazy />} />
          <Route path="/signs" element={<RoadSignsLazy />} />
          <Route path="*" element={<NotFoundLazy />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
