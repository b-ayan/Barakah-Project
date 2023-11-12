import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav";
import Hero from "./components/Hero";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Donations from "./pages/Donations";
import Details from "./pages/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/signin" element={<SignIn />}></Route>
        <Route exact path="/donations" element={<Donations />}></Route>
        <Route exact path="/details" element={<Details />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
