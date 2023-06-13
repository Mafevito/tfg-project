import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import { useFavorites } from "../context/FavoriteContext";

import { useState, useEffect } from "react";

export default function ListCardFavoriteComponent({ list }) {
  const [isfavorite, setIsFavorite] = useState(false);
  const { createFavorite, deleteFavorite } = useFavorites();

  console.log(list);

  const handleFavoriteList = async () => {
    // Si "isFavorite" es true y se hace clic, se quita la lista como favorito.
    // El icono de corazon se muestra sin rellenar.
    if (isfavorite) {
      console.log(list.id);
      console.log("quitar fav");
      deleteFavorite(list.id);
      setIsFavorite(false);
    } else {
      console.log("add fav");
      createFavorite(list.id);
      setIsFavorite(true);
    }
  };

  // Se ejecuta al cargar el componente
  useEffect(() => {
    // Se establece a true ya que son las listas favoritas
    setIsFavorite(true);
  }, []);

  return (
    <>
      <li>
        <h1>{list.name}</h1>
        <p>{JSON.stringify(list.publica)}</p>
        <p>creada por: {list.user.name}</p>
        <Flex
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"sm"}
          borderLeft={"1px"}
          cursor="pointer"
          onClick={() => handleFavoriteList()}
        >
          {isfavorite ? (
            <BsHeartFill fill="red" fontSize={"24px"} />
          ) : (
            <BsHeart fontSize={"24px"} />
          )}
        </Flex>
      </li>
    </>
  );
}
