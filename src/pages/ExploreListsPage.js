import { useEffect } from "react";
import { Container, Text } from "@chakra-ui/react";

import { useLists } from "../context/ListContext";
import { useFavorites } from "../context/FavoriteContext";
import ExploreListCardFavoriteComponent from "../components/ExploreListCardFavoriteComponent";
import ExploreListCardNoFavoriteComponent from "../components/ExploreListCardNoFavoriteComponent";

export default function ExploreListPage() {
  const { allLists, getAllLists, loading } = useLists();
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

  // console.log(result1);
  // console.log(result2);
  // const results = [...result1, ...result2];
  // console.log(results);

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
      if (result1.length > 0 && result2.length > 0) {
        return (
          <ul>
            {result1.map((list) => (
              <ExploreListCardFavoriteComponent list={list} />
            ))}

            {result2.map((list) => (
              <ExploreListCardNoFavoriteComponent list={list} />
            ))}
          </ul>
        );
      } else if (result1.length > 0) {
        return (
          <ul>
            {result1.map((list) => (
              <ExploreListCardFavoriteComponent list={list} />
            ))}
          </ul>
        );
      } else if (result2.length > 0) {
        return (
          <ul>
            {result2.map((list) => (
              <ExploreListCardNoFavoriteComponent list={list} />
            ))}
          </ul>
        );
      } else {
        return "";
      }
    }
  }

  return (
    <Container maxW="675px">
      <Text fontSize="md" textAlign="left">
        Explora listas de palabras creadas por otros usuarios y guardalas.
      </Text>
      {renderLists()}
    </Container>
  );
}
