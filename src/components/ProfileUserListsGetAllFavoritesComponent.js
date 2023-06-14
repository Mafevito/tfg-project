import { useEffect } from "react";
import { useFavorites } from "../context/FavoriteContext";
import ListCardFavComponent from "./ListCardFavComponent";

export default function ProfileUserListsGetAllFavoritesComponent() {
  // Obteneniendo arreglo de listas asociadas como favorito al usuario logueado desde FavoriteContext
  const { favorites, getFavorites, loading } = useFavorites();

  // Se ejecuta al cargar el componente
  useEffect(() => {
    getFavorites();
  }, []);

  // Segun el estado de "loadig" renderizar una vista u otra
  function renderLists() {
    if (loading) {
      return <p>Cargando..</p>;
    } else if (favorites.length === 0) {
      return <p>Aún no tienes listas favoritas.</p>;
    } else {
      return (
        <>
          {favorites.map((fav) => (
            <ListCardFavComponent fav={fav} />
          ))}
        </>
      );
    }
  }

  return <div>{renderLists()}</div>;
}
