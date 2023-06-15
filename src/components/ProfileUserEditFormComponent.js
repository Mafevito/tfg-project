import { useContext, useEffect, useState } from "react";
import {
  Heading,
  Box,
  Flex,
  Stack,
  HStack,
  Text,
  Spacer,
  Button,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../supabase/supabase";
import UserDataFormEditComponent from "./UserDataFormEditComponent";

export default function ProfileUserEditFormComponent() {
  const userLogged = useContext(AuthContext); // Obtener el usuario logueado
  // Para actualizar los datos del usuario logueado
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure(); // Para manejar el modal de chackra-ui
  const toast = useToast(); // Para usar el toast de chackra-ui

  console.log(userLogged);
  console.log(userLogged.user.user.user_metadata);

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // para evitar que la pag se recargue

  //   console.log("edit user");

  //   try {
  //     // Servicio auth de supabase para editar user
  //     const { data, error } = await supabase.auth.updateUser({
  //       data: {
  //         name: name,
  //         username: username,
  //       },
  //     });

  //     if (error) throw error;

  //     console.log("user se ha actualizado correctamente");
  //     console.log(data);

  //     // Si el user se ha editado correctamente se muestra un toast
  //     toast({
  //       title: "Datos actualizados.",
  //       description: "Tus datos de usuario se han actualizado correctamente.",
  //       status: "success",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // Establece los valores del usuario que actualmente tiene para poder editar
    setName(userLogged.user.user.user_metadata.name);
    setUsername(userLogged.user.user.user_metadata.username);
  }, []);

  return (
    <Box>
      <Stack bg={"gray.50"} rounded={"xl"} p={{ base: 4, sm: 6, md: 8 }}>
        <Flex minWidth="max-content" alignItems="center" gap="2" mb="30px">
          <Box p="2" align="left">
            <Heading as="h4" size="md" mb="5px">
              {userLogged.user.user.user_metadata.name}
            </Heading>

            <HStack>
              <Text color="gray" fontSize="md">
                @{userLogged.user.user.user_metadata.username}
              </Text>
            </HStack>
          </Box>
          <Spacer />
          <Button
            colorScheme="teal"
            size="md"
            onClick={onOpen}
            leftIcon={<BsPencilSquare />}
          >
            Editar perfil
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar datos de usuario.</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <UserDataFormEditComponent />
              </ModalBody>

              {/* <ModalFooter mb="10px">
                <Stack
                  spacing={6}
                  direction={["column", "row"]}
                  w={"full"}
                  maxW={"md"}
                >
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "red.500",
                    }}
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    bg={"teal.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "teal.500",
                    }}
                    onClick={handleUpdate}
                  >
                    Guardar
                  </Button>
                </Stack>
              </ModalFooter> */}
            </ModalContent>
          </Modal>
        </Flex>
      </Stack>
    </Box>
  );
}
