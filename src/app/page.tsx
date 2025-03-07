"use client"

import { useState, useEffect } from "react"
import { UserCard } from "../../components/user-card"
import { UserList } from "../../components/user-list"
import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator"
import { RefreshCw } from "lucide-react"
import type { User } from "../../lib/types.ts"

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userHistory, setUserHistory] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchRandomUser = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("https://randomuser.me/api/")
      const data = await response.json()
      const user = data.results[0]

      setCurrentUser(user)
      setUserHistory((prev) => [user, ...prev])
    } catch (error) {
      console.error("Error fetching random user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomUser()
  }, []) //Fixed: Added empty dependency array to useEffect

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar with user history */}
      <div className="w-full md:w-80 border-r bg-muted/20 p-4 overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">User History</h2>
        <Separator className="mb-4" />
        <UserList users={userHistory} />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Random User Generator</h1>

        <div className="w-full max-w-md mb-8">
          {currentUser ? (
            <UserCard user={currentUser} />
          ) : (
            <div className="h-64 flex items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Loading user...</p>
            </div>
          )}
        </div>

        <Button onClick={fetchRandomUser} disabled={isLoading} size="lg" className="gap-2">
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Generate New User
        </Button>
      </div>
    </main>
  )
}

