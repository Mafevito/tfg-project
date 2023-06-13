import { useState } from "react";
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

export default function ListCardNoFavoriteComponent({ list }) {
  const [isfavorite, setIsFavorite] = useState(false);
  const { createFavorite, deleteFavorite } = useFavorites();

  console.log(list);

  const handleFavoriteList = async () => {
    if (isfavorite) {
      console.log(list.id);
      console.log("quitar fav");
      setIsFavorite(false);
    } else {
      // Si "isFavorite" es false y se hace clic, se añade la lista como favorito.
      // El icono de corazon se muestra rellenado
      console.log(list.id);
      console.log("add fav");
      createFavorite(list.id);
      setIsFavorite(true);
    }
  };

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
