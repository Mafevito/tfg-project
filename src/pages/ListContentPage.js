import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLists } from "../context/ListContext";
import { useBookmarks } from "../context/BookmarkContext";

export default function ListContentPage() {
  let params = useParams();
  //console.log(params);
  const { listId } = useParams();

  // console.log(listId);

  // const [list, setList] = useState(null);

  const { list, getList } = useLists();
  const { getRelationWordList, words } = useBookmarks();

  useEffect(() => {
    getList(listId);
    getRelationWordList(listId);
  }, []);

  return (
    <>
      <h2>ListContentPage</h2>
      {list.map((list) => (
        <>
          <h1>{list.name}</h1>
          <p>{JSON.stringify(list.publica)}</p>
        </>
      ))}
      <h2>Palabras dentro de esta lista:</h2>
      {words.map((word) => (
        <>
          <h1>{word.word}</h1>
        </>
      ))}
    </>
  );
}
