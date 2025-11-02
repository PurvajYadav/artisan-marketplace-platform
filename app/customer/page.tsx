"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Package, Heart, Settings } from "lucide-react"

export default function CustomerDashboard() {
  const orders = [
    { id: "ORD-001", date: "Dec 15, 2024", total: 365.14, status: "delivered", items: 3 },
    { id: "ORD-002", date: "Dec 10, 2024", total: 95.0, status: "processing", items: 1 },
  ]

  const wishlist = [
    { id: 1, name: "Hand-Painted Tribal Mask", price: 150, artisan: "Elena Cherokee" },
    { id: 2, name: "Tribal Clay Sculpture", price: 200, artisan: "Robert Pueblo" },
  ]

  return (
    <>
      <Navigation userRole="customer" />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-card border-b border-border py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Account</h1>
            <p className="text-muted-foreground">Manage your orders and preferences</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Orders Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Package size={24} className="text-primary" />
                Recent Orders
              </h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-card border border-border rounded-lg p-6 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.date} • {order.items} items
                      </p>
                    </div>
                    <div className="text-right mr-6">
                      <p className="text-primary font-bold">${order.total.toFixed(2)}</p>
                      <p
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          order.status === "delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Heart size={24} className="text-primary" />
                My Wishlist
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-muted h-40" />
                    <div className="p-4">
                      <p className="font-semibold text-foreground mb-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground mb-3">By {item.artisan}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-primary font-bold">${item.price}</p>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Settings size={20} className="text-primary" />
                Account Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Manage Addresses
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Notification Settings
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
