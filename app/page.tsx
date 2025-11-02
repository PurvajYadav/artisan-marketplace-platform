"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap, Users, Shield, Heart } from "lucide-react"

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
            <span className="font-semibold text-lg text-primary">Artisan</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-primary">Support Tribal Artisans.</span> Own Authentic Crafts.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover handcrafted items made by tribal artisans with centuries of cultural heritage. Every purchase
            directly supports artisan communities and preserves traditional craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Browse Products
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-border bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="rounded-lg overflow-hidden bg-muted h-96">
            <img
              src="/tribal-handcrafted-items-artisan-marketplace.jpg"
              alt="Artisan crafts showcase"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Why Choose Artisan Marketplace?</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            We connect conscious consumers with authentic tribal artisans, ensuring fair compensation and cultural
            preservation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Authentic Crafts",
                description: "Genuine handmade items crafted using traditional tribal techniques",
              },
              {
                icon: Users,
                title: "Fair Trade",
                description: "Direct compensation to artisans ensures they earn fair wages",
              },
              {
                icon: Shield,
                title: "Verified Quality",
                description: "Cultural consultants verify authenticity and cultural significance",
              },
              {
                icon: Heart,
                title: "Cultural Preservation",
                description: "Support indigenous communities and preserve traditional heritage",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
                    hoveredCard === index ? "border-primary bg-primary/5 shadow-lg" : "border-border bg-background"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                      hoveredCard === index ? "bg-primary text-primary-foreground" : "bg-accent/20 text-accent"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Join Our Community</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: "Customer",
                description: "Discover and purchase authentic handcrafted items",
                cta: "Shop Now",
                color: "from-blue-500 to-blue-600",
              },
              {
                role: "Artisan",
                description: "Showcase your traditional crafts to global audience",
                cta: "Become an Artisan",
                color: "from-amber-500 to-amber-600",
              },
              {
                role: "Admin",
                description: "Manage the marketplace and ensure quality standards",
                cta: "Admin Portal",
                color: "from-purple-500 to-purple-600",
              },
              {
                role: "Cultural Consultant",
                description: "Verify authenticity and preserve cultural heritage",
                cta: "Join as Consultant",
                color: "from-green-500 to-green-600",
              },
            ].map((item, index) => (
              <Link key={index} href={`/signup?role=${item.role.toLowerCase()}`}>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  <div className={`h-24 rounded-lg mb-4 bg-gradient-to-r ${item.color} opacity-20`} />
                  <h3 className="font-bold text-lg mb-2 text-foreground">{item.role}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">{item.description}</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    {item.cta}
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of customers supporting tribal artisans and preserving cultural heritage.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  A
                </div>
                <span className="font-semibold text-foreground">Artisan</span>
              </div>
              <p className="text-muted-foreground text-sm">Connecting communities, preserving heritage.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Shop</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Browse Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Shipping
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Community</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Impact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-muted-foreground text-sm">
            <p>&copy; 2025 Artisan Marketplace. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
