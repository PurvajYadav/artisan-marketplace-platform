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
                <Link href={/${user.role}} className="block px-4 py-2 hover:bg-muted rounded">
                  Dashboard
                </Link>
                <Link href={/${user.role}/profile} className="block px-4 py-2 hover:bg-muted rounded">
                  Profile
                </Link>
                <Button size="sm" variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/browse" className="block px-4 py-2 hover:bg-muted rounded">
                  Browse
                </Link>
                <Link href="/categories" className="block px-4 py-2 hover:bg-muted rounded">
                  Categories
                </Link>
                <Link href="/new-arrivals" className="block px-4 py-2 hover:bg-muted rounded">
                  New Arrivals
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
