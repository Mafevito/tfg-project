import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/supabase";
import { AuthContext } from "../context/AuthContext";

// Este context puede ser usado por otras partes de la app
export const FavoriteContext = createContext();

// Hook para poder usar este context
export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  return context;
};

// Componente grande que contiene a otros más pequeños (hare referencia a children)
export const FavoriteContextProvider = ({ children }) => {
  const userLogged = useContext(AuthContext); // Obtener el usuario logueado
  const [favorites, setFavorites] = useState([]);
  // const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [list, setList] = useState([]);
  // const [allLists, setAllLists] = useState([]);

  // Obtener las listas asociadas como favorito al usuario logueado desde Supabase
  const getFavorites = async () => {
    setLoading(true); // Al cargar

    const user = userLogged.user.user;
    const { error, data } = await supabase
      .from("favorites")
      .select(`*, list:lists(name, id), user:users(name)`)
      .eq("userId", user.id);

    if (error) throw error;
    console.log(data);

    setFavorites(data);
    // console.log(result);
    // console.log(user);
    setLoading(false); // Al finalizar consultas
  };

  // Funcion para crear una relacion de favorito
  const createFavorite = async (listId) => {
    try {
      const user = userLogged.user.user;
      const { error, data } = await supabase
        .from("favorites")
        .insert({
          listId: listId,
          userId: user.id,
        })
        .select();

      if (error) throw error;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para eliminar una relacion de favorito
  const deleteFavorite = async (id) => {
    // console.log(id);
    const user = userLogged.user.user;
    const { error, data } = await supabase
      .from("favorites")
      .delete()
      .eq("userId", user.id)
      .eq("listId", id)
      .select();

    if (error) throw error;

    // Para que en "lists" se muestren todas menos la eliminada.
    // De esta manera no hace falta recargar la pag despues de la eliminacion
    setFavorites(favorites.filter((fav) => fav.id !== id));

    console.log(data);
  };

  // Se exporta tanto "lists" como la funcion "getLists" para que sea usado por el componente "ListGetAll"
  return (
    <FavoriteContext.Provider
      value={{
        createFavorite,
        getFavorites,
        favorites,
        loading,
        deleteFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
