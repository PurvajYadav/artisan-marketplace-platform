"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock cart items
const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: "Handwoven Tribal Basket",
    price: 85,
    image: "/placeholder.svg?key=basket1",
    artisan: "Maria Choctaw",
    quantity: 1,
  },
  {
    id: 2,
    name: "Authentic Beaded Necklace",
    price: 95,
    image: "/placeholder.svg?key=beads1",
    artisan: "Sarah Sioux",
    quantity: 2,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS)
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyCoupon = () => {
    if (couponCode === "TRIBAL10") {
      setDiscount(0.1)
    } else if (couponCode === "ARTISAN20") {
      setDiscount(0.2)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const discountAmount = subtotal * discount
  const shipping = cartItems.length > 0 ? (subtotal > 50 ? 0 : 10) : 0
  const total = subtotal - discountAmount + tax + shipping

  return (
    <>
      <Navigation userRole="customer" />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-card border-b border-border py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground mt-2">{cartItems.length} items in your cart</p>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-card border border-border rounded-lg p-6 flex gap-6">
                      <div className="w-24 h-24 rounded-lg bg-muted flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">By {item.artisan}</p>
                        </div>
                        <p className="text-primary font-bold">${item.price}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:bg-destructive/10 p-2 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="flex items-center gap-2 border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Coupon Section */}
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                    <h3 className="font-semibold text-foreground mb-4">Apply Coupon</h3>
                    <div className="flex gap-3">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button onClick={applyCoupon} className="bg-primary hover:bg-primary/90">
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Try: TRIBAL10 (10% off) or ARTISAN20 (20% off)</p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                    <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({Math.round(discount * 100)}%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-muted-foreground">
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Link href="/checkout" className="block w-full mb-3">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                        Proceed to Checkout
                        <ArrowRight size={18} />
                      </Button>
                    </Link>

                    <Link href="/browse" className="block w-full">
                      <Button variant="outline" className="w-full bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>

                    <p className="text-xs text-muted-foreground text-center mt-4">Free shipping on orders over $50</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
                <Link href="/browse">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Browse Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
