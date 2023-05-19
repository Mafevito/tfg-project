import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
    }
  };

  return (
    <Container>
      <h2>Registrarse</h2>
      <p>Introduce tus datos para crear una cuenta nueva.</p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Introduce tu nombre"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Introduce tu email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Introduce tu nombre de usuario"
            value={formValues.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Introduce una contraseña"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear cuenta
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterPage;
