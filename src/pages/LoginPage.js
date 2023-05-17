import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientsupabase } from "../supabase/supabase";

function LoginPage() {
  // Instanciar para poder usarlo
  const navigate = useNavigate();

  // Estado que va a guardar el correo. Inicialmente va a estar vacio
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Funcion a la que se llama cuando se hace clic en "Enviar"
  const handleSubmit = async (e) => {
    e.preventDefault(); // para evitar que la pag se recargue
    console.log(email);

    try {
      // Llama a la funcion de 'signInWithPassword' de Supabase
      const result = await clientsupabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      console.log(result);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Introduce tu email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Introduce tu contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Iniciar sesión
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
