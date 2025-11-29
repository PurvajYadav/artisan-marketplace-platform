"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoading, logout } = useAuth()

  const isActive = (href: string) => pathname === href

  const handleLogout = () => {
    logout()
    router.push("/")
    setIsOpen(false)
  }

  if (isLoading) {
    return (
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
            <span className="font-semibold text-lg text-primary">Artisan</span>
          </Link>
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
            A
          </div>
          <span className="font-semibold text-lg text-primary">Artisan</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
              <Link
                href={`/${user.role}`}
                className={`text-sm font-medium transition-colors ${
                  isActive(`/${user.role}`) ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href={`/${user.role}/profile`}
                className={`text-sm font-medium transition-colors ${
                  isActive(`/${user.role}/profile`) ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                Profile
              </Link>
              <Button size="sm" variant="outline" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/browse" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Shop
              </Link>
              <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-accent rounded">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-4 space-y-3">
            {user ? (
              <>
                <div className="px-4 py-3 mb-3 bg-muted rounded">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
                <Link href={`/${user.role}`} className="block px-4 py-2 hover:bg-muted rounded">
                  Dashboard
                </Link>
                <Link href={`/${user.role}/profile`} className="block px-4 py-2 hover:bg-muted rounded">
                  Profile
                </Link>
                <Button size="sm" variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/browse" className="block px-4 py-2 hover:bg-muted rounded">
                  Shop
                </Link>
                <Link href="/about" className="block px-4 py-2 hover:bg-muted rounded">
                  About
                </Link>
                <Link href="/login" className="block w-full">
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="block w-full">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
