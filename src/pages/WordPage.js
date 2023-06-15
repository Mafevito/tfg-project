import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, IconButton, Text } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";

import ContentWordPage2 from "./ContentWord/ContentWordPage2";

export default function WordPage() {
  const { listId, word } = useParams(); // Obtener listId y word desde la url
  const [result, setResult] = useState(null);
  const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  useEffect(() => {
    fetch(`${API_URL}${word}`)
      .then((response) => {
        if (response.ok) {
          //console.log(response.status);
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
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Container maxW="675px">
        <Text textAlign="left">
          <Link to={`/lista/${listId}`}>
            <IconButton
              size="sm"
              colorScheme="white"
              color="black"
              aria-label="Volver atrás"
              icon={<BsArrowLeft />}
            />
            Volver atrás
          </Link>
        </Text>
      </Container>

      {result ? <ContentWordPage2 {...{ result }} /> : ""}
    </>
  );
}
