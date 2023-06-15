import {
  Box,
  Text,
  ListItem,
  ListIcon,
  Heading,
  List,
  HStack,
} from "@chakra-ui/react";
import { RxDotFilled } from "react-icons/rx";

export default function WordInfo({
  partOfSpeech,
  definitions,
  synonyms,
  antonyms,
}) {
  return (
    <>
      <Box>
        <Heading size="xs" textTransform="uppercase">
          {partOfSpeech}
        </Heading>

        <Heading
          as="h5"
          size="xs"
          color="gray"
          fontWeight="normal"
          mb="10px"
          mt="15px"
        >
          Significado
        </Heading>

        <Box pt="2">
          {definitions.length > 1
            ? definitions.map((def, index) => (
                <>
                  <Text ml="15px">
                    <Text as="span" color="teal">
                      {index + 1}.
                    </Text>{" "}
                    {def.definition}
                  </Text>

                  <List ml="30px">
                    {def.example ? (
                      <ListItem ml="15px" color="gray" mb="10px" mt="6px">
                        "{def.example}"
                      </ListItem>
                    ) : (
                      "no tiene ejemplo"
                    )}
                  </List>
                </>
              ))
            : definitions.map((def, index) => (
                <>
                  <List ml="15px">
                    <ListItem>
                      <ListIcon as={RxDotFilled} color="teal" />
                      {def.definition}
                    </ListItem>
                  </List>
                </>
              ))}

          {synonyms.length > 0 ? (
            <>
              <HStack mb="10px" mt="15px">
                <Heading as="h5" size="xs" color="gray" fontWeight="normal">
                  Sinonimos:
                </Heading>

                {synonyms.map((syn, index) => (
                  <>
                    <Text>{syn}</Text>
                  </>
                ))}
              </HStack>
            </>
          ) : (
            ""
          )}

          {antonyms.length > 0 ? (
            <>
              <HStack mb="10px" mt="15px">
                <Heading as="h5" size="xs" color="gray" fontWeight="normal">
                  Antonimos:
                </Heading>
                {antonyms.map((ant, index) => (
                  <>
                    <Text>{ant}</Text>
                  </>
                ))}
              </HStack>
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
}
