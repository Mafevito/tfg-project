import { useEffect, useState } from "react";
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
import { BsBookmarkPlus } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";

import { useLists } from "../../context/ListContext";
import { useWords } from "../../context/WordsContext";
import WordInfo from "./WordInfo";

export default function ContentWordPage({ result }) {
  // Desestructurando "result" que se pasa desde DashboardPage
  const { word, phonetics, meanings } = result;
  // Estado para poder guardar "result" que es igual a toda la info de la palabra
  const [savedWord, setSavedWord] = useState({});
  // Obteneniendo arreglo de listas asociadas al usuario logueado desde ListContext
  const { lists, getLists } = useLists();
  // Obteniendo funcion para guardar una palabra a una lista creada por el usuario logueado
  const { createWord, checkExist, wordExist } = useWords();
  const toast = useToast(); // Usar toast de chakra-ui

  // console.log("Resultado llamada API 👇🏻 ");
  // console.log(result);

  // console.log("Resultado llamada 'result.meanings' 👇🏻 ");
  // console.log(result.meanings);

  // Manejar el guardado de una palabra en una lista
  const handleSaveWord = async (listId) => {
    console.log("click sobre guardar palabra");
    //console.log(listId);
    setSavedWord(result);
    //console.log(savedWord);

    if (listId) {
      //console.log("listId obtenido");
      checkExist(listId, savedWord.word);

      if (!wordExist) {
        createWord(listId, savedWord);
        toast({
          title: "Palabra agregada correctamente.",
          description: "La palabra ha sido agregada correctamente a la lista.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "La palabra ya existe en la lista.",
          description: "Prueba a agregar la palabra a otra lista.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      console.log("listId no obtenido");
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

  // Se ejecuta al cargar el componente
  useEffect(() => {
    getLists();
  }, []);

  return (
    <>
      <Container maxW="675px">
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
                    {lists.length > 0 ? (
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
                    ) : (
                      "Aún no tienes listas, puedes crear una desde tu perfil."
                    )}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
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
