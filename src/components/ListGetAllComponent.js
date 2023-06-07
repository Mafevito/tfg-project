import { useEffect } from "react";
import { useLists } from "../context/ListContext";
import ListCardComponent from "./ListCardComponent";

export default function ListGetAllComponent() {
  // Obteneniendo arreglo de listas asociadas al usuario logueado desde ListContext
  const { lists, getLists, loading } = useLists();
  console.log(lists);

  // Se ejecuta al cargar el componente
  useEffect(() => {
    getLists();
  }, []);

  // Segun el estado de "loadig" renderizar una vista u otra
  function renderLists() {
    if (loading) {
      return <p>Cargando..</p>;
    } else if (lists.length === 0) {
      return <p>Listas no encontradas.</p>;
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
