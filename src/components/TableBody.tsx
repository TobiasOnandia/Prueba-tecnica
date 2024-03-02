import { User } from "../types.d";

interface Props {
  toggleColor: boolean;
  handleDelete: (value: string) => void;
  sortedUsers: User[];
}

export function TableBody({ toggleColor, handleDelete, sortedUsers }: Props) {
  return (
    <tbody>
      {sortedUsers.map((user: User, index: number) => {
        const brackgroundColor = index % 2 === 0 ? "#333" : "#555";
        const color = toggleColor ? brackgroundColor : "transparent";

        return (
          <tr key={user.email} style={{ background: color }}>
            <td>
              <img src={user.picture.medium} alt={user.name.first} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button
                onClick={() => {
                  handleDelete(user.email);
                }}
              >
                Borrar
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
