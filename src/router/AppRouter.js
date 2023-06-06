import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import NavbarComponent from "../components/NavbarComponent";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";

import { clientsupabase } from "../supabase/supabase";

function AppRouter() {
  // Instanciar para poder usarlo
  const navigate = useNavigate();

  // Estado que va a guardar el user logueado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Redirigir al usuario a una pag segun si esta logueado o no
  useEffect(() => {
    // const getUser = async () => {
    //   try {
    //     // Llama a la funcion de 'getUser' de Supabase
    //     const {
    //       data: { user },
    //       error,
    //     } = await clientsupabase.auth.getUser();
    //     if (error) throw error;
    //     if (user) {
    //       setIsAuthenticated(true);
    //       console.log(user);
    //       console.log(isAuthenticated);
    //       navigate("/dashboard");
    //     } else {
    //       console.log("no hay user");
    //       navigate("/login");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getUser();
    // const result = clientsupabase.auth.getUser();
    // // Si no se obtiene un resultado enviar a pag '/login'
    // if (!result) {
    //   navigate("/login");
    // } else {
    //   navigate("/dashboard");
    // }
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<NavbarComponent />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="perfil" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
