import { useEffect, useRef, useState } from "react";
import { User } from "../types.d";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const ref = useRef<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10 ")
      .then(async (json) => await json.json())
      .then((res) => {
        ref.current = res.results;
        setUsers(res.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return { ref, users, setUsers };
};
