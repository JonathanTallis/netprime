import { BrowserRouter, Routes, Route } from "react-router-dom";

//Layouts
import DefaultLayout from "./components/Layouts/DefaultLayout";

//Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Favorites from "./pages/Favorites/index";
import Error from "./pages/Error";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />

        <Route element={<DefaultLayout />}>
          <Route path="/netprime" element={<Home />} />
          <Route path="/filme/:id" element={<Movie />} />
          <Route path="/favoritos" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
