import { useMemo, useState } from "react";
import "./App.css";
import { TableBody } from "./components/TableBody";
import { useUsers } from "./services/useUsers";

function App() {
  const [toggleColor, setToggleColor] = useState(false);
  const [toggleSort, setToggleSort] = useState(false);
  const [filterCountry, setFilteredCountry] = useState<string | null>(null);

  const { ref, users, setUsers } = useUsers();

  const handleClick = () => {
    setToggleColor(!toggleColor);
  };

  const handleClickCountry = () => {
    setToggleSort((a) => !a);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const filterdedCountry = filterCountry
    ? users.filter((user) => {
        return user.location.country
          .toLowerCase()
          .includes(filterCountry.toLowerCase());
      })
    : users;

  const sortedUsers = useMemo(() => {
    return toggleSort
      ? filterdedCountry.toSorted((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filterdedCountry;
  }, [filterdedCountry, toggleSort]);

  return (
    <div>
      <header>
        <h1>Hello Worlds!</h1>
        <button onClick={handleClick}>colorear celdas</button>
        <button onClick={handleClickCountry}>
          {toggleSort ? "no ordenar por pais" : "ordenar por pais"}
        </button>
        <input
          type="text"
          onChange={(e) => {
            setFilteredCountry(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setUsers(ref.current);
          }}
        >
          Resetear Estado
        </button>
      </header>
      <table width={"100%"} className={toggleColor ? "table" : "cebra"}>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Pais</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <TableBody
          toggleColor={toggleColor}
          handleDelete={handleDelete}
          sortedUsers={sortedUsers}
        />
      </table>
    </div>
  );
}

export default App;
