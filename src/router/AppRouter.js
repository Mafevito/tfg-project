import { Routes, Route } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavbarComponent />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
