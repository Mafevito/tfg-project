import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Container, IconButton, Text } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";

import ContentWordPage from "./ContentWord/ContentWordPage";

export default function WordPage() {
  let params = useParams();
  console.log(params);
  const { listId, word } = useParams();
  //const history = useHistory();
  const [result, setResult] = useState(null);
  const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  console.log(result);

  useEffect(() => {
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
        //setError("");
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Container>
        {/* <IconButton
        aria-label="Search database"
        icon={<BsArrowLeft />}
        //onClick={history.goBack}
      /> */}

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

      {result ? <ContentWordPage {...{ result }} /> : ""}
    </>
  );
}
