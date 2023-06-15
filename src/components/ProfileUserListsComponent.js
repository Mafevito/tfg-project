import React from "react";
import {
  Box,
  HStack,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

import ProfileCreateListFormComponent from "./ProfileCreateListFormComponent";
import ProfileUserListsGetAllComponent from "./ProfileUserListsGetAllComponent";
import ProfileUserListsGetAllFavoritesComponent from "./ProfileUserListsGetAllFavoritesComponent";

export default function ProfileUserListsComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Para manejar el modal de chackra-ui

  return (
    <Box mt="60px">
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
