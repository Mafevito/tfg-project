import { useContext } from "react";
import {
  Heading,
  Box,
  Flex,
  Stack,
  HStack,
  Text,
  Spacer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";

import { AuthContext } from "../context/AuthContext";
import UserDataFormEditComponent from "./UserDataFormEditComponent";

export default function ProfileUserEditFormComponent() {
  const userLogged = useContext(AuthContext); // Obtener el usuario logueado
  const { isOpen, onOpen, onClose } = useDisclosure(); // Para manejar el modal de chackra-ui

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
            </ModalContent>
          </Modal>
        </Flex>
      </Stack>
    </Box>
  );
}
