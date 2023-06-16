import { Routes, Route } from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import ListContentPage from "../pages/ListContentPage";
import ExploreListsPage from "../pages/ExploreListsPage";
import WordPage from "../pages/WordPage";
import FooterComponent from "../components/FooterComponent";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavbarComponent />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="lista/:listId" element={<ListContentPage />} />
          <Route path="explorar-listas" element={<ExploreListsPage />} />
          <Route path="lista/:listId/word/:word" element={<WordPage />} />
        </Route>
      </Routes>

      <FooterComponent />
    </>
  );
}

export default AppRouter;
