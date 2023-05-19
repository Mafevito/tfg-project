// El objetivo de este contexto es estar atento a los cambios en la sesión del user
import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";

// contiene la sesion del user (que es un objeto)
export const AuthContext = createContext({
  user: null,
});

// provider que va a permitir compartir informacion en el arbol de paginas
export const AuthProvider = ({ children }) => {
  // se va a enviar 'user' a todas las paginas
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // DE ESTA MANERA NO ME FUNCIONA, ME DA ERROR: "invalid claim: missing sub claim"
    // const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
    //   checkUser()
    // );

    // const checkUser = async () => {
    //   const user = supabase.auth.getUser();

    //   // si user esta logueado
    //   if (user) {
    //     setUser(user);
    //     navigate("/dashboard", { replace: true });
    //   } else {
    //     navigate("/", { replace: true });
    //   }
    // };

    // return () => {
    //   authListener.subscription.unsubscribe();
    // };

    let user;
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);

        user = session;

        if (user != null) {
          setUser(user);
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
