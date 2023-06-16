import {
  Flex,
  HStack,
  Heading,
  Spacer,
  Link,
  StackDivider,
  Text,
  Container,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { Outlet, Link as RouteLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavLink = ({ text }) => (
  <Link>
    <Text fontSize="lg">{text}</Text>
  </Link>
);

export default function NavbarComponent() {
  // Para obtener la funcion de servicio Auth de Supabase desde AuthContext
  const { logoutUser, user } = useAuth();
  console.log(user);

  return (
    <Container maxW="1200px">
      <Flex
        as="nav"
        p="20px"
        mb="80px"
        alignItems="center"
        bg="white"
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
      >
        {user ? (
          <Heading as="h1">
            <RouteLink to="/dashboard">
              <NavLink text="IMACHAI" />
            </RouteLink>
          </Heading>
        ) : (
          <Heading as="h1">
            <RouteLink to="/">
              <NavLink text="IMACHAI" />
            </RouteLink>
          </Heading>
        )}
        <Spacer />

        {/* Segun si hay user logueado se muestra un menu u otro */}
        {user ? (
          <HStack direction={"row"} spacing={7}>
            <RouteLink to="dashboard">
              <NavLink text="Buscador" />
            </RouteLink>
            <RouteLink to="/explorar-listas">
              <NavLink text="Explorar listas" />
            </RouteLink>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <IconButton
                  aria-label="Search database"
                  colorScheme="white"
                  color="gray.500"
                  fontSize="30px"
                  icon={<FaUserCircle />}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <p>{user.user.user_metadata.name}</p>
                </Center>
                <br />
                <MenuDivider />

                <RouteLink to="/perfil">
                  <MenuItem>
                    <NavLink text="Perfil" />
                  </MenuItem>
                </RouteLink>

                <MenuItem onClick={logoutUser} fontSize="lg">
                  Cerrar sesión
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <HStack spacing={3} divider={<StackDivider />} as="nav">
            <RouteLink to="/login">
              <NavLink text="Acceder" />
            </RouteLink>
            <RouteLink to="/register">
              <NavLink text="Registrarse" />
            </RouteLink>
          </HStack>
        )}
      </Flex>

      <Outlet />
    </Container>
  );
}
