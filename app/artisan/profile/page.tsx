"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Award } from "lucide-react"

export default function ArtisanProfilePage() {
  return (
    <>
      <Navigation userRole="artisan" />
      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-4xl">M</div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">Maria Choctaw</h1>
                <p className="text-muted-foreground mb-3 flex items-center gap-2">
                  <MapPin size={16} /> Choctaw Nation, Oklahoma
                </p>
                <div className="flex items-center gap-6 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="text-lg font-bold text-foreground">156</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Products</p>
                    <p className="text-lg font-bold text-foreground">12</p>
                  </div>
                </div>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              With over 20 years of experience in traditional Choctaw basket weaving, I create authentic handcrafted
              baskets that tell the story of my heritage. Each basket is woven using techniques passed down through
              generations, using natural materials sourced sustainably from our ancestral lands.
            </p>

            {/* Specialties */}
            <h3 className="font-semibold text-foreground mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {["Basket Weaving", "Traditional Techniques", "Cultural Preservation", "Sustainable Materials"].map(
                (tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Award size={20} className="text-primary" />
              Certifications & Achievements
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">Verified Tribal Artisan</p>
                  <p className="text-sm text-muted-foreground">Verified by Cultural Consultant Board - 2024</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">Fair Trade Certified</p>
                  <p className="text-sm text-muted-foreground">Committed to fair wages and ethical practices</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">Master Craftsperson</p>
                  <p className="text-sm text-muted-foreground">
                    Recognized for excellence in traditional craftsmanship
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Featured Products */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-muted h-48" />
                  <div className="p-4">
                    <p className="font-semibold text-foreground">Traditional Basket #{idx}</p>
                    <p className="text-primary font-bold mt-2">$85</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
