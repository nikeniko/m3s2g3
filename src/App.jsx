import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TVShows from "./componet/TVShows";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componet/Home";
import MovieDetails from "./componet/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/Profile-page" element={<ProfilePage />} />
          <Route path="/" element={<Home />} />
          <Route path="/MovieDetails/:imdbID" element={<MovieDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
