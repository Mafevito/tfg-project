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
import { useDisclosure } from "@chakra-ui/react";
import { BsArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import { useLists } from "../context/ListContext";
import { useState, useContext, useEffect } from "react";
import ListFormEditComponent from "./ListFormEditComponent";
import { Link } from "react-router-dom";

export default function ListCardComponent({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteList, updateList } = useLists();

  const [listName, setListName] = useState("");
  const [isPublica, setIsPublica] = useState();
  const [isChecked, setIsChecked] = useState(false);

  console.log({ list });

  console.log(isChecked);

  const handleDelete = () => {
    //alert("Eliminando");
    deleteList(list.id);
  };

  // const handleTogglePublica = () => {
  //   alert("Cambiar a lista privada");
  //   updateList(list.id, { publica: !list.publica });
  // };

  const handleOnChange = () => {
    setIsChecked(!isChecked);

    console.log(isChecked);
  };

  const handleUpdate = () => {
    //alert("Actualizar lista");
    updateList(list.id, { name: listName, publica: isChecked });
  };

  useEffect(() => {
    // Establece los valores que actualmente tiene la lista para poder editar
    setListName(list.name);
    setIsPublica(list.publica);
    setIsChecked(list.publica);

    console.log(list.publica);

    console.log(isPublica);
    console.log(isChecked);

    // if (list.publica) {
    //   setIsChecked(true);
    //   console.log(isChecked);
    // } else {
    //   setIsChecked(false);
    //   console.log("no es false");
    // }
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
            <Tag colorScheme="green">Publica</Tag>
          ) : (
            <Tag>Privada</Tag>
          )}
        </Box>

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
            p="10px"
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
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
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                size="md"
                mame="name"
                placeholder="Escribe otro nombre para la lista"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </FormControl>

            <Text mt="15px">
              Tipo:{" "}
              {isPublica ? (
                <Tag colorScheme="green">Publica</Tag>
              ) : (
                <Tag>Privada</Tag>
              )}
            </Text>

            <FormControl mt="25px">
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
