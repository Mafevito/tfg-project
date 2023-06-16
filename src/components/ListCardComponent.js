import { useState, useContext, useEffect } from "react";
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
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { BsPencilSquare, BsTrash, BsBoxArrowUpRight } from "react-icons/bs";

import { useLists } from "../context/ListContext";

export default function ListCardComponent({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Estados para editar una lista
  const [listName, setListName] = useState("");
  const [isPublica, setIsPublica] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const toast = useToast(); // Para usar el toast de chackra-ui

  // Funciones para eliminar y editar una lista en concreto que se muestra en "ProfilePage"
  const { deleteList, updateList } = useLists();

  const handleDelete = () => {
    deleteList(list.id);

    // Si la lista se ha eliminado correctamente se muestra un toast
    toast({
      title: "Lista eliminada.",
      description: "La lista ha sido eliminada correctamente.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleUpdate = () => {
    updateList(list.id, { name: listName, publica: isChecked });

    // Si la lista se ha editado correctamente se muestra un toast
    toast({
      title: "Lista editada.",
      description: "La lista ha sido editada correctamente.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    // Establece los valores que actualmente tiene la lista para poder editar
    setListName(list.name);
    setIsPublica(list.publica);
    setIsChecked(list.publica);
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

        <Box mb="20px" mt="10px">
          {list.publica === true ? (
            <Tag colorScheme="yellow">Publica</Tag>
          ) : (
            <Tag>Privada</Tag>
          )}
        </Box>

        <HStack borderTop={"1px"} borderColor="gray.200">
          <Flex
            p="10px"
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
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
            p="10px"
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            borderColor="gray.200"
            gap="2"
          >
            {/* Boton que abre modal para editar una lista */}
            <IconButton
              aria-label="Editar lista"
              color="black"
              icon={<BsPencilSquare />}
              onClick={onOpen}
            />

            {/* Boton para eliminar una lista */}
            <IconButton
              aria-label="Eliminar lista"
              color="white"
              bg={"red.400"}
              _hover={{
                bg: "red.500",
              }}
              icon={<BsTrash />}
              onClick={() => handleDelete()}
            />
          </Flex>
        </HStack>
      </Box>

      {/* Modal para editar una lista que pertenece al usuario logueado */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar lista</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    type="text"
                    size="md"
                    mame="name"
                    placeholder="Escribe otro nombre para la lista"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    focusBorderColor="#369496"
                  />
                </FormControl>

                <Text>
                  Tipo:{" "}
                  {isPublica ? (
                    <Tag colorScheme="yellow">Publica</Tag>
                  ) : (
                    <Tag>Privada</Tag>
                  )}
                </Text>

                <FormControl>
                  <Checkbox
                    name="publica"
                    checked={isChecked}
                    onChange={handleOnChange}
                  >
                    {isPublica
                      ? "Hacer la lista privada"
                      : "Hacer la lista publica"}
                  </Checkbox>
                </FormControl>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button mb="5px" colorScheme="teal" mr={3} onClick={handleUpdate}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
