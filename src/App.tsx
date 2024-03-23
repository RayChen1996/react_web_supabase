import { useEffect, useState } from "react";

import "./App.css";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_URL,
  import.meta.env.VITE_KEY
);
function App() {
  console.log(import.meta.env.VITE_URL);
  console.log(import.meta.env.VITE_REFERENCEID); // "123"
  console.log(import.meta.env.VITE_KEY); // "123"
  const fetchData = async () => {
    const { data, error } = await supabase.from("countries").select();
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [count, setCount] = useState(0);

  return <></>;
}

export default App;
