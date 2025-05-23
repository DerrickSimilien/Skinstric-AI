import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Introduction from "./Pages/Introduction";
import './index.css';
import Location from "./Pages/Location";
import Nationality from "./Pages/Nationality";
import Submission from "./Pages/Submission";
import Loading from "./Pages/Loading";
import ImageUpload from "./Pages/ImageUpload";
import CameraPage from "./Pages/CameraPage";
import CameraError from "./Pages/CameraError";

const AppWrapper = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const hideNavbarRoutes = ["/camera"];
    setShowNavbar(!hideNavbarRoutes.includes(location.pathname));
  }, [location]);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/location" element={<Location />} />
        <Route path="/nationality" element={<Nationality />} />
        <Route path="/submission" element={<Submission />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/image-upload" element={<ImageUpload />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/camera-error" element={<CameraError />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
