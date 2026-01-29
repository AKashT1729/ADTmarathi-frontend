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
import AdminContacts from "./pages/AdminContacts";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="pb-20 min-h-screen flex flex-col overflow-x-hidden"> {/* Add bottom padding for footer */}
        <Navbar />
        <div className="flex-1">
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
            <Route path="/admin/contacts" element={<AdminContacts />} />
            <Route path="/forgot-password" element={<ChangePassword />}/>
            {/* Add other routes here */}
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
