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
import { Outlet, Link as RouteLink } from "react-router-dom";
import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../supabase/supabase";

const NavLink = ({ text }) => (
  <Link>
    <Text fontSize="lg">{text}</Text>
  </Link>
);

export default function NavbarComponent() {
  const userLogged = useContext(AuthContext);
  console.log(userLogged);
  console.log(userLogged.user);

  // Funcion auth de supabase para cerrar sesion
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

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
        {userLogged.user != null ? (
          <HStack direction={"row"} spacing={7}>
            <RouteLink to="#">
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
                <MenuItem>Mis listas</MenuItem>
                <MenuItem>Configurar perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
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
