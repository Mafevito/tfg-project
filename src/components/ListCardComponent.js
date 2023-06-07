export default function ListCardComponent({ list }) {
  const handleDelete = () => {
    alert("Eliminando");
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
