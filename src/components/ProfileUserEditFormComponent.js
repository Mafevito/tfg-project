import { useContext, useEffect, useState } from "react";
import {
  Container,
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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../supabase/supabase";

export default function ProfileUserEditFormComponent() {
  const userLogged = useContext(AuthContext); // Obtener el usuario logueado
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Para guardar errores devueltos desde servicio de auth de supabase
  const [isError, setError] = useState("");
  // Para mostrar la alerta con el error
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertGood, setShowAlertGood] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  console.log(userLogged);
  console.log(userLogged.user.user.user_metadata);

  const handleUpdate = async (e) => {
    e.preventDefault(); // para evitar que la pag se recargue

    console.log("edit user");

    try {
      // Servicio auth de supabase para crear user
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name: name,
          username: username,
        },
      });

      if (error) throw error;
      setShowAlertGood(true);

      console.log("user se ha creado correctamente");
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
      console.log(isError);
      setShowAlertError(true);
    }
  };

  useEffect(() => {
    // Establece los valores del usuario que actualmente tiene para poder editar
    setName(userLogged.user.user.user_metadata.name);
    setUsername(userLogged.user.user.user_metadata.username);
  }, []);

  return (
    <>
      <Heading as="h6" fontSize="xs" align="left" mb="10">
        Perfil
      </Heading>
      <Flex minWidth="max-content" alignItems="center" gap="2" mb="30px">
        <Box p="2" align="left">
          <Heading as="h4" size="md">
            {/* Nombre de usuario */}
            {userLogged.user.user.user_metadata.name}
          </Heading>

          <HStack>
            <Text color="gray">
              {/* @username */}@{userLogged.user.user.user_metadata.username}
            </Text>
          </HStack>
        </Box>
        <Spacer />
        <Button colorScheme="teal" size="md" onClick={onOpen}>
          Editar perfil
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar datos de usuario.</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <form onSubmit={handleSubmit}> */}
              <Stack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Introduce tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="username">
                  <FormLabel optionalIndicator>Nombre de usuario</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Introduce tu nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>

                {showAlertError && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{isError}</AlertDescription>
                  </Alert>
                )}

                {showAlertGood && (
                  <Alert status="success">
                    <AlertIcon />
                    <AlertDescription>
                      Usuario creado correctamente.
                    </AlertDescription>
                  </Alert>
                )}
              </Stack>
              {/* </form> */}
            </ModalBody>

            <ModalFooter>
              {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button> */}
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
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleUpdate}
                >
                  Actualizar
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
