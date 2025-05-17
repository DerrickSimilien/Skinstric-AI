import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Introduction from "./Pages/Introduction";  
import './index.css';
import Location from "./Pages/Location";
import Nationality from "./Pages/Nationality";
import Submission from "./Pages/Submission";
import Loading from "./Pages/Loading";




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/location" element={<Location />} />
       <Route path="/nationality" element={<Nationality />} />
       <Route path="/submission" element={<Submission />} />
       <Route path="/loading" element={<Loading />} />
      </Routes>
    </Router>
  );
}

export default App;
