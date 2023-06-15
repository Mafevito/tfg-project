import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  Box,
  Heading,
  HStack,
  Flex,
  IconButton,
  Tag,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import { useFavorites } from "../context/FavoriteContext";

export default function ListCardFavComponent({ fav }) {
  const [isfavorite, setIsFavorite] = useState(false);
  const { createFavorite, deleteFavorite } = useFavorites();

  console.log(fav);

  const handleFavoriteList = async () => {
    // Si "isFavorite" es true y se hace clic, se quita la lista como favorito.
    // El icono de corazon se muestra sin rellenar.
    if (isfavorite) {
      console.log(fav.list.id);
      console.log("quitar fav");
      deleteFavorite(fav.list.id);
      setIsFavorite(false);
    } else {
      console.log("add fav");
      createFavorite(fav.list.id);
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
          {fav.list.name}
        </Heading>

        <Text color="gray" fontSize="sm" mb="20px">
          Creado por @{fav.user.name}
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
              <Link to={`/lista/${fav.list.id}`}>Ver más</Link>
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
