import { useEffect } from "react";
import { useFavorites } from "../context/FavoriteContext";

export default function ListGetAllFavoritesComponent() {
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
      return <p>Listas no encontradas.</p>;
    } else {
      return (
        <>
          {favorites.map((fav) => (
            <>
              <h1>{fav.list.name}</h1>
            </>
          ))}
        </>
      );
    }
  }

  return <div>{renderLists()}</div>;
}
