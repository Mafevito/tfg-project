import { supabase } from "./supabase";

// Crear nuevo usuario
// data sera un objeto que tiene email y password de user
export const registerWithEmail = async (data, user_metadata) => {
  let result;

  try {
    result = await supabase.auth.signUp(data, user_metadata);
    return result;
  } catch (error) {
    console.log(error);
  }
  return result;
};
