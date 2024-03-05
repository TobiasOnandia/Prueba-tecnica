import { API } from "../API";
import { User } from "../types";

export const fetchUsers = async ({ pageParam }: { pageParam?: number }) => {
  return await fetch(API + `&page=${pageParam}`)
    .then(async (res) => {
      if (!res.ok) throw new Error("Error en la peticion");
      return await res.json();
    })
    .then((res) => {
      const nextPage = Number(res.info.page) + 1;
      const users: User[] = res.results;
      return {
        users,
        nextPage,
      };
    });
};
