import {
  Flex,
  HStack,
  Heading,
  Spacer,
  Link,
  StackDivider,
  Text,
  Container,
} from "@chakra-ui/react";
import { Outlet, Link as RouteLink } from "react-router-dom";

const NavLink = ({ text }) => (
  <Link>
    <Text fontSize="lg">{text}</Text>
  </Link>
);

export default function NavbarComponent() {
  return (
    <Container maxW="1200px">
      <Flex as="nav" p="20px" mb="80px" alignItems="center" bg="gray.200">
        <Heading as="h1">
          <RouteLink to="/">
            <NavLink text="LOGO" />
          </RouteLink>
        </Heading>
        <Spacer />

        <HStack spacing={3} divider={<StackDivider />} as="nav">
          <RouteLink to="/login">
            <NavLink text="Acceder" />
          </RouteLink>
          <RouteLink to="/register">
            <NavLink text="Registrarse" />
          </RouteLink>
        </HStack>
      </Flex>

      <Outlet />
    </Container>
  );
}
