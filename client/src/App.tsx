import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index.tsx";
import Hotel from "./pages/Hotel.tsx";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:selectedHotel" element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
