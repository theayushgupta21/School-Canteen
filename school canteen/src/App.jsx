import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Snacks from "./pages/Snacks";
import Students from "./pages/Students";
// import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ Navbar har page pe dikhega */}
      <Navbar />

      {/* ✅ Page change hoga */}
      <Routes>
        <Route path="/" element={<Snacks />} />
        <Route path="/students" element={<Students />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;