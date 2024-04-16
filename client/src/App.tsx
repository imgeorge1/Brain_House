import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import { Suspense, lazy } from "react";

const TicketsLazy = lazy(() => import("./pages/tickets/Tickets"));
const ExamsLazy = lazy(() => import("./pages/exams/Exams"));
const RoadSignsLazy = lazy(() => import("./pages/roadSigns/RoadSigns"));
const DashboardLazy = lazy(() => import("./pages/dashboard/Dashboard"));
const NotFoundLazy = lazy(() => import("./pages/error/NotFound"));

const App = () => {
  return (
    <>
      <Header />
      <Suspense
        fallback={<h1 className="text-3xl text-center mt-40">Loading...</h1>}
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
