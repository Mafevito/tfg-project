import {
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Text,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ContentWordPage from "./ContentWord/ContentWordPage";

export default function DashboardPage() {
  // Estado para almacenar la palabra introducida en el input
  // Estado para almacenar el resultado al llamar a la API
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [errorinput, setInputError] = useState("");
  const [error, setError] = useState("");
  const [exist, setExist] = useState(true);

  const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  // Funcion que hace la peticion a la API al hacer clic en boton "buscar"
  // pasandole la palabra introducida en el input
  const searchWord = (e) => {
    e.preventDefault();

    console.log(word);

    // console.log(word);
    // const trimmedWord = word.trim();
    // console.log(trimmedWord);
    // console.log(`${API_URL}${trimmedWord}`);
    // if (!trimmedWord || trimmedWord.split(" ").length > 1) {
    //   console.log("fuera");
    // } else {
    //   fetch(`${API_URL}${trimmedWord}`)
    //     .then((response) => response.json())
    //     .then((data) => setResult(data[0]))
    //     .catch((error) => setError(error));
    // }

    let inputValid = false;

    // Comprobar input
    if (word.length == 0) {
      setInputError("Debes introducir una palabra");
      console.log(error);
    } else if (word.indexOf(" ") >= 0) {
      setInputError("La palabra introducida no puedo contener espacios vacios");
      console.log(error);
    } else {
      setInputError("");
      inputValid = true;
    }

    // Si el valor introducido es valido
    // Hacer peticion a la API
    if (inputValid === true) {
      console.log("el valor introducido es valido");

      // No lo he implementado de esta manera porque:
      // "Estados HTTP anormales, como el 404 o 500 no generan errores"
      // Por eso no se me mostraba cuando se enviaba una palabra que no se encuentra a la API
      //   fetch(`${API_URL}${word}`)
      //     .then((response) => response.json())
      //     .then((data) => console.log(data[0]))
      //     .catch((error) => console.log("error"));

      fetch(`${API_URL}${word}`)
        .then((response) => {
          if (response.ok) {
            console.log(response.status);
            return response.json();
          } else {
            console.log("Error-HTTP: " + response.status);
            setResult(null);
            throw "Respuesta incorrecta del servidor";
          }
        })
        .then((responseJson) => {
          let data = responseJson[0];
          setResult(data);
          setError("");
        })
        .catch((error) => setError(error));
    }

    // console.log({ result });
    // console.log({ error });
    // console.log({ exist });
  };

  return (
    <>
      <Container maxW="600px">
        <Stack spacing={1} mb="30px">
          <Heading fontSize="2xl">Búsqueda de palabras</Heading>

          <Text>
            Busca significados y guárdalos para consultarlos rápidamente
          </Text>
        </Stack>
        <form onSubmit={searchWord}>
          <HStack spacing={4}>
            {/* <FormControl isInvalid={error}> */}
            <InputGroup>
              <Input
                variant="filled"
                placeholder="¿Qué palabra quieres buscar?"
                size="md"
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />

              <Button colorScheme="teal" onClick={searchWord} ml="10px">
                <SearchIcon color="white.300" />
              </Button>
            </InputGroup>
            {/* </FormControl> */}

            {/* <Button colorScheme="blue" onClick={searchWord}>
              Buscar
            </Button> */}
          </HStack>

          {errorinput.length > 0 && <Text mt="10px">{errorinput}</Text>}
        </form>
        {/* {result?.meanings &&
          result?.meanings.map((content) => {
            return <ContentWordPage {...result} />;
          })} */}
        {/* {result ? <p>hay significados</p> : <p>no hay significados</p>} */}
        {/* {result.meanings != undefined && result.meanings.length > 0 ? (
          <p>hay significados</p>
        ) : (
          <p>no hay significados</p>
        )} */}
        {/* {result && <p>hay definiciones</p> : <p>no</p>}

        {errorapi.length > 0 && <h3>No Definitions Found 😥</h3>} */}
        {/* {error && <h3>No se han encontrado definiciones 😥</h3>}

        {result && <p>hay definiciones</p>} */}
        {!error && !result ? (
          ""
        ) : error ? (
          <p>No se han encontrado definiciones 😥</p>
        ) : result ? (
          <ContentWordPage {...{ result }} />
        ) : (
          ""
        )}

        {/* {result && <ListDetails {...{ result }} />} */}

        {/* {error ? <p>error</p> : result ? <p>resultado</p> : <p>no se</p>} */}
        {/* {!error && !result
          ? ""
          : result != null && result.meanings.length > 0
          ? "result"
          : error.length > 0
          ? "No se han encontrado definiciones 😥"
          : "¡Qué edad tan inusual!"} */}
        {/* <Box>
          <Tabs>
            <TabList>
              <Tab>One</Tab>
              <Tab>Two</Tab>
              <Tab>Three</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box> */}
      </Container>
    </>
  );
}
