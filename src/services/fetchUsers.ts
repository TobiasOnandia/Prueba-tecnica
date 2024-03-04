import { API } from "../API";

export const fetchUsers = async (currentPage: number) => {
  return await fetch(API + `&page=${currentPage}`)
    .then(async (res) => {
      if (!res.ok) throw new Error("Error en la peticion");
      return await res.json();
    })
    .then((res) => res.results);
};
