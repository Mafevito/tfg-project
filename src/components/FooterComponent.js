import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function FooterComponent() {
  return (
    <Box bg="white" color={useColorModeValue("gray.700", "gray.200")}>
      <Container as={Stack} py={100}>
        <Text>© 2023 Proyecto DAW - MF.</Text>
      </Container>
    </Box>
  );
}
