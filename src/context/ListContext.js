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
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  // Obtener las listas asociadas al usuario logueado desde Supabase
  const getLists = async () => {
    setLoading(true); // Al cargar

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
    setLoading(false); // Al finalizar consultas
  };

  // Funcion para crear una lista
  const createList = async (listName) => {
    setAdding(true); // Cuando se empieza a crear

    try {
      const user = userLogged.user.user;
      const { error, data } = await supabase
        .from("lists")
        .insert({
          name: listName,
          userId: user.id,
        })
        .select();
      // console.log(result);

      if (error) throw error;
      console.log(data);

      setLists([...lists, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false); // al finalizar se establece siempre en false
      console.log(adding);
    }
  };

  // Se exporta tanto "lists" como la funcion "getLists" para que sea usado por el componente "ListGetAll"
  return (
    <ListContext.Provider
      value={{ lists, getLists, createList, adding, loading }}
    >
      {children}
    </ListContext.Provider>
  );
};
