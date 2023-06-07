import { useEffect } from "react";
import { useLists } from "../context/ListContext";

export default function ListGetAllComponent() {
  // Obteneniendo arreglo de listas asociadas al usuario logueado desde ListContext
  const { lists, getLists } = useLists();
  console.log(lists);

  // Se ejecuta al cargar el componente
  useEffect(() => {
    getLists();
  }, []);

  return (
    <>
      {lists.map((list) => (
        <>
          <h1>{list.name}</h1>
          <p>{JSON.stringify(list.publica)}</p>
        </>
      ))}
    </>
  );
}
