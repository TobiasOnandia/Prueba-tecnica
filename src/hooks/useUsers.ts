import { useInfiniteQuery } from "@tanstack/react-query";
import { User } from "../types.d";
import { fetchUsers } from "../services/fetchUsers";

type TQueryFnData = {
    // Existing properties...
    users: User[]; // Add the 'users' property with the appropriate type (e.g., User[])
  };

export const useUsers = () =>{
    const { data, refetch, fetchNextPage } = useInfiniteQuery<{nextPage: number, users: User[] }>({
        queryKey: ["users"],
        queryFn: ({ pageParam }: {pageParam: number}) => fetchUsers({pageParam}),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
      });


      return {
        users: data?.pages?.flatMap(page => page.users) ?? [],
        refetch,
        fetchNextPage
      }
}