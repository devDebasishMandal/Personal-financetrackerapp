// import Header from "./components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


function App() {
  return (
    <>
      <ToastContainer/>
        <BrowserRouter>
     
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>

        </BrowserRouter>
      
    </>
  );
}

export default App;
