"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Package, DollarSign, Users, TrendingUp, Plus, Eye, Edit, Trash2 } from "lucide-react"

// Mock artisan data
const ARTISAN_DATA = {
  totalSales: 12450,
  totalOrders: 28,
  totalFollowers: 156,
  monthlyIncome: 3250,
  products: [
    { id: 1, name: "Handwoven Tribal Basket", price: 85, sold: 12, status: "active", views: 342 },
    { id: 2, name: "Ceramic Pot", price: 120, sold: 8, status: "active", views: 218 },
    { id: 3, name: "Beaded Necklace", price: 95, sold: 15, status: "active", views: 456 },
  ],
  recentOrders: [
    { id: "ORD001", customer: "John Doe", amount: 85, date: "Dec 15", status: "delivered" },
    { id: "ORD002", customer: "Jane Smith", amount: 120, date: "Dec 14", status: "shipped" },
    { id: "ORD003", customer: "Mike Johnson", amount: 95, date: "Dec 13", status: "processing" },
  ],
  salesData: [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 600 },
    { month: "Mar", sales: 800 },
    { month: "Apr", sales: 1200 },
    { month: "May", sales: 1500 },
    { month: "Jun", sales: 1200 },
  ],
}

export default function ArtisanDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [products, setProducts] = useState(ARTISAN_DATA.products)
  const [showAddProduct, setShowAddProduct] = useState(false)

  return (
    <>
      <Navigation userRole="artisan" />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-card border-b border-border py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Maria Choctaw</h1>
                <p className="text-muted-foreground">Manage your artisan shop and connect with customers</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Plus size={20} />
                Add Product
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Sales",
                  value: `$${ARTISAN_DATA.totalSales}`,
                  icon: DollarSign,
                  color: "text-green-600",
                },
                {
                  label: "Orders Completed",
                  value: ARTISAN_DATA.totalOrders,
                  icon: Package,
                  color: "text-blue-600",
                },
                {
                  label: "Followers",
                  value: ARTISAN_DATA.totalFollowers,
                  icon: Users,
                  color: "text-purple-600",
                },
                {
                  label: "Monthly Income",
                  value: `$${ARTISAN_DATA.monthlyIncome}`,
                  icon: TrendingUp,
                  color: "text-orange-600",
                },
              ].map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div key={idx} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <Icon className={`${stat.color} opacity-20`} size={32} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
          <div className="flex gap-6 border-b border-border mb-6">
            {["overview", "products", "orders", "profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors ${
                  selectedTab === tab
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Content */}
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {selectedTab === "overview" && (
              <div className="space-y-8">
                {/* Sales Chart */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">Sales Trend</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ARTISAN_DATA.salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Recent Orders */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">Recent Orders</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Order</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ARTISAN_DATA.recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-border hover:bg-muted">
                            <td className="py-3 px-4 text-foreground font-medium">{order.id}</td>
                            <td className="py-3 px-4 text-muted-foreground">{order.customer}</td>
                            <td className="py-3 px-4 text-foreground font-semibold">${order.amount}</td>
                            <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  order.status === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "shipped"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "products" && (
              <div>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-card border border-border rounded-lg p-6 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                          <span>Price: ${product.price}</span>
                          <span>Sold: {product.sold} units</span>
                          <span className="flex items-center gap-1">
                            <Eye size={16} /> {product.views} views
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Edit size={16} />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === "orders" && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Management</h2>
                <div className="space-y-4">
                  {ARTISAN_DATA.recentOrders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-semibold text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-primary font-bold">${order.amount}</span>
                        <Button size="sm">Mark as Shipped</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === "profile" && (
              <div className="bg-card border border-border rounded-lg p-8 max-w-2xl">
                <h2 className="text-2xl font-bold text-foreground mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
                    <input
                      type="text"
                      defaultValue="Maria Choctaw Studio"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tribe</label>
                    <input
                      type="text"
                      defaultValue="Choctaw Nation"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                    <textarea
                      defaultValue="Specialized in traditional basket weaving with over 20 years of experience."
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bank Account</label>
                    <input
                      type="text"
                      placeholder="****-****-****-1234"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
