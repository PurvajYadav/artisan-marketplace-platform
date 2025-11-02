"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Heart, Leaf, Users, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Artisan Marketplace</h1>
            <p className="text-lg opacity-90">
              Connecting the world with authentic tribal craftsmanship while preserving cultural heritage and supporting
              artisan communities.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-card">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
              To create a sustainable marketplace where tribal artisans can share their authentic creations with the
              world, receive fair compensation for their work, and preserve the cultural heritage that has been passed
              down through generations.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Fair Trade",
                  description:
                    "We ensure artisans receive fair compensation and maintain ethical practices throughout our supply chain.",
                },
                {
                  icon: Leaf,
                  title: "Sustainability",
                  description:
                    "Supporting environmentally responsible practices and sustainable sourcing of materials.",
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Empowering tribal communities and supporting cultural preservation initiatives.",
                },
                {
                  icon: Globe,
                  title: "Authenticity",
                  description:
                    "Verifying authenticity through cultural consultants and preserving traditional craftsmanship.",
                },
              ].map((value, idx) => {
                const Icon = value.icon
                return (
                  <div key={idx} className="bg-card border border-border rounded-lg p-6 text-center">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "87", label: "Artisans Supported" },
                { number: "$500K+", label: "Direct Payments" },
                { number: "12", label: "Tribes Represented" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-5xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-lg text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Join Our Movement</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're an artisan, customer, or cultural enthusiast, there's a place for you in our community.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
