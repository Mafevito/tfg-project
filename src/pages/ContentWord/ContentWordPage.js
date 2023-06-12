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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { BsBookmarkPlus } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import WordInfo from "./WordInfo";

import { AuthContext } from "../../context/AuthContext";

import { useLists } from "../../context/ListContext";
import { useBookmarks } from "../../context/BookmarkContext";
import { useEffect, useState, useContext } from "react";

import { BsThreeDotsVertical, BsChatSquareQuote } from "react-icons/bs";
import { RiShutDownLine, RiRestartLine, RiFileShredLine } from "react-icons/ri";

export default function ContentWordPage({ result }) {
  // Estado para poder guardar "result" que es igual a toda la info de la palabra
  const [savedWord, setSavedWord] = useState({});

  const userLogged = useContext(AuthContext); // Obtener el usuario logueado
  console.log(userLogged);
  console.log(userLogged.user);
  console.log(userLogged.user.user);
  console.log(userLogged.user.user.id);

  // Obteneniendo arreglo de listas asociadas al usuario logueado desde ListContext
  const { lists, getLists, loading, updateList } = useLists();
  console.log(lists);

  const { createBookmark, getRelationWordList, words, checkExist, wordExist } =
    useBookmarks();

  const { word, phonetics, meanings } = result;

  console.log("Resultado llamada API 👇🏻 ");
  console.log(result);

  console.log("Resultado llamada 'result.meanings' 👇🏻 ");
  console.log(result.meanings);

  // Manejar el guardado de una palabra en una lista
  const handleSaveWord = async (listId) => {
    console.log("click sobre guardar palabra");
    //console.log(listId);
    setSavedWord(result);
    console.log(savedWord);
    console.log(savedWord.word);
    console.log(listId);

    if (listId) {
      console.log("obteniendo list ID");
      // getRelationWordList(listId);

      // {
      //   words.map((word) => (
      //     <>
      //       {savedWord.word == word.word && listId == word.listId
      //         ? console.log("ya existe")
      //         : createBookmark(listId, savedWord)}
      //     </>
      //   ));
      // }

      checkExist(listId, savedWord.word);

      if (wordExist) {
        console.log("NO SE PUEDE AGREGAR, LA PALABRA YA EXISTE");
      } else {
        console.log("PUEDES AGREGAR LA PALABRA");
        createBookmark(listId, savedWord);
      }
    } else {
      console.log("no obteniendo list ID");
    }

    // getRelationWordList(listId);

    // {
    //   words.map((word) => (
    //     <>
    //       {savedWord.word == word.word && listId == word.listId
    //         ? console.log("ya existe")
    //         : createBookmark(listId, savedWord)}
    //     </>
    //   ));
    // }
    //createBookmark(listId, savedWord);

    // saveRelationWordList(savedWord, listId);
    // updateList(listId, { words: savedWord });

    // updateList(listId, { bookmarkedWords: savedWord });

    // const { error, data } = await supabase
    //   .from("lists")
    //   .insert({
    //     name: listName,
    //     userId: user.id,
    //   })
    //   .select();

    // try {
    //   // Servicio auth de supabase para hacer login
    //   const user = userLogged.user.user;

    //   const { data, error } = await supabase
    //     .from("bookmarks")
    //     .insert({ userId: user.id })
    //     .select();

    //   if (error) throw error;

    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // Se ejecuta al cargar el componente
  useEffect(() => {
    getLists();
    //getRelationWordList();
  }, []);

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

              {/* <IconButton
                colorScheme="gray"
                aria-label="Guardar palabra"
                icon={<BsBookmarkPlus />}
                onClick={handleSaveWord}
              /> */}

              {/* Mostrar popover para "Añadir palabra a una lista existente" */}
              <Popover placement="right">
                <PopoverTrigger>
                  <Button>Trigger</Button>
                  {/* <IconButton
                    colorScheme="gray"
                    aria-label="Guardar palabra"
                    icon={<BsBookmarkPlus />}
                    onClick={handleSaveWord}
                  /> */}
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Añadir a lista</PopoverHeader>
                  <PopoverBody>
                    <Stack>
                      {/* <Button
                        w="194px"
                        variant="ghost"
                        rightIcon={<BsChatSquareQuote />}
                        justifyContent="space-between"
                        fontWeight="normal"
                        fontSize="sm"
                      >
                        Request Access
                      </Button> */}

                      {lists.map((list) => (
                        <>
                          {/* <h1>{list.name}</h1> */}

                          <Button
                            // w="194px"
                            variant="ghost"
                            // rightIcon={<BsChatSquareQuote />}
                            justifyContent="space-between"
                            fontWeight="normal"
                            fontSize="sm"
                            onClick={() => handleSaveWord(list.id)}
                          >
                            {list.name}
                          </Button>
                        </>
                      ))}
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
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
