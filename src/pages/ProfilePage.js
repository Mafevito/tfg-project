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
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import ListFormComponent from "../components/ListFormComponent";
import { useDisclosure } from "@chakra-ui/react";
import ListGetAllComponent from "../components/ListGetAllComponent";
import ListGetAllFavoritesComponent from "../components/ListGetAllFavoritesComponent";
import ProfileUserEditFormComponent from "../components/ProfileUserEditFormComponent";

export default function ProfilePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Funcion para mostrar el Popover de chackra ui
  const openPopover = async () => {
    console.log("click");
  };

  return (
    <>
      <Container maxW="600px">
        <ProfileUserEditFormComponent />

        <Divider />

        <Box mt="50px">
          <Heading as="h4" fontSize="md" align="left" mb="20px">
            Tu vaul
          </Heading>

          <Tabs>
            <TabList>
              <Tab _selected={{ color: "teal" }}>Listas</Tab>
              <Tab _selected={{ color: "teal" }}>Listas favoritas</Tab>
            </TabList>

            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="teal.500"
              borderRadius="2px"
            />

            <TabPanels>
              <TabPanel>
                <HStack>
                  <IconButton
                    colorScheme="teal"
                    aria-label="Search database"
                    variant="outline"
                    icon={<FaPlus />}
                    onClick={onOpen}
                  />

                  {/* <Button onClick={onOpen}>Open Modal</Button> */}

                  <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Crear una nueva lista</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <ListFormComponent />
                      </ModalBody>

                      <ModalFooter>
                        {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button> */}
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </HStack>

                {/* Mostrar todas las listas del usuario */}
                <ListGetAllComponent />
              </TabPanel>
              <TabPanel>
                {/* Mostras todas las listas marcadas como favorito del usuario */}
                <ListGetAllFavoritesComponent />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
}
