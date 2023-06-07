import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/supabase";
import { AuthContext } from "../context/AuthContext";

// Este context puede ser usado por otras partes de la app
export const ListContext = createContext();

// Hook para poder usar este context
export const useLists = () => {
  const context = useContext(ListContext);
  return context;
};

// Componente grande que contiene a otros más pequeños (hare referencia a children)
export const ListContextProvider = ({ children }) => {
  const userLogged = useContext(AuthContext); // Obtener el usuario logueado
  const [lists, setLists] = useState([]);

  // Obtener las listas asociadas al usuario logueado desde Supabase
  const getLists = async () => {
    const user = userLogged.user.user;
    const { error, data } = await supabase
      .from("lists")
      .select()
      .eq("userId", user.id)
      .order("id", { ascending: true });

    if (error) throw error;

    setLists(data);
    // console.log(result);
    // console.log(user);
  };

  // Se exporta tanto "lists" como la funcion "getLists" para que sea usado por el componente "ListGetAll"
  return (
    <ListContext.Provider value={{ lists, getLists }}>
      {children}
    </ListContext.Provider>
  );
};
