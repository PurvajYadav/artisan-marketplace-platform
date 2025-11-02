"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Award, BookOpen, Users } from "lucide-react"

export default function ConsultantProfilePage() {
  return (
    <>
      <Navigation userRole="consultant" />
      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-4xl">D</div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">Dr. Sarah Lee</h1>
                <p className="text-muted-foreground mb-3">Cultural Heritage Specialist</p>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Verifications</p>
                    <p className="text-lg font-bold text-primary">47</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expertise</p>
                    <p className="text-lg font-bold text-foreground">12 Tribes</p>
                  </div>
                </div>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </div>

          {/* Expertise */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Award size={20} className="text-primary" />
              Areas of Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Choctaw",
                "Navajo",
                "Cherokee",
                "Lakota Sioux",
                "Apache",
                "Hopi",
                "Zuni",
                "Pueblo",
                "Creek",
                "Seminole",
                "Shoshone",
                "Arapaho",
              ].map((tribe, idx) => (
                <span key={idx} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {tribe}
                </span>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-primary" />
              Qualifications
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">PhD in Anthropology</p>
                  <p className="text-sm text-muted-foreground">University of Oklahoma - Indigenous Cultures</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">Certified Cultural Heritage Specialist</p>
                  <p className="text-sm text-muted-foreground">International Heritage Association</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">15+ Years Experience</p>
                  <p className="text-sm text-muted-foreground">Working with tribal artisan communities</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Impact */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Users size={20} className="text-primary" />
              Impact & Contributions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">47</p>
                <p className="text-muted-foreground">Artisans Verified</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">156</p>
                <p className="text-muted-foreground">Products Authenticated</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">$2.3M</p>
                <p className="text-muted-foreground">Sales Facilitated</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
