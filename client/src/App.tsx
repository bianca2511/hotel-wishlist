import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index.tsx";
import Hotel from "./pages/Hotel.tsx";
import Wishlists from "./pages/Wishlists.tsx";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:selectedHotel" element={<Hotel />} />
        <Route path="/wishlists" element={<Wishlists />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
