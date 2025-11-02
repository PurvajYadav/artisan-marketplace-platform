"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Share2, Shield, Truck, RotateCcw, Star } from "lucide-react"
import Link from "next/link"

// Mock product details
const PRODUCT_DETAILS = {
  1: {
    name: "Handwoven Tribal Basket",
    price: 85,
    image: "/placeholder.svg?key=basket1",
    images: ["/placeholder.svg?key=basket1", "/placeholder.svg?key=basket2", "/placeholder.svg?key=basket3"],
    category: "Textiles",
    artisan: "Maria Choctaw",
    tribe: "Choctaw Nation",
    rating: 4.8,
    reviews: 24,
    description:
      "Authentic handwoven basket crafted using traditional Choctaw techniques passed down through generations. Each basket is unique and takes weeks to complete.",
    details: {
      materials: "Natural pine needles and traditional dyes",
      dimensions: '12" diameter x 8" height',
      weight: "2 lbs",
      care: "Hand wash with mild soap, air dry naturally",
    },
    culturalSignificance:
      "This basket represents centuries of Choctaw weaving traditions. The patterns tell stories of the tribe's history and connection to nature.",
    inStock: true,
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = PRODUCT_DETAILS[productId as keyof typeof PRODUCT_DETAILS]

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isInWishlist, setIsInWishlist] = useState(false)

  if (!product) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-lg text-muted-foreground">Product not found</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/browse" className="text-primary hover:underline">
                Products
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{product.category}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Images */}
              <div className="space-y-4">
                <div className="bg-muted rounded-lg overflow-hidden h-96 lg:h-[500px]">
                  <img
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {product.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`rounded-lg overflow-hidden border-2 transition-all h-20 ${
                        selectedImage === idx ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={
                              i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-primary mb-4">${product.price}</p>
                </div>

                {/* Artisan Info */}
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Handcrafted by {product.artisan}</p>
                  <p className="text-sm text-muted-foreground mb-3">{product.tribe}</p>
                  <Link href={`/artisan/${product.artisan}`}>
                    <Button size="sm" variant="outline">
                      View Artisan Profile
                    </Button>
                  </Link>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">About This Item</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                {/* Details */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Details</h3>
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(product.details).map(([key, value]) => (
                      <div key={key}>
                        <dt className="font-medium text-foreground capitalize">{key}</dt>
                        <dd className="text-muted-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Cultural Significance */}
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Cultural Significance</h3>
                  <p className="text-sm text-muted-foreground">{product.culturalSignificance}</p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 border border-border rounded hover:bg-muted"
                    >
                      −
                    </button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-16 text-center"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 border border-border rounded hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
                    Add to Cart
                  </Button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsInWishlist(!isInWishlist)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <Heart
                        size={20}
                        className={isInWishlist ? "fill-primary text-primary" : "text-muted-foreground"}
                      />
                      <span className="font-medium">Wishlist</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
                      <Share2 size={20} className="text-muted-foreground" />
                      <span className="font-medium">Share</span>
                    </button>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs font-medium text-foreground">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">Orders over $50</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs font-medium text-foreground">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">Encrypted checkout</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs font-medium text-foreground">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30-day guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
