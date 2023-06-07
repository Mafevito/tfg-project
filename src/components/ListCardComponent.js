import { useLists } from "../context/ListContext";

export default function ListCardComponent({ list }) {
  const { deleteList } = useLists();

  const handleDelete = () => {
    alert("Eliminando");
    deleteList(list.id);
  };

  const handleTogglePublica = () => {
    alert("Cambiar a lista privada");
  };

  return (
    <>
      <h1>{list.name}</h1>
      <p>{JSON.stringify(list.publica)}</p>

      <button onClick={() => handleDelete()}>Eliminar</button>
      <button onClick={() => handleTogglePublica()}>Publica</button>
    </>
  );
}
