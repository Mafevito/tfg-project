// import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import {
  Heading,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Container,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useState } from "react";

import { supabase } from "../supabase/supabase";

import useForm from "../hooks/useForm";
import { registerWithEmail } from "../supabase/authService";

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

  //const isError = formValues === "";

  // Para usar la opcion de mostrar password de chakra
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  let errorMessage;

  // Funcion a la que se llama cuando se hace clic en "Enviar"
  const handleSubmit = async (e) => {
    // e.preventDefault(); // para evitar que la pag se recargue
    // console.log(formValues);
    // // Desestructuracion de formValues
    // const { name, email, username, password } = formValues;
    // // Llama al servicio auth de supabase
    // const result = await registerWithEmail({ email, password });
    // console.log(result);

    e.preventDefault(); // para evitar que la pag se recargue

    console.log(formValues);

    // Desestructuracion de formValues
    const { name, email, username, password } = formValues;

    try {
      // Servicio auth de supabase para crear user
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
            username: username,
          },
        },
      });

      if (error) throw error;
      //setError(error);

      console.log("user se ha creado correctamente");
      console.log(data);

      // obtener user autentificado
      if (data) {
        const user = supabase.auth.getUser();

        const data = {
          id: user.id,
          name: user.name,
        };
      }
    } catch (error) {
      console.log(error);
      errorMessage = error.message;
      console.log(errorMessage);
      setShowAlert(true);
      setError(error.message);
      console.log(isError);
    }
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
              />
            </FormControl>
            <FormControl id="password" isInvalid={isError} isRequired>
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

              {!isError ? (
                <FormHelperText>no error</FormHelperText>
              ) : (
                <FormErrorMessage>{isError}</FormErrorMessage>
              )}
            </FormControl>

            {showAlert && (
              <Alert status="error">
                <AlertIcon />
                {`error ${isError}`}
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
