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
  useToast,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
// import { supabase } from "../supabase/supabase";
import { AuthContext } from "../context/AuthContext";
import { useLists } from "../context/ListContext";

export default function ProfileCreateListFormComponent() {
  const userLogged = useContext(AuthContext);
  console.log(userLogged);
  console.log(userLogged.user);
  console.log(userLogged.user.user);
  console.log(userLogged.user.user.id);

  const [listName, setListName] = useState("");
  const { createList, adding } = useLists();

  const toast = useToast(); // Para usar el toast de chackra-ui

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(adding);

    createList(listName);

    // Si la lista se ha creado correctamente se muestra un toast
    toast({
      title: "Lista creada.",
      description: "La lista ha sido creada correctamente.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    setListName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl id="name">
          <FormLabel>Nombre</FormLabel>
          <Input
            type="text"
            size="md"
            mame="name"
            placeholder="Escribe un nombre para la lista"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            focusBorderColor="#369496"
          />
        </FormControl>

        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Spacer />
          <Button
            mt="30px"
            mb="10px"
            colorScheme="teal"
            type="submit"
            disabled={adding}
          >
            {adding ? "Añadiendo.." : "Crear"}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}
