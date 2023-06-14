import { useEffect } from "react";
import { useLists } from "../context/ListContext";
import { useBookmarks } from "../context/BookmarkContext";

import ListCardComponent from "./ListCardComponent";

export default function ProfileUserListsGetAllComponent() {
  // Obteneniendo arreglo de listas asociadas al usuario logueado desde ListContext
  const { lists, getLists, loading } = useLists();
  const { bookmarks, getBookmarks } = useBookmarks();
  console.log(lists);

  // Se ejecuta al cargar el componente
  useEffect(() => {
    getLists();
    getBookmarks();
  }, []);

  // Segun el estado de "loadig" renderizar una vista u otra
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
