import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Heading,
  Box,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { BsBoxArrowUpRight, BsTrash, BsArrowLeft } from "react-icons/bs";

import { useLists } from "../context/ListContext";
import { useWords } from "../context/WordsContext";
import { AuthContext } from "../context/AuthContext";

export default function ListContentPage() {
  const userLogged = useContext(AuthContext); // Obtener el usuario logueado
  const { list, getList } = useLists();
  const { getRelationWordList, words, deleteWord } = useWords();

  const { listId } = useParams(); // Obtener listId desde la url

  // Para luego comprobar si el user que ha guardado la palabra en una lista es igual al usuario logueado,
  // si es así le aparece la acción de eliminar la palabra de la lista, ya que significa que es propietario de la lista
  const user = userLogged.user.user.id;

  // Para eliminar una palabra de la lista solo si eres propietario de ella
  // se pasa el wordId que corresponde al id de la relacion
  const handleDelete = (wordId) => {
    deleteWord(wordId);
  };

  useEffect(() => {
    getList(listId);
    getRelationWordList(listId);
  }, []);

  return (
    <Container maxW="675px">
      <Text textAlign="left">
        <Link to={`/explorar-listas`}>
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

      <Box mt="50px" p="2" align="left">
        {list.map((list) => (
          <>
            <Heading as="h4" size="md" mb="5px">
              {list.name}
            </Heading>

            <HStack>
              <Text color="gray" fontSize="md">
                Creado por @{list.user.name} · {words.length} palabras
              </Text>
            </HStack>
          </>
        ))}
      </Box>

      <Box mt="60px">
        {words.length > 0 ? (
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Palabras que contiene esta lista.</TableCaption>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Palabra</Th>
                  <Th isNumeric>Acción</Th>
                </Tr>
              </Thead>
              <Tbody>
                {words.map((word, index) => (
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{word.word}</Td>
                    <Td isNumeric>
                      <Flex alignItems="center" justifyContent={"end"} gap="2">
                        <Link to={`/lista/${listId}/word/${word.word}`}>
                          <IconButton
                            size="xs"
                            color="black"
                            aria-label="Ver más sobre la palabra"
                            icon={<BsBoxArrowUpRight />}
                          />
                        </Link>
                        {word.userId === user ? (
                          <IconButton
                            size="xs"
                            aria-label="Eliminar lista"
                            color="white"
                            bg={"red.400"}
                            _hover={{
                              bg: "red.500",
                            }}
                            icon={<BsTrash />}
                            onClick={() => handleDelete(word.id)}
                          />
                        ) : (
                          ""
                        )}
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          "Esta lista no contiene palabras."
        )}
      </Box>
    </Container>
  );
}
