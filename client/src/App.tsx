import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/error/NotFound";
import Tickets from "./pages/tickets/Tickets";
import Exams from "./pages/exams/Exams";
import RoadSigns from "./pages/roadSigns/RoadSigns";
import { useEffect, useState } from "react";

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Set loading to true when the route changes
    setLoading(true);
    // Set loading to false when the content has finished loading
    setLoading(false);
  }, [location]);

  return (
    <>
      <Header />
      {loading ? (
        <h1 className="text-3xl text-center mt-30">Loading...</h1>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tickets/:id" element={<Tickets />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/signs" element={<RoadSigns />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <Footer />
    </>
  );
};

export default App;
