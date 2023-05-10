import { createClient } from "@supabase/supabase-js";

// Configurar createClient.
// Sirve para interactuar con la base de datos de supabase.
// Leyendo las credenciales como variables de entorno.
createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
