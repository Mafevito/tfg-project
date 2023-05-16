import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState } from "react";
import { clientsupabase } from "../supabase/client";

function RegisterPage() {
  // Estado que va a guardar los datos de registro. Inicialmente va a estar vacio
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Funcion a la que se llama cuando se hace clic en "Crear cuenta"
  const handleSubmit = async (e) => {
    e.preventDefault(); // para evitar que la pag se recargue
    console.log(name, email, username, password);
  };

  return (
    <Container>
      <h2>Registrarse</h2>
      <p>Introduce tus datos para crear una cuenta nueva.</p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Introduce tu nombre"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Introduce tu email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Introduce tu nombre de usuario"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Introduce una contraseña"
            onChange={(e) => setPassword(e.target.value)}
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
