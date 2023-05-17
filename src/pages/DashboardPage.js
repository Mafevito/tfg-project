import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { clientsupabase } from "../supabase/supabase";

export default function DashboardPage() {
  // Instanciar para poder usarlo
  const navigate = useNavigate();

  const cerrarsesion = async () => {
    const { error } = await clientsupabase.auth.signOut();
    console.log(error);
  };

  useEffect(() => {
    if (clientsupabase.auth.getSession()) {
      navigate("/dashboard");
      console.log(clientsupabase.auth.getSession());
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>DashboardPage</h1>

      <button onClick={() => cerrarsesion()}>Cerrar sesión</button>
    </div>
  );
}
