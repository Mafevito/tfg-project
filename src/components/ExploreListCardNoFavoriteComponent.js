import { useState } from "react";
import { Link } from "react-router-dom";
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
      {/* <li>
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
      </li> */}

      <Box
        rounded={"xl"}
        bg="white"
        border={"1px"}
        borderColor="gray.200"
        mt="25px"
        p="20px"
        textAlign="left"
      >
        <Heading as="h5" size="sm" mb="5px">
          {list.name}
        </Heading>

        <Text color="gray" fontSize="sm" mb="20px">
          Creado por @{list.user.name}
        </Text>

        <HStack borderTop={"1px"} color="gray.200">
          <Flex
            p="10px"
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Text fontSize={"md"} fontWeight={"normal"} color="black">
              <Link to={`/lista/${list.id}`}>Ver más</Link>
            </Text>

            <BsArrowUpRight color="black" />
          </Flex>
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
              <BsHeartFill fill="#B8E7E1" fontSize={"24px"} />
            ) : (
              <BsHeart fontSize={"24px"} />
            )}
          </Flex>
        </HStack>
      </Box>
    </>
  );
}
