"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    name: "Handwoven Tribal Basket",
    price: 85,
    image: "/placeholder.svg?key=basket1",
    category: "Textiles",
    artisan: "Maria Choctaw",
    tribe: "Choctaw Nation",
    rating: 4.8,
    reviews: 24,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Traditional Ceramic Pot",
    price: 120,
    image: "/placeholder.svg?key=ceramic1",
    category: "Pottery",
    artisan: "Thomas Navajo",
    tribe: "Navajo Nation",
    rating: 4.9,
    reviews: 18,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Authentic Beaded Necklace",
    price: 95,
    image: "/placeholder.svg?key=beads1",
    category: "Jewelry",
    artisan: "Sarah Sioux",
    tribe: "Lakota Sioux",
    rating: 4.7,
    reviews: 32,
    isFeatured: false,
  },
  {
    id: 4,
    name: "Tribal Dream Catcher",
    price: 65,
    image: "/placeholder.svg?key=dreamcatcher1",
    category: "Home Décor",
    artisan: "James Apache",
    tribe: "Apache Nation",
    rating: 4.6,
    reviews: 15,
    isFeatured: true,
  },
  {
    id: 5,
    name: "Hand-Painted Tribal Mask",
    price: 150,
    image: "/placeholder.svg?key=mask1",
    category: "Art",
    artisan: "Elena Cherokee",
    tribe: "Cherokee Nation",
    rating: 5.0,
    reviews: 8,
    isFeatured: false,
  },
  {
    id: 6,
    name: "Woven Textile Blanket",
    price: 180,
    image: "/placeholder.svg?key=blanket1",
    category: "Textiles",
    artisan: "David Hopi",
    tribe: "Hopi Nation",
    rating: 4.9,
    reviews: 22,
    isFeatured: true,
  },
  {
    id: 7,
    name: "Turquoise Silver Bracelet",
    price: 110,
    image: "/placeholder.svg?key=bracelet1",
    category: "Jewelry",
    artisan: "Patricia Zuni",
    tribe: "Zuni Pueblo",
    rating: 4.8,
    reviews: 27,
    isFeatured: false,
  },
  {
    id: 8,
    name: "Tribal Clay Sculpture",
    price: 200,
    image: "/placeholder.svg?key=sculpture1",
    category: "Art",
    artisan: "Robert Pueblo",
    tribe: "Pueblo Nation",
    rating: 4.7,
    reviews: 12,
    isFeatured: false,
  },
]

const CATEGORIES = ["All", "Textiles", "Pottery", "Jewelry", "Home Décor", "Art"]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artisan.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    if (sortBy === "featured") return b.isFeatured ? 1 : -1
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0
  })

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Discover Authentic Crafts</h1>
            <p className="text-lg opacity-90">Browse handcrafted items from tribal artisans</p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="bg-card border-b border-border py-6 px-4 sm:px-6 lg:px-8 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search products or artisans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInWishlist={wishlist.includes(product.id)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No products found matching your search.</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
