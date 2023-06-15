import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/supabase";
import { AuthContext } from "../context/AuthContext";

// Este context puede ser usado por otras partes de la app
export const BookmarkContext = createContext();

// Hook para poder usar este context
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  return context;
};

export const BookmarkContextProvider = ({ children }) => {
  const userLogged = useContext(AuthContext); // Obtener el usuario logueado
  const [bookmarks, setBookmarks] = useState([]);
  const [words, setWords] = useState([]);
  const [wordExist, setWordExist] = useState(false);

  // Funcion para obtener los bookmarks asociados al usuario logueado
  // const getBookmarks = async () => {
  //   const user = userLogged.user.user;
  //   const { error, data } = await supabase
  //     .from("bookmarks")
  //     .select()
  //     .eq("userId", user.id)
  //     .order("id", { ascending: true });

  //   if (error) throw error;

  //   setBookmarks(data);
  //   console.log(data);
  // };

  // Funcion para crear un bookmark 1
  // const createBookmark = async (listId, savedWord) => {
  //   console.log(savedWord);
  //   try {
  //     const user = userLogged.user.user;
  //     const { error, data } = await supabase
  //       .from("bookmarks")
  //       .insert(
  //         { listId: listId, word: savedWord.word, userId: user.id },
  //         { ignoreDuplicates: false }
  //       )
  //       .select();

  //     if (error) throw error;

  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Guardar palabra + info cuando es agregada a una lista
  const createBookmark = async (listId, savedWord) => {
    console.log(savedWord);
    try {
      const user = userLogged.user.user;
      const { error, data } = await supabase
        .from("words")
        .insert({
          word: savedWord.word,
          content_json: savedWord,
          listId: listId,
          userId: user.id,
        })
        .select();

      if (error) throw error;

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Guardar relacion entre una palabra y la lista a la que pertenece
  const getRelationWordList = async (listId) => {
    try {
      const user = userLogged.user.user;
      const { error, data } = await supabase
        .from("words")
        .select()
        //.eq("userId", user.id)
        .eq("listId", listId)
        .select();

      if (error) throw error;

      console.log(data);
      setWords(data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkExist = async (listId, word) => {
    try {
      const { data, error } = await supabase
        .from("words")
        .select("word, listId")
        .eq("word", word)
        .eq("listId", listId)
        .select();

      if (error) throw error;

      console.log(data);
      console.log(data.length);

      if (data.length > 0) {
        console.log("SI existe");
        setWordExist(true);
      } else {
        console.log("NO existe");
        setWordExist(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBookmarks = async () => {
    const user = userLogged.user.user;
    const { error, data } = await supabase
      .from("words")
      .select()
      .eq("userId", user.id)
      .order("id", { ascending: true });

    if (error) throw error;

    setBookmarks(data);
    console.log(data);
  };

  // Funcion para eliminar una palabra de una lista
  // teniendo en cuenta si el usuario logueado es el propietario de la lista
  const deleteWord = async (id) => {
    const user = userLogged.user.user;
    const { error, data } = await supabase
      .from("words")
      .delete()
      .eq("userId", user.id)
      .eq("id", id)
      .select();

    if (error) throw error;

    // Para que en "lists" se muestren todas menos la eliminada.
    // De esta manera no hace falta recargar la pag despues de la eliminacion
    setWords(words.filter((word) => word.id !== id));

    console.log(data);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        createBookmark,
        getBookmarks,
        getRelationWordList,
        words,
        checkExist,
        wordExist,
        deleteWord,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
