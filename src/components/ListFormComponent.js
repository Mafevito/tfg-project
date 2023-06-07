import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
  Button,
  Checkbox,
  Box,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
// import { supabase } from "../supabase/supabase";
import { AuthContext } from "../context/AuthContext";
import { useLists } from "../context/ListContext";

export default function ListFormComponent() {
  const userLogged = useContext(AuthContext);
  console.log(userLogged);
  console.log(userLogged.user);
  console.log(userLogged.user.user);
  console.log(userLogged.user.user.id);

  const [listName, setListName] = useState("");
  const { createList, adding } = useLists();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(adding);

    createList(listName);

    setListName("");

    // Insertar el "Nombre de la lista" en la tabla "lists"
    // try {
    //   const user = userLogged.user.user;
    //   const result = await supabase.from("lists").insert({
    //     name: listName,
    //     userId: user.id,
    //   });
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Box align="left">
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              size="md"
              mame="name"
              placeholder="Escribe un nombre para la lista"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            {/* <Checkbox defaultChecked mt="10px" mb="15px">
              Privada
            </Checkbox> */}
          </FormControl>

          <Flex minWidth="max-content" alignItems="center" gap="2">
            <Spacer />
            <Button
              colorScheme="teal"
              size="md"
              type="submit"
              disabled={adding}
            >
              {adding ? "Añadiendo.." : "Crear"}
            </Button>
          </Flex>
        </Box>
      </Stack>
    </form>
  );
}
