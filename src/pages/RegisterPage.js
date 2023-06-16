import { useState } from "react";
import {
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Container,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import useForm from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";

// Declarar initialState
const initialState = {
  name: "",
  email: "",
  username: "",
  password: "",
};

function RegisterPage() {
  // Hacer referencia al Custom Hook y desestructurar lo que retorna
  const { formValues, handleInputChange } = useForm(initialState);

  // Para usar la opcion de mostrar password de chakra
  const [showPassword, setShowPassword] = useState(false);

  // Para obtener la funcion y errores devueltos por servicio Auth de Supabase desde AuthContext
  const { registerUser, isError, showAlertError, showAlertGood } = useAuth();

  // Funcion a la que se llama cuando se hace clic en "Enviar"
  const handleSubmit = async (e) => {
    e.preventDefault(); // para evitar que la pag se recargue

    // Desestructuracion de formValues
    const { name, email, username, password } = formValues;

    registerUser(email, password, name, username);
  };

  return (
    <>
      <Container>
        <Heading fontSize="2xl" mb="20">
          Registrarse
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Introduce tu nombre"
                value={formValues.name}
                onChange={handleInputChange}
                focusBorderColor="#369496"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Introduce tu email"
                value={formValues.email}
                onChange={handleInputChange}
                focusBorderColor="#369496"
              />
            </FormControl>
            <FormControl id="username">
              <FormLabel optionalIndicator>Nombre de usuario</FormLabel>
              <Input
                type="text"
                name="username"
                placeholder="Introduce tu nombre de usuario"
                value={formValues.username}
                onChange={handleInputChange}
                focusBorderColor="#369496"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Introduce una contraseña"
                  value={formValues.password}
                  onChange={handleInputChange}
                  focusBorderColor="#369496"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {showAlertError && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{isError}</AlertDescription>
              </Alert>
            )}

            {showAlertGood && (
              <Alert status="success">
                <AlertIcon />
                <AlertDescription>
                  Usuario creado correctamente.
                </AlertDescription>
              </Alert>
            )}

            <Button colorScheme="teal" type="submit">
              Crear cuenta
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default RegisterPage;
