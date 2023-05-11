import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState } from "react";
import { clientsupabase } from "../supabase/client";

function Login() {
  // Estado que va a guardar el correo. Inicialmente va a estar vacio
  const [email, setEmail] = useState("");

  // Funcion a la que se llama cuando se hace clic en "Enviar"
  const handleSubmit = async (e) => {
    e.preventDefault(); // para evitar que la pag se recargue
    console.log(email);

    try {
      // Llama a la funcion de signIn de Supabase
      const result = await clientsupabase.auth.signInWithOtp({
        email: email,
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Introduce tu email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
