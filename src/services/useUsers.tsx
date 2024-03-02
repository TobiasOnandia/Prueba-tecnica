import { useEffect, useRef, useState } from "react";
import { User } from "../types.d";
import { API } from "../API";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const ref = useRef<User[]>([]);

  useEffect(() => {
    fetch(API)
      .then(async (json) => await json.json())
      .then((res) => {
        ref.current = res.results;
        setUsers(res.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return { ref, users, setUsers };
};
