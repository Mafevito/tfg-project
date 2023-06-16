import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"950px"}
        // columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 20 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }} zIndex={"2"}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "5xl" }}
          >
            Encuentra significados de palabras y guárdalos para consultarlos
            rápidamente.
          </Heading>
        </Stack>
        <Stack direction="column" align="center">
          <Box
            as="button"
            borderRadius="md"
            bg="teal"
            color="white"
            px={8}
            h={12}
          >
            <Link to={`/register`}>Vamos allá</Link>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={10}
        left={-10}
        style={{ filter: "blur(90px)" }}
      />
    </Box>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
