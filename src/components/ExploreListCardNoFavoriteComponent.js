import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Text, Flex, HStack, IconButton } from "@chakra-ui/react";
import { BsHeartFill, BsHeart, BsBoxArrowUpRight } from "react-icons/bs";
import { useFavorites } from "../context/FavoriteContext";

export default function ListCardNoFavoriteComponent({ list }) {
  const [isfavorite, setIsFavorite] = useState(false);
  const { createFavorite, deleteFavorite } = useFavorites();

  const handleFavoriteList = async () => {
    if (isfavorite) {
      console.log("quitar fav");
      deleteFavorite(list.id);
      setIsFavorite(false);
    } else {
      // Si "isFavorite" es false y se hace clic, se añade la lista como favorito.
      // El icono de corazon se muestra rellenado
      console.log("add fav");
      createFavorite(list.id);
      setIsFavorite(true);
    }
  };

  // Se ejecuta al cargar el componente
  useEffect(() => {
    // Se establece a true ya que son las listas favoritas
    setIsFavorite(false);
  }, []);

  return (
    <>
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

        <HStack borderTop={"1px"} borderColor="gray.200">
          <Flex
            p="10px"
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Link to={`/lista/${list.id}`}>
              Ver más
              <IconButton
                size="xs"
                color="black"
                colorScheme="white"
                aria-label="Ver más sobre la palabra"
                ml="5px"
                icon={<BsBoxArrowUpRight />}
              />
            </Link>
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            borderColor="gray.200"
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
