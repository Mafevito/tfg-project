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
  email: "",
  password: "",
};

export default function LoginPage() {
  // Hacer referencia al Custom Hook y desestructurar lo que retorna
  const { formValues, handleInputChange } = useForm(initialState);
  // Para usar la opcion de mostrar password de chakra
  const [showPassword, setShowPassword] = useState(false);
  // Para obtener la funcion loginUser y errores devueltos por servicio Auth de Supabase desde AuthContext
  const { loginUser, isError, showAlertError } = useAuth();

  // Funcion a la que se llama cuando se hace clic en "Enviar"
  const handleSubmit = async (e) => {
    e.preventDefault(); // para evitar que la pag se recargue

    // Desestructuracion de formValues
    const { email, password } = formValues;

    // Se loguea un user
    loginUser(email, password);
  };

  return (
    <Container>
      <Heading fontSize="2xl" mb="20">
        Iniciar sesión
      </Heading>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Introduce tu email"
              value={formValues.email}
              onChange={handleInputChange}
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

          <Button colorScheme="teal" type="submit">
            Iniciar sesión
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
