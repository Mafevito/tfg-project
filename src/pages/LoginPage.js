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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

import useForm from "../hooks/useForm";

// Declarar initialState
const initialState = {
  email: "",
  password: "",
};

function LoginPage() {
  // Instanciar para poder usarlo
  const navigate = useNavigate();

  // Hacer referencia al Custom Hook y desestructurar lo que retorna
  const { formValues, handleInputChange } = useForm(initialState);
  // Para usar la opcion de mostrar password de chakra
  const [showPassword, setShowPassword] = useState(false);
  // Para guardar errores devueltos desde servicio de auth de supabase
  const [isError, setError] = useState("");
  // Para mostrar la alerta con el error
  const [showAlertError, setShowAlertError] = useState(false);

  // Funcion a la que se llama cuando se hace clic en "Enviar"
  const handleSubmit = async (e) => {
    e.preventDefault(); // para evitar que la pag se recargue

    console.log(formValues);

    // Desestructuracion de formValues
    const { email, password } = formValues;

    try {
      // Servicio auth de supabase para hacer login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      console.log("user se ha logueado correctamente");
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
      console.log(isError);
      setShowAlertError(true);
    }
  };

  return (
    <>
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
    </>
  );
}

export default LoginPage;
