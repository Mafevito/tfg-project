// El objetivo de este contexto es estar atento a los cambios en la sesión del user
import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";

// contiene la sesion del user (que es un objeto)
export const AuthContext = createContext({
  user: null,
});

// Hook para poder usar este context
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

// provider que va a permitir compartir informacion en el arbol de paginas
export const AuthProvider = ({ children }) => {
  // se va a enviar 'user' a todas las paginas
  const [user, setUser] = useState(null);

  // Para guardar errores devueltos desde servicio de auth de supabase
  const [isError, setError] = useState("");
  // Para mostrar la alerta con el error
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertGood, setShowAlertGood] = useState(false);

  const navigate = useNavigate();

  // Funcion para registrar un usuario
  const registerUser = async (email, password, name, username) => {
    try {
      // Servicio auth de supabase para crear user
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
            username: username,
          },
        },
      });

      if (error) throw error;

      setShowAlertGood(true);
      console.log("user se ha creado correctamente");
      console.log(data);

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);

      setError(error.message);
      setShowAlertError(true);
    }
  };

  // Funcion para hacer login de un usuario
  const loginUser = async (email, password) => {
    try {
      // Servicio auth de supabase para hacer login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      console.log("user se ha logueado correctamente");
      console.log(data);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error);

      setError(error.message);
      setShowAlertError(true);
    }
  };

  // Funcion para cerrar sesion de un usuario
  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    setUser("");
  };

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

    // let user;
    // const { data: authListener } = supabase.auth.onAuthStateChange(
    //   (event, session) => {
    //     console.log(event, session);

    //     user = session;

    //     console.log(user);

    //     if (user != null) {
    //       setUser(user);
    //       console.log(user);
    //       navigate("/dashboard", { replace: true });
    //     } else {
    //       navigate("/", { replace: true });
    //     }
    //   }

    //let user;
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);

        //user = session;

        // console.log(user);
        // console.log(session);

        if (session) {
          setUser(session);
          //console.log(user);
          //navigate("/dashboard", { replace: true });
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
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        isError,
        showAlertError,
        showAlertGood,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
