import { useEffect } from "react";
import { useLists } from "../context/ListContext";
import { useWords } from "../context/WordsContext";

import ListCardComponent from "./ListCardComponent";

export default function ProfileUserListsGetAllComponent() {
  // Obteneniendo arreglo de listas asociadas al usuario logueado desde ListContext
  const { lists, getLists, loading } = useLists();
  const { words, getWords } = useWords();

  // Se ejecuta al cargar el componente
  useEffect(() => {
    getLists();
    getWords();
  }, []);

  // Segun el estado de "loadig" renderizar una vista u otra.
  function renderLists() {
    if (loading) {
      return <p>Cargando..</p>;
    } else if (lists.length === 0) {
      return <p>Listas aún no creadas.</p>;
    } else {
      return (
        <>
          {lists.map((list) => (
            <ListCardComponent list={list} />
          ))}
        </>
      );
    }
  }

  return <div>{renderLists()}</div>;
}
