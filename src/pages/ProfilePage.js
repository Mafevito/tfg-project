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
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export default function ProfilePage() {
  return (
    <>
      <Container maxW="600px">
        <Heading as="h6" fontSize="xs" align="left" mb="10">
          Perfil
        </Heading>

        <Flex minWidth="max-content" alignItems="center" gap="2" mb="30px">
          <Box p="2" align="left">
            <Heading as="h4" size="md">
              Nombre de usuario
            </Heading>

            <HStack>
              <Text color="gray">@username</Text>
            </HStack>
          </Box>
          <Spacer />
          <Button colorScheme="teal" size="md">
            Editar perfil
          </Button>
        </Flex>

        <Divider />

        <Box mt="50px">
          <Heading as="h4" fontSize="md" align="left" mb="20px">
            Tu vaul
          </Heading>

          <Tabs>
            <TabList>
              <Tab _selected={{ color: "teal" }}>Listas</Tab>
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
                  />
                </HStack>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
}
