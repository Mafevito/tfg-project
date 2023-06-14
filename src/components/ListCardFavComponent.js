import { useState } from "react";
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

export default function ListCardFavComponent({ fav }) {
  const [isfavorite, setIsFavorite] = useState(true);

  console.log(fav);

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
            onClick={() => setIsFavorite(!isfavorite)}
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
