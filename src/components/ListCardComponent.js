import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useLists } from "../context/ListContext";
import { useState, useContext, useEffect } from "react";
import ListFormEditComponent from "./ListFormEditComponent";

export default function ListCardComponent({ list }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteList, updateList } = useLists();

  const [listName, setListName] = useState("");
  const [isPublica, setIsPublica] = useState();
  const [isChecked, setIsChecked] = useState(false);

  console.log({ list });

  console.log(isChecked);

  const handleDelete = () => {
    alert("Eliminando");
    deleteList(list.id);
  };

  // const handleTogglePublica = () => {
  //   alert("Cambiar a lista privada");
  //   updateList(list.id, { publica: !list.publica });
  // };

  const handleOnChange = () => {
    setIsChecked(!isChecked);

    console.log(isChecked);
  };

  const handleUpdate = () => {
    alert("Actualizar lista");
    updateList(list.id, { name: listName, publica: isChecked });
  };

  useEffect(() => {
    // Establece los valores que actualmente tiene la lista para poder editar
    setListName(list.name);
    setIsPublica(list.publica);
    setIsChecked(list.publica);

    console.log(list.publica);

    console.log(isPublica);
    console.log(isChecked);

    // if (list.publica) {
    //   setIsChecked(true);
    //   console.log(isChecked);
    // } else {
    //   setIsChecked(false);
    //   console.log("no es false");
    // }
  }, []);

  return (
    <>
      <h1>{list.name}</h1>
      <p>{JSON.stringify(list.publica)}</p>

      <button onClick={() => handleDelete()}>Eliminar</button>
      {/* <button onClick={() => handleTogglePublica()}>Editar</button> */}

      {/* Modal para editar una lista */}
      <Button onClick={onOpen}>Editar</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar lista</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                size="md"
                mame="name"
                placeholder="Escribe otro nombre para la lista"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </FormControl>

            <Text>Lista {isPublica ? "publica" : "privada"}.</Text>

            <FormControl mt={4}>
              <FormLabel>
                {" "}
                El checkbox esta {isChecked ? "checked" : "un-checked"}.
              </FormLabel>
              {/* <Input placeholder="Last name" /> */}

              <Checkbox
                name="publica"
                checked={isChecked}
                onChange={handleOnChange}
              >
                {isPublica
                  ? "Hacer la lista privada"
                  : "Hacer la lista publica"}
              </Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
