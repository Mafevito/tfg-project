import { useLists } from "../context/ListContext";

export default function HomePage() {
  // Probando el ListContext
  const obj = useLists();
  console.log(obj);

  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
}
