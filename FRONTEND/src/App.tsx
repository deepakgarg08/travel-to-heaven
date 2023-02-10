import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { SearchResults } from "./components/SearchResults";
import { HotelDetail } from "./components/HotelDetail";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<SearchResults />}></Route>
        <Route path="/hotel/:id" element={<HotelDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
