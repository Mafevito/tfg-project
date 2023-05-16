import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Logo</Navbar.Brand>
          </LinkContainer>

          <Nav className="justify-content-end">
            <LinkContainer to="/login">
              <Nav.Link>Iniciar sesión</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Registrarse</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}
