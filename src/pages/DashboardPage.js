import { useState } from "react";
import {
  Container,
  Heading,
  Input,
  InputGroup,
  Button,
  HStack,
  Text,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ContentWordPage from "./ContentWord/ContentWordPage";

export default function DashboardPage() {
  // Estado para almacenar la palabra introducida en el input
  // Estado para almacenar el resultado al llamar a la API
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  // Estados para mostrar errores al introducir datos no validos en el input
  const [errorinput, setInputError] = useState("");
  const [error, setError] = useState("");

  const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  // Funcion que hace la peticion a la API al hacer clic en boton "buscar"
  // pasandole la palabra introducida en el input
  const searchWord = (e) => {
    e.preventDefault();

    let inputValid = false;

    // Validar valor de input
    if (word.length === 0) {
      setInputError("Debes introducir una palabra");
    } else {
      setInputError("");
      inputValid = true;
    }

    // Si el valor introducido es valido
    // Hacer peticion a la API
    if (inputValid === true) {
      fetch(`${API_URL}${word}`)
        .then((response) => {
          if (response.ok) {
            //console.log(response.status);
            return response.json();
          } else {
            //console.log("Error-HTTP: " + response.status);
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
  };

  return (
    <>
      <Container maxW="675px">
        <Stack spacing={1} mb="30px">
          {/* <Heading fontSize="2xl">Búsqueda de palabras</Heading> */}

          <Text textAlign="left">
            Introduce una palabra para obtener su significado y más.
          </Text>
        </Stack>
        <form onSubmit={searchWord}>
          <HStack spacing={4}>
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Introduce una palabra.."
                size="md"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                focusBorderColor="#369496"
              />

              <Button colorScheme="teal" onClick={searchWord} ml="10px">
                <SearchIcon color="white.300" />
              </Button>
            </InputGroup>
          </HStack>

          {errorinput.length > 0 && <Text mt="50px">{errorinput}</Text>}
        </form>

        {!error && !result ? (
          ""
        ) : error ? (
          <Text mt="50px">No se han encontrado definiciones 😥.</Text>
        ) : result ? (
          <ContentWordPage {...{ result }} />
        ) : (
          ""
        )}
      </Container>
    </>
  );
}
