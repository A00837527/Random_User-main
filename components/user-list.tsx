import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import type { User } from "../lib/types"

export function UserList({ users }: { users: User[] }) {
  if (users.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No users generated yet</div>
  }

  return (
    <div className="space-y-3">
      {users.map((user, index) => (
        <div
          key={`${user.login.uuid}-${index}`}
          className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
        >
          <Avatar>
            <AvatarImage src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
            <AvatarFallback>{`${user.name.first[0]}${user.name.last[0]}`}</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="font-medium truncate">{`${user.name.first} ${user.name.last}`}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

