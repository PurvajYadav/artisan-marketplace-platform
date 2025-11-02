"use client"

import { Button } from "./ui/button"
import Link from "next/link"
import { Heart, Star } from "lucide-react"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    artisan: string
    tribe: string
    rating: number
    reviews: number
    isFeatured?: boolean
  }
  isInWishlist?: boolean
  onToggleWishlist?: () => void
}

export function ProductCard({ product, isInWishlist, onToggleWishlist }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-48">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          {product.isFeatured && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              onToggleWishlist?.()
            }}
            className="absolute top-3 right-3 bg-background/80 backdrop-blur p-2 rounded-full hover:bg-background transition-colors"
          >
            <Heart size={20} className={isInWishlist ? "fill-primary text-primary" : "text-muted-foreground"} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{product.name}</h3>

          {/* Artisan Info */}
          <div className="mb-3">
            <p className="text-xs text-muted-foreground">By {product.artisan}</p>
            <p className="text-xs text-muted-foreground">{product.tribe}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">${product.price}</span>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
