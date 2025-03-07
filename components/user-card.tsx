import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Mail, MapPin, Phone, Calendar } from "lucide-react"
import type { User } from "../lib/types"

export function UserCard({ user }: { user: User }) {
  const fullName = `${user.name.first} ${user.name.last}`

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 flex flex-row items-center gap-4 p-6">
        <Avatar className="h-20 w-20 border-4 border-background">
          <AvatarImage src={user.picture.large} alt={fullName} />
          <AvatarFallback>{`${user.name.first[0]}${user.name.last[0]}`}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{fullName}</h2>
          <p className="text-muted-foreground">{user.login.username}</p>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span>{`${user.location.city}, ${user.location.country}`}</span>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span>{new Date(user.dob.date).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}

