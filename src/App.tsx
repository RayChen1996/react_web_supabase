import { useEffect, useState } from "react";

import "./App.css";
import { createClient } from "@supabase/supabase-js";

import { faker } from "@faker-js/faker";

import { Countries } from "./Schema/User";
// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_URL,
  import.meta.env.VITE_KEY
);
function App() {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [newCountryName, setNewCountryName] = useState("");

  const fetchData = async () => {
    const { data, error } = await supabase.from("countries").select();
    if (error) {
      console.error("Error fetching countries:", error);
    } else {
      setCountries(data);
    }
    console.log(data);
  };
  const handleAddCountry = async () => {
    const randomNumberId = faker.datatype.number();

    if (newCountryName.trim() !== "") {
      const { data, error } = await supabase
        .from("countries")
        .insert([{ id: randomNumberId, name: newCountryName }]);
      if (error) {
        console.error("Error adding country:", error);
      } else {
        setNewCountryName("");
        fetchData();
      }
    }
  };

  const handleDeleteCountry = async (id) => {
    const { error } = await supabase.from("countries").delete().eq("id", id);
    if (error) {
      console.error("Error deleting country:", error);
    } else {
      fetchData();
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [count, setCount] = useState(0);

  return (
    <>
      <div className=" bg-white w-full ">
        <h1>Countries</h1>
        <ul>
          {countries.map((country) => (
            <li key={country.id}>
              {country.name}
              <button onClick={() => handleDeleteCountry(country.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newCountryName}
          onChange={(e) => setNewCountryName(e.target.value)}
        />
        <button onClick={handleAddCountry}>Add Country</button>
      </div>
    </>
  );
}

export default App;
