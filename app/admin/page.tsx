"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, Package, DollarSign, CheckCircle, XCircle, Edit, Trash2, Eye } from "lucide-react"

// Mock admin data
const ADMIN_DATA = {
  platformStats: {
    totalUsers: 1234,
    totalArtisans: 87,
    totalProducts: 456,
    platformRevenue: 45230,
  },
  revenueData: [
    { month: "Jan", revenue: 2400 },
    { month: "Feb", revenue: 3200 },
    { month: "Mar", revenue: 2900 },
    { month: "Apr", revenue: 4100 },
    { month: "May", revenue: 5300 },
    { month: "Jun", revenue: 6200 },
  ],
  userDistribution: [
    { name: "Customers", value: 1000 },
    { name: "Artisans", value: 87 },
    { name: "Consultants", value: 45 },
    { name: "Admins", value: 5 },
  ],
  pendingApprovals: [
    { id: 1, name: "John Artisan Shop", type: "Artisan Registration", status: "pending", date: "Dec 15" },
    { id: 2, name: "Traditional Beads Product", type: "Product Listing", status: "pending", date: "Dec 14" },
    { id: 3, name: "Dr. Sarah Lee", type: "Consultant Verification", status: "pending", date: "Dec 13" },
  ],
  flaggedContent: [
    { id: 1, content: "Product Listing", reason: "Potential copyright issue", severity: "high", date: "Dec 15" },
    { id: 2, content: "User Review", reason: "Inappropriate language", severity: "medium", date: "Dec 14" },
    { id: 3, content: "Product Image", reason: "Image quality concern", severity: "low", date: "Dec 13" },
  ],
}

const COLORS = ["#8b5a3c", "#d4a574", "#9b7d6d", "#c4a080"]

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [approvals, setApprovals] = useState(ADMIN_DATA.pendingApprovals)

  const handleApprove = (id: number) => {
    setApprovals(approvals.filter((item) => item.id !== id))
  }

  const handleReject = (id: number) => {
    setApprovals(approvals.filter((item) => item.id !== id))
  }

  return (
    <>
      <Navigation userRole="admin" />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-card border-b border-border py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platform management and moderation tools</p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Users",
                  value: ADMIN_DATA.platformStats.totalUsers,
                  icon: Users,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  label: "Active Artisans",
                  value: ADMIN_DATA.platformStats.totalArtisans,
                  icon: Package,
                  color: "bg-green-100 text-green-600",
                },
                {
                  label: "Listed Products",
                  value: ADMIN_DATA.platformStats.totalProducts,
                  icon: Package,
                  color: "bg-purple-100 text-purple-600",
                },
                {
                  label: "Platform Revenue",
                  value: `$${ADMIN_DATA.platformStats.platformRevenue}`,
                  icon: DollarSign,
                  color: "bg-orange-100 text-orange-600",
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
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <Icon size={24} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
          <div className="flex gap-6 border-b border-border mb-6 overflow-x-auto">
            {["overview", "approvals", "moderation", "users", "reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
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
          <div className="max-w-7xl mx-auto space-y-8">
            {selectedTab === "overview" && (
              <>
                {/* Revenue Chart */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">Platform Revenue</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ADMIN_DATA.revenueData}>
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
                      <Bar dataKey="revenue" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* User Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">User Distribution</h2>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={ADMIN_DATA.userDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {ADMIN_DATA.userDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">Quick Stats</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="text-muted-foreground">Pending Approvals</span>
                        <span className="text-lg font-bold text-primary">{approvals.length}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="text-muted-foreground">Flagged Content</span>
                        <span className="text-lg font-bold text-orange-600">{ADMIN_DATA.flaggedContent.length}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="text-muted-foreground">Active Sessions</span>
                        <span className="text-lg font-bold text-green-600">234</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">System Health</span>
                        <span className="text-lg font-bold text-green-600">99.9%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedTab === "approvals" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground mb-6">Pending Approvals</h2>
                {approvals.length > 0 ? (
                  approvals.map((approval) => (
                    <div
                      key={approval.id}
                      className="bg-card border border-border rounded-lg p-6 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{approval.name}</h3>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Type: {approval.type}</span>
                          <span>Date: {approval.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button size="sm" variant="outline" className="text-blue-600 bg-transparent">
                          <Eye size={16} className="mr-2" /> Review
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(approval.id)}
                        >
                          <CheckCircle size={16} className="mr-2" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive bg-transparent"
                          onClick={() => handleReject(approval.id)}
                        >
                          <XCircle size={16} className="mr-2" /> Reject
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <CheckCircle size={48} className="mx-auto mb-4 text-green-600" />
                    <p>No pending approvals</p>
                  </div>
                )}
              </div>
            )}

            {selectedTab === "moderation" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground mb-6">Flagged Content</h2>
                {ADMIN_DATA.flaggedContent.map((item) => (
                  <div key={item.id} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{item.content}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{item.reason}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span
                            className={`px-3 py-1 rounded-full font-medium ${
                              item.severity === "high"
                                ? "bg-red-100 text-red-800"
                                : item.severity === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)} Severity
                          </span>
                          <span className="text-muted-foreground">{item.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye size={16} />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit size={16} />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === "users" && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">User Management</h2>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-6 font-semibold text-foreground">Name</th>
                        <th className="text-left py-3 px-6 font-semibold text-foreground">Email</th>
                        <th className="text-left py-3 px-6 font-semibold text-foreground">Role</th>
                        <th className="text-left py-3 px-6 font-semibold text-foreground">Status</th>
                        <th className="text-left py-3 px-6 font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Maria Choctaw", email: "maria@example.com", role: "Artisan", status: "Active" },
                        { name: "John Smith", email: "john@example.com", role: "Customer", status: "Active" },
                        { name: "Dr. Sarah Lee", email: "sarah@example.com", role: "Consultant", status: "Active" },
                      ].map((user, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-muted">
                          <td className="py-3 px-6 text-foreground">{user.name}</td>
                          <td className="py-3 px-6 text-muted-foreground">{user.email}</td>
                          <td className="py-3 px-6">{user.role}</td>
                          <td className="py-3 px-6">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-6">
                            <Button size="sm" variant="outline">
                              Manage
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === "reports" && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Reports</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold text-foreground mb-4">Sales Report</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Revenue</span>
                        <span className="text-lg font-bold text-primary">$45,230</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Transactions</span>
                        <span className="text-lg font-bold text-foreground">1,234</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Avg Order Value</span>
                        <span className="text-lg font-bold text-foreground">$36.67</span>
                      </div>
                      <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Export Report</Button>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold text-foreground mb-4">User Report</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">New Users (30d)</span>
                        <span className="text-lg font-bold text-green-600">+156</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Active Users</span>
                        <span className="text-lg font-bold text-foreground">892</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Churn Rate</span>
                        <span className="text-lg font-bold text-foreground">2.3%</span>
                      </div>
                      <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Export Report</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
