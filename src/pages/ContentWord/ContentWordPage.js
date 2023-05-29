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
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
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
        <h1>content word</h1>
        <p>aqui va la info</p>
        <Flex minWidth="max-content" alignItems="center" gap="2" mt="50px">
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
        </Flex>

        {/* {meanings.map((item, index) => {
          return <p>{item.partOfSpeech}</p>;
        })} */}

        {/* El componente WordInfo se encarga de mostrar el "partOfSpeech" y las "definitions" de una palabra */}
        {/* <Tabs mt="20px"> */}
        {/* <TabList>
            {meanings.map((item, index) => {
              return <Tab>{item.partOfSpeech}</Tab>;
            })}
          </TabList> */}

        {/* <TabPanels> */}
        {/* {meanings.map((item, index) => {
              let definitionss = item.definitions;
              console.log(item);
              return (
                <TabPanel>
                  {definitionss.map((def, index) => {
                    let definitiono = def.definition;
                    console.log(definitiono);
                    return { definitiono };
                  })}
                  ;
                </TabPanel>
              );
            })} */}

        <Heading as="h4" size="md" textAlign="left" mb="20px" mt="50px">
          Definiciones
        </Heading>

        <Accordion defaultIndex={[0]} allowMultiple>
          {meanings &&
            meanings.map((content) => {
              return <WordInfo {...content} />;
            })}
        </Accordion>

        {/* </TabPanels> */}
        {/* </Tabs> */}
      </Container>
    </>
  );
}
