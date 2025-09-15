"use client"

import { useState, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

import { useKindeBrowserClient, LoginLink } from "@kinde-oss/kinde-auth-nextjs"
import { UserContext } from "@/lib/UserContext"

interface Todo {
  id: number
  text: string
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [newName, setNewName] = useState("")
  const [checked, setChecked] = useState<boolean | "indeterminate">(true)
  const { username } = useContext(UserContext)

  const {isLoading, isAuthenticated, user} = useKindeBrowserClient();

  const addTodo = async () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim() }])
      setNewTodo("")
      const response = await fetch("/api/tasks/update", {
        method: "POST",
        body: JSON.stringify({ user: newName.trim(), todos: [...todos, { id: Date.now(), text: newTodo.trim() }] }),
      });
    }
  }

  const fetchData = async () => {
    const response = await fetch("/api/tasks/get", {
      method: "POST",
      body: JSON.stringify({ user: newName.trim() }),
    });
    try {
      setTodos(await response.json());
    } catch {
      setTodos([]);
    }
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Todo List for {username}</h1>
          {
            isAuthenticated ? <p>{user?.given_name}</p> : <LoginLink>Sign in Here</LoginLink>
          }

          {/* Search by name */}
          <div className="flex gap-2 mb-6">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Search by name..."
              onKeyPress={(e) => e.key === "Enter" && fetchData()}
            />
            <Button onClick={fetchData}>Load Tasks</Button>
          </div>

          {/* Add new todo */}
          <div className="flex gap-2 mb-6">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
            />
            <Button onClick={addTodo}>Add</Button>
          </div>

          <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value)} />

          {/* Todo list */}
          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No todos yet. Add one above!</p>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="p-3 border rounded bg-muted/50">
                  <span>{todo.text}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
