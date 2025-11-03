"use client"

import { useEffect, useState } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "customer" | "artisan" | "admin" | "consultant"
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("artisan_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("artisan_user")
      }
    }
    setIsLoading(false)
  }, [])

  const signup = (email: string, password: string, name: string, role: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name,
      role: role as User["role"],
    }

    // Store user and password (in real app, password would be hashed on server)
    localStorage.setItem("artisan_user", JSON.stringify(newUser))
    localStorage.setItem(`artisan_password_${email}`, password)
    setUser(newUser)
    return newUser
  }

  const login = (email: string, password: string): User | null => {
    const storedPassword = localStorage.getItem(`artisan_password_${email}`)
    const storedUsers = getAllUsers()
    const userExists = storedUsers.find((u) => u.email === email)

    if (storedPassword === password && userExists) {
      setUser(userExists)
      localStorage.setItem("artisan_user", JSON.stringify(userExists))
      return userExists
    }
    return null
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("artisan_user")
  }

  const getAllUsers = (): User[] => {
    const keys = Object.keys(localStorage)
    const users: User[] = []
    keys.forEach((key) => {
      if (key.startsWith("artisan_user_")) {
        try {
          const userData = JSON.parse(localStorage.getItem(key) || "{}")
          users.push(userData)
        } catch {
          // Skip invalid entries
        }
      }
    })
    return users
  }

  const registerUser = (user: User) => {
    localStorage.setItem(`artisan_user_${user.id}`, JSON.stringify(user))
  }

  return { user, isLoading, signup, login, logout, registerUser, getAllUsers }
}
