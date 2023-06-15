import { useState, useContext, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { supabase } from "../supabase/supabase";
import { AuthContext } from "../context/AuthContext";

export default function UserDataFormEditComponent() {
  const userLogged = useContext(AuthContext); // Obtener el usuario logueado
  // Para actualizar los datos del usuario logueado
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const toast = useToast(); // Para usar el toast de chackra-ui

  const handleSubmit = async (e) => {
    e.preventDefault(); // para evitar que la pag se recargue

    console.log("edit user");

    try {
      // Servicio auth de supabase para editar user
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name: name,
          username: username,
        },
      });

      if (error) throw error;

      console.log("user se ha actualizado correctamente");
      console.log(data);

      // Si el user se ha editado correctamente se muestra un toast
      toast({
        title: "Datos actualizados.",
        description: "Tus datos de usuario se han actualizado correctamente.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Establece los valores del usuario que actualmente tiene para poder editar
    setName(userLogged.user.user.user_metadata.name);
    setUsername(userLogged.user.user.user_metadata.username);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl id="name">
          <FormLabel>Nombre</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Edita tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            focusBorderColor="#369496"
          />
        </FormControl>
        <FormControl id="username">
          <FormLabel optionalIndicator>Nombre de usuario</FormLabel>
          <Input
            type="text"
            name="username"
            placeholder="Edita tu nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            focusBorderColor="#369496"
          />
        </FormControl>

        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Spacer />
          <Button
            mt="30px"
            mb="10px"
            colorScheme="teal"
            size="md"
            type="submit"
          >
            Guardar
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}
