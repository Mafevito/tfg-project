import React from "react";
import {
  Heading,
  Box,
  Flex,
  Stack,
  HStack,
  Text,
  Spacer,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
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
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import ProfileCreateListFormComponent from "./ProfileCreateListFormComponent";
import ProfileUserListsGetAllComponent from "./ProfileUserListsGetAllComponent";
import ProfileUserListsGetAllFavoritesComponent from "./ProfileUserListsGetAllFavoritesComponent";

export default function ProfileUserListsComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Para manejar el modal de chackra-ui

  return (
    <Box mt="60px">
      <Heading as="h5" size="sm" align="left" mb="5px">
        Tu vaul
      </Heading>

      <Text fontSize="sm" textAlign="left" color="gray" mb="25px">
        Aqui se muestran todas tus listas, las creadas por ti y las marcadas
        como favoritas.
      </Text>

      <Tabs>
        <TabList>
          <Tab _selected={{ color: "teal" }}>Mis Listas</Tab>
          <Tab _selected={{ color: "teal" }}>Listas favoritas</Tab>
        </TabList>

        {/* TabIndicator de chackra-ui personalizado */}
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="teal.500"
          borderRadius="2px"
        />

        <TabPanels>
          <TabPanel>
            <HStack>
              <Box>
                <Button
                  mt="15px"
                  leftIcon={<FaPlus />}
                  colorScheme="teal"
                  variant="outline"
                  onClick={onOpen}
                >
                  Crear lista
                </Button>

                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Crear una nueva lista.</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <ProfileCreateListFormComponent />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            </HStack>

            {/* Mostrar todas las listas del usuario */}
            <ProfileUserListsGetAllComponent />
          </TabPanel>
          <TabPanel>
            {/* Mostras todas las listas marcadas como favorito del usuario */}
            <ProfileUserListsGetAllFavoritesComponent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
