import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  IconButton,
  HStack,
  Spacer,
  Flex,
  ButtonGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { BsBookmarkPlus } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import WordInfo from "./WordInfo";

export default function ContentWordPage({ result }) {
  const { word, phonetics, meanings } = result;

  console.log("Resultado llamada API 👇🏻 ");
  console.log(result);

  console.log("Resultado llamada 'result.meanings' 👇🏻 ");
  console.log(result.meanings);

  return (
    <>
      <Container>
        {/* <Flex minWidth="max-content" alignItems="center" gap="2" mt="50px">
          <Box p="2" align="left">
            <Heading as="h3" size="lg">
              {word}
            </Heading>

            <HStack>
              {phonetics.map((item, index) => {
                return (
                  <Text fontSize="md" color="gray">
                    {item.text}
                  </Text>
                );
              })}
            </HStack>
          </Box>
          <Spacer />
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<FaPlay />}
          />

          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<FaPlus />}
          />
        </Flex> */}

        <Card mt="50px" maxW="xl">
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Box align="left">
                  <Heading as="h3" size="lg">
                    {word}
                  </Heading>

                  <HStack align="left">
                    {phonetics.map((item, index) => {
                      return (
                        <Text fontSize="sm" color="teal" ml="-3px">
                          {item.text}
                        </Text>
                      );
                    })}
                  </HStack>
                </Box>
              </Flex>
              <IconButton
                colorScheme="gray"
                aria-label="Pronunciación"
                icon={<HiSpeakerWave />}
                mr="10px"
              />

              <IconButton
                colorScheme="gray"
                aria-label="Guardar palabra"
                icon={<BsBookmarkPlus />}
              />
            </Flex>
          </CardHeader>

          {/* <Heading as="h4" size="md" textAlign="left" mb="20px" mt="50px">
            Definiciones
          </Heading> */}

          <CardBody align="left">
            <Stack divider={<StackDivider />} spacing="4">
              {meanings &&
                meanings.map((content) => {
                  return <WordInfo {...content} />;
                })}
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
