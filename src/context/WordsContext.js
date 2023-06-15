import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/supabase";
import { AuthContext } from "./AuthContext";

// Este context puede ser usado por otras partes de la app
export const WordContext = createContext();

// Hook para poder usar este context
export const useWords = () => {
  const context = useContext(WordContext);
  return context;
};

export const WordContextProvider = ({ children }) => {
  const userLogged = useContext(AuthContext); // Obtener el usuario logueado
  const [words, setWords] = useState([]);
  const [wordExist, setWordExist] = useState(false);
  const [oneWord, setOneWord] = useState([]);

  // Guardar palabra + info cuando es agregada a una lista
  const createWord = async (listId, savedWord) => {
    try {
      const user = userLogged.user.user;
      const { error, data } = await supabase
        .from("words")
        .insert({
          word: savedWord.word,
          // content_json: savedWord,
          listId: listId,
          userId: user.id,
        })
        .select();

      if (error) throw error;

      //console.log(data);
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

      //console.log(data);
      setWords(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener la columna "word" y "listId" que coincide con "word" y "listId" pasados desde ContentWordPage
  const checkExist = async (listId, word) => {
    try {
      const { data, error } = await supabase
        .from("words")
        .select("word, listId")
        .eq("word", word)
        .eq("listId", listId)
        .select();

      if (error) throw error;

      //console.log(data);

      if (data.length > 0) {
        //console.log("SI existe");
        setWordExist(true);
      } else {
        //console.log("NO existe");
        setWordExist(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener todas las palabras
  const getWords = async () => {
    const user = userLogged.user.user;
    const { error, data } = await supabase
      .from("words")
      .select()
      .eq("userId", user.id)
      .order("id", { ascending: true });

    if (error) throw error;

    setWords(data);
    //console.log(data);
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
    //console.log(data);
  };

  // Funcion para obtener una palabra en concreto
  const getWord = async (listId, word) => {
    const user = userLogged.user.user;
    const { error, data } = await supabase
      .from("words")
      .select()
      //.eq("userId", user.id)
      .eq("listId", listId)
      .eq("word", word);
    //.select();

    if (error) throw error;

    //console.log(data);
    setOneWord(data);
  };

  return (
    <WordContext.Provider
      value={{
        words,
        createWord,
        getWords,
        getRelationWordList,
        words,
        checkExist,
        wordExist,
        deleteWord,
        getWord,
        oneWord,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};
