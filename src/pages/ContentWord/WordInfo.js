import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  ListItem,
  ListIcon,
  OrderedList,
  Flex,
  Spacer,
  Heading,
} from "@chakra-ui/react";

// export default function WordInfo({ definitions }) {
//   console.log(definitions);

//   return (
//     <>
//       <h1>word definition</h1>

//       <TabPanels>
//         {definitions.map((def, index) => {
//           return <TabPanel>{def.definition}</TabPanel>;
//         })}
//       </TabPanels>
//     </>
//   );
// }

export default function WordInfo({ partOfSpeech, definitions, content }) {
  console.log(partOfSpeech);
  console.log(definitions);

  console.log(content);

  return (
    <>
      {/* <h1>word definition</h1>

      <Tabs>
        <Tab>{partOfSpeech}</Tab>

        <TabPanels>
          {definitions.map((def, index) => (
            <TabPanel>{def.definition}</TabPanel>
          ))}
        </TabPanels>
      </Tabs> */}

      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#f2f2f2" }}>
            <Box as="span" flex="1" textAlign="left">
              {partOfSpeech}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>

        {/* Si tiene más de una definicion se mostrara en formato de lista ordenado, si no, no. */}

        <AccordionPanel pb={4} textAlign="left">
          {definitions.length > 1
            ? definitions.map((def, index) => (
                <Text>
                  {index + 1}. {def.definition}
                </Text>
              ))
            : definitions.map((def, index) => <Text>{def.definition}</Text>)}
        </AccordionPanel>

        {/* <AccordionPanel pb={4} >
          {definitions.map((def, index) => (
            <Text>{def.definition}</Text>
          ))}
        </AccordionPanel> */}
      </AccordionItem>
    </>
  );
}
