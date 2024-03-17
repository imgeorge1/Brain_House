import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Courses from "./pages/courses/Courses";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/error/NotFound";
import Tickets from "./pages/tickets/Tickets";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<Courses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tickets/:id" element={<Tickets />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
