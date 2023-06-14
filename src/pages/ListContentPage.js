import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@chakra-ui/react";

import { useLists } from "../context/ListContext";
import { useBookmarks } from "../context/BookmarkContext";

export default function ListContentPage() {
  let params = useParams();
  //console.log(params);
  const { listId } = useParams();

  // console.log(listId);

  // const [list, setList] = useState(null);

  const { list, getList } = useLists();
  const { getRelationWordList, words } = useBookmarks();

  console.log(words);

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
                <Th isNumeric></Th>
              </Tr>
            </Thead>
            <Tbody>
              {words.map((word, index) => (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{word.word}</Td>
                  <Td isNumeric>boton</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
