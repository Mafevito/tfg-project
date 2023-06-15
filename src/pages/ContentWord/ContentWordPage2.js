import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  IconButton,
  HStack,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useToast,
} from "@chakra-ui/react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { BsBookmarkPlus } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";

import { AuthContext } from "../../context/AuthContext";
import { useLists } from "../../context/ListContext";
import { useBookmarks } from "../../context/BookmarkContext";
import WordInfo from "./WordInfo";

export default function ContentWordPage2({ result }) {
  let params = useParams();
  console.log(params);
  const { listId } = useParams();

  // Estado para poder guardar "result" que es igual a toda la info de la palabra
  const [savedWord, setSavedWord] = useState({});
  const [isTheSameUser, setIsTheSameUser] = useState(false);

  const userLogged = useContext(AuthContext); // Obtener el usuario logueado
  console.log(userLogged);

  // Obteneniendo arreglo de listas asociadas al usuario logueado desde ListContext
  const { lists, getLists, loading, updateList } = useLists();
  console.log(lists);

  const {
    createBookmark,
    getRelationWordList,
    words,
    checkExist,
    wordExist,
    getWord,
    oneWord,
  } = useBookmarks();

  console.log(oneWord);

  const { word, phonetics, meanings } = result;

  const toast = useToast(); // Usar toast de chakra-ui

  console.log("Resultado llamada API 👇🏻 ");
  console.log(result);

  console.log("Resultado llamada 'result.meanings' 👇🏻 ");
  console.log(result.meanings);

  // Para luego comprobar si el user que ha guardado la palabra en una lista es igual al usuario logueado,
  // si es así le aparece la acción de eliminar la palabra de la lista, ya que significa que es propietario de la lista
  const user = userLogged.user.user.id;

  // Manejar el guardado de una palabra en una lista
  const handleSaveWord = async (listId) => {
    console.log("click sobre guardar palabra");
    //console.log(listId);
    setSavedWord(result);
    console.log(savedWord);

    if (listId) {
      console.log(listId);
      console.log("obteniendo list ID");

      checkExist(listId, savedWord.word);

      if (wordExist) {
        console.log("NO SE PUEDE AGREGAR, LA PALABRA YA EXISTE");
        toast({
          title: "La palabra ya existe en la lista.",
          description: "Prueba a agregar la palabra a otra lista.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        console.log("PUEDES AGREGAR LA PALABRA");
        createBookmark(listId, savedWord);
        toast({
          title: "Palabra agregada correctamente.",
          description: "La palabra ha sido agregada correctamente a la lista.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      console.log("no obteniendo list ID");
    }
  };

  // Para reprodudir el audio correspondiente a la pronunciacion de la palabra
  const playAudio = () => {
    try {
      let audio = new Audio(phonetics[0].audio);
      audio.play();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(oneWord);

  // Se ejecuta al cargar el componente
  useEffect(() => {
    getLists();
    getWord(listId, word);
    oneWord.map((w) => {
      console.log(w);
      console.log(w.userId);

      {
        w.userId === user ? setIsTheSameUser(true) : setIsTheSameUser(false);
      }
    });
    //getRelationWordList();
  });

  console.log(isTheSameUser);

  return (
    <>
      <Container>
        {/* {oneWord[0].userId} ////{user} */}
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
                onClick={playAudio}
              />

              {/* Mostrar popover para "Añadir palabra a una lista existente" */}

              {!isTheSameUser ? (
                <Popover placement="right">
                  <PopoverTrigger>
                    <IconButton
                      colorScheme="gray"
                      aria-label="Guardar palabra"
                      icon={<BsBookmarkPlus />}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Añadir a lista.</PopoverHeader>
                    <PopoverBody>
                      <Stack>
                        {lists.map((list) => (
                          <>
                            <Button
                              variant="ghost"
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
              ) : (
                ""
              )}
            </Flex>
          </CardHeader>

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
