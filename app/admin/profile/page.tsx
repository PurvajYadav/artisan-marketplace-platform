"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"

export default function AdminProfilePage() {
  return (
    <>
      <Navigation userRole="admin" />
      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">Admin Settings</h1>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Admin Name</label>
                <input
                  type="text"
                  defaultValue="Admin User"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="admin@artisan.com"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Notification Settings</label>
                <div className="space-y-3">
                  {["New Artisan Registrations", "Flagged Content", "User Reports", "Revenue Alerts"].map(
                    (setting, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-foreground">{setting}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Save Settings</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
