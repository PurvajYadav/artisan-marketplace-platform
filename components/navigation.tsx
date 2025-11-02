"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"

interface NavigationProps {
  userRole?: "customer" | "artisan" | "admin" | "consultant" | null
}

export function Navigation({ userRole }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

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
          {userRole ? (
            <>
              <Link
                href={`/${userRole}`}
                className={`text-sm font-medium transition-colors ${
                  isActive(`/${userRole}`) ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href={`/${userRole}/profile`}
                className={`text-sm font-medium transition-colors ${
                  isActive(`/${userRole}/profile`) ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                Profile
              </Link>
              <Button size="sm" variant="outline">
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
            {userRole ? (
              <>
                <Link href={`/${userRole}`} className="block px-4 py-2 hover:bg-muted rounded">
                  Dashboard
                </Link>
                <Link href={`/${userRole}/profile`} className="block px-4 py-2 hover:bg-muted rounded">
                  Profile
                </Link>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
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
