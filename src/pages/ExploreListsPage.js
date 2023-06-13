import { useEffect } from "react";
import { useLists } from "../context/ListContext";

export default function ExploreListPage() {
  const { allLists, getAllLists, loading } = useLists();

  // Se ejecuta al cargar el componente
  useEffect(() => {
    getAllLists();
  }, []);

  // Segun el estado de "loadig" renderizar una vista u otra
  function renderLists() {
    if (loading) {
      return <p>Cargando..</p>;
    } else if (allLists.length === 0) {
      return <p>Listas no encontradas.</p>;
    } else {
      return (
        <>
          {allLists.map((list) => (
            <>
              <h1>{list.name}</h1>
              <p>{JSON.stringify(list.publica)}</p>
              <p>creada por: {list.user.name}</p>
            </>
          ))}
        </>
      );
    }
  }

  return <div>{renderLists()}</div>;

  // return <>ExploreListPage</>;
}
