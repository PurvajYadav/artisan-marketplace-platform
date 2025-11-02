"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, Search, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock consultant data
const CONSULTANT_DATA = {
  stats: {
    verified: 23,
    pending: 5,
    rejected: 2,
    totalReviewed: 30,
  },
  verifications: [
    {
      id: 1,
      artisanName: "Maria Choctaw",
      tribe: "Choctaw Nation",
      product: "Handwoven Basket",
      submissionDate: "2024-12-15",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      artisanName: "Thomas Navajo",
      tribe: "Navajo Nation",
      product: "Traditional Ceramic Pot",
      submissionDate: "2024-12-14",
      status: "verified",
      priority: "normal",
    },
    {
      id: 3,
      artisanName: "Sarah Sioux",
      tribe: "Lakota Sioux",
      product: "Beaded Necklace",
      submissionDate: "2024-12-13",
      status: "pending",
      priority: "normal",
    },
    {
      id: 4,
      artisanName: "James Apache",
      tribe: "Apache Nation",
      product: "Dream Catcher",
      submissionDate: "2024-12-12",
      status: "rejected",
      priority: "low",
    },
  ],
}

export default function ConsultantDashboard() {
  const [selectedTab, setSelectedTab] = useState("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredVerifications = CONSULTANT_DATA.verifications.filter((v) => {
    const matchesSearch =
      v.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tribe.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || v.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <>
      <Navigation userRole="consultant" />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-card border-b border-border py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">Cultural Verification Board</h1>
            <p className="text-muted-foreground">Review and verify artisan authenticity and cultural significance</p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Verified Artisans",
                  value: CONSULTANT_DATA.stats.verified,
                  icon: CheckCircle,
                  color: "text-green-600",
                },
                {
                  label: "Pending Review",
                  value: CONSULTANT_DATA.stats.pending,
                  icon: Clock,
                  color: "text-yellow-600",
                },
                {
                  label: "Rejected",
                  value: CONSULTANT_DATA.stats.rejected,
                  icon: XCircle,
                  color: "text-red-600",
                },
                {
                  label: "Total Reviewed",
                  value: CONSULTANT_DATA.stats.totalReviewed,
                  icon: TrendingUp,
                  color: "text-purple-600",
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
                      <Icon className={`${stat.color} opacity-40`} size={32} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Verification Queue */}
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search by artisan or tribe..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <span className="text-sm font-medium text-foreground py-2">Filter:</span>
                  {["all", "pending", "verified", "rejected"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterStatus === status
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-accent"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Verifications List */}
            <div className="space-y-4">
              {filteredVerifications.length > 0 ? (
                filteredVerifications.map((verification) => (
                  <div key={verification.id} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-foreground text-lg">{verification.artisanName}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              verification.status === "verified"
                                ? "bg-green-100 text-green-800"
                                : verification.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Tribe</p>
                            <p className="font-medium text-foreground">{verification.tribe}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Product</p>
                            <p className="font-medium text-foreground">{verification.product}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Submitted</p>
                            <p className="font-medium text-foreground">{verification.submissionDate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Priority</p>
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                verification.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : verification.priority === "normal"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {verification.priority.charAt(0).toUpperCase() + verification.priority.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {verification.status === "pending" && (
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle size={16} className="mr-2" /> Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                            <XCircle size={16} className="mr-2" /> Reject
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Details Section */}
                    <div className="border-t border-border pt-4">
                      <details className="cursor-pointer">
                        <summary className="font-medium text-foreground hover:text-primary">
                          View Verification Details
                        </summary>
                        <div className="mt-4 space-y-4 text-sm">
                          <div>
                            <p className="font-medium text-foreground mb-2">Cultural Documentation</p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              <li>Tribal affiliation verified</li>
                              <li>Traditional techniques documented</li>
                              <li>Material sourcing confirmed</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-2">Artisan Background</p>
                            <p className="text-muted-foreground">
                              Certified practitioner of traditional tribal craftsmanship with 20+ years of experience in
                              heritage preservation.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-2">Fair Trade Compliance</p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              <li>Fair wage standards met</li>
                              <li>Sustainable material practices verified</li>
                              <li>Labor practices compliant</li>
                            </ul>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <p className="text-muted-foreground">No verifications found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
