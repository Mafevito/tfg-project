import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Heading,
  Box,
  HStack,
  Text,
  Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { BsBoxArrowUpRight, BsTrash } from "react-icons/bs";

import { useLists } from "../context/ListContext";
import { useBookmarks } from "../context/BookmarkContext";
import { AuthContext } from "../context/AuthContext";

export default function ListContentPage() {
  let params = useParams();
  //console.log(params);
  const { listId } = useParams();

  const { list, getList } = useLists();
  const { getRelationWordList, words, deleteWord } = useBookmarks();
  const userLogged = useContext(AuthContext); // Obtener el usuario logueado

  console.log(words);
  console.log(userLogged);

  // Para luego comprobar si el user que ha guardado la palabra en una lista es igual al usuario logueado,
  // si es así le aparece la acción de eliminar la palabra de la lista, ya que significa que es propietario de la lista
  const user = userLogged.user.user.id;

  // Para eliminar una palabra de la lista solo si eres propietario de ella
  // se pasa el wordId que corresponde al id de la relacion
  const handleDelete = (wordId) => {
    alert("Eliminar palabra de la lista" + wordId);
    deleteWord(wordId);
  };

  useEffect(() => {
    getList(listId);
    getRelationWordList(listId);
  }, []);

  return (
    // <>
    //   <h2>ListContentPage</h2>
    //   {list.map((list) => (
    //     <>
    //       <h1>{list.name}</h1>
    //       <p>{JSON.stringify(list.publica)}</p>
    //     </>
    //   ))}
    //   <h2>Palabras dentro de esta lista:</h2>
    //   {words.map((word) => (
    //     <>
    //       <h1>{word.word}</h1>
    //     </>
    //   ))}
    // </>

    <Container maxW="675px">
      {list.map((list) => (
        <Box p="2" align="left">
          <Heading as="h4" size="md" mb="5px">
            {list.name}
          </Heading>

          <HStack>
            <Text color="gray" fontSize="md">
              Creado por @{list.user.name} · {words.length} palabras
            </Text>
          </HStack>
        </Box>
      ))}
      <Divider />

      <Box mt="60px">
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
      </Box>
    </Container>
  );
}
