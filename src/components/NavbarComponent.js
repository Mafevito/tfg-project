import {
  Flex,
  HStack,
  Heading,
  Spacer,
  Link,
  StackDivider,
  Text,
  Container,
  Box,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { Outlet, Link as RouteLink, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../supabase/supabase";
import { useAuth } from "../context/AuthContext";

const NavLink = ({ text }) => (
  <Link>
    <Text fontSize="lg">{text}</Text>
  </Link>
);

export default function NavbarComponent() {
  // const userLogged = useContext(AuthContext);
  // console.log(userLogged);
  // console.log(userLogged.user);

  const navigate = useNavigate();

  // Para obtener la funcion de servicio Auth de Supabase desde AuthContext
  const { logoutUser, user } = useAuth();

  console.log(user);

  return (
    <Container maxW="1200px">
      <Flex as="nav" p="20px" mb="80px" alignItems="center" bg="white">
        <Heading as="h1">
          <RouteLink to="/">
            <NavLink text="LOGO" />
          </RouteLink>
        </Heading>
        <Spacer />

        {/* {userLogged.user != null ? <p>si hay user</p> : <p>no hay user</p>} */}

        {/* Segun si hay user logueado se muestra un menu u otro */}
        {user ? (
          <HStack direction={"row"} spacing={7}>
            <RouteLink to="dashboard">
              <NavLink text="Inicio" />
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
                <Avatar
                  size={"sm"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </Center>
                <br />
                <Center>
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />

                <RouteLink to="/perfil">
                  <MenuItem>
                    <NavLink text="Perfil" />
                  </MenuItem>
                </RouteLink>

                <MenuItem onClick={logoutUser}>Cerrar sesión</MenuItem>
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
