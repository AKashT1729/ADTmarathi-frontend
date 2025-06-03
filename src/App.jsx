import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import MarketRates from "./pages/MarketRates";
import BlogPost from "./pages/BlogPost";

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/contact', '/marketrates', '/blogpost'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/marketrates" element={<MarketRates />} />
        <Route path="/blogpost" element={<BlogPost />} />
        {/* Add other routes here */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
