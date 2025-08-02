import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import MarketRates from "./pages/MarketRates";
import BlogPost from "./pages/BlogPost";
import Home from "./pages/Home";
import SingleBlog from "./pages/SingleBlog";
import LogIn from "./pages/LogIn";
import ChangePassword from "./pages/ChangePassword";
import NewPost from "./pages/NewPost";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/contact', '/marketrates', '/blogpost'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname.toLowerCase());

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/"   element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/marketrates" element={<MarketRates />} />
        <Route path="/blogpost" element={<BlogPost />} />
        <Route path="/blog" element={<BlogPost />} />
        <Route path="/singleblog" element={<SingleBlog />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin" element={<LogIn />} />
        <Route path="/admin/new-post" element={<NewPost />} />
        <Route path="/forgot-password" element={<ChangePassword />}/>
        {/* Add other routes here */}
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
