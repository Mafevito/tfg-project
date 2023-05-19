import { supabase } from "../supabase/supabase";

export default function DashboardPage() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  return (
    <div>
      <h1>DashboardPage</h1>

      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
