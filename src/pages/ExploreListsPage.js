import { useEffect, useState } from "react";
import { useLists } from "../context/ListContext";
import { useFavorites } from "../context/FavoriteContext";

import ListCardFavoriteComponent from "../components/ListCardFavoriteComponent";
import ListCardNoFavoriteComponent from "../components/ListCardNoFavoriteComponent";

export default function ExploreListPage() {
  const { allLists, getAllLists, loading, updateList } = useLists();
  const { getFavorites, favorites } = useFavorites();

  // Obtener los que son iguales (favoritos)
  const result1 = allLists.filter(function (obj) {
    return favorites.some(function (obj2) {
      return obj.id == obj2.listId;
    });
  });

  // Obtener los que no son iguales (no favoritos)
  const result2 = allLists.filter(function (obj) {
    return !favorites.some(function (obj2) {
      return obj.id == obj2.listId;
    });
  });

  console.log(result1);
  console.log(result2);

  const results = [...result1, ...result2];

  console.log(results);

  // Se ejecuta al cargar el componente
  useEffect(() => {
    getAllLists();
    getFavorites();
  }, []);

  // Segun el estado de "loadig" renderizar una vista u otra
  function renderLists() {
    if (loading) {
      return <p>Cargando..</p>;
    } else if (allLists.length === 0) {
      return <p>Listas no encontradas.</p>;
    } else {
      // return (
      //   <>
      //     {allLists.map((list) => (
      //       <ExploreListCardComponent list={list} favs={favorites} />
      //     ))}
      //   </>
      // );
      // return (
      //   <ul>
      //     {allLists.map((list) => {
      //       return favorites.map((fav) => (
      //         <li key={list.id}>
      //           {fav.listId} - {list.id}
      //           {list.id === fav.listId ? (
      //             "igual"
      //           ) : (
      //             <>
      //               <ExploreListCardComponent list={list} />
      //             </>
      //           )}
      //         </li>
      //       ));
      //     })}
      //   </ul>
      // );
      // return (
      //   <ul>
      //     {allLists.map((list) => (
      //       <ExploreListCardComponent list={list} favs={favorites} />
      //     ))}
      //     nada
      //   </ul>
      // );

      if (result1.length > 0 && result2.length > 0) {
        return (
          <ul>
            {result1.map((list) => (
              <ListCardFavoriteComponent list={list} />
            ))}

            {result2.map((list) => (
              <ListCardNoFavoriteComponent list={list} />
            ))}
          </ul>
        );
      } else if (result1.length > 0) {
        return (
          <ul>
            {result1.map((list) => (
              <ListCardFavoriteComponent list={list} />
            ))}
          </ul>
        );
      } else if (result2.length > 0) {
        return (
          <ul>
            {result2.map((list) => (
              <ListCardNoFavoriteComponent list={list} />
            ))}
          </ul>
        );
      } else {
        return "";
      }
    }
  }

  return <div>{renderLists()}</div>;
}
