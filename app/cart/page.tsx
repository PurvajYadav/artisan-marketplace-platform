"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import Link from "next/link"

type CartItem = {
  id: number
  name: string
  price: number
  image: string
  artisan: string
  quantity: number
  inStock: boolean
  originalPrice?: number
  deliveryEstimate?: string
}

// Mock cart items – you can replace with real data later
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Handwoven Tribal Basket",
    price: 85,
    originalPrice: 99,
    image: "/placeholder.svg?key=basket1",
    artisan: "Maria Choctaw",
    quantity: 1,
    inStock: true,
    deliveryEstimate: "Delivery in 3–5 days",
  },
  {
    id: 2,
    name: "Authentic Beaded Necklace",
    price: 95,
    originalPrice: 120,
    image: "/placeholder.svg?key=beads1",
    artisan: "Sarah Sioux",
    quantity: 2,
    inStock: true,
    deliveryEstimate: "Delivery by Monday",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS)
  const [savedItems, setSavedItems] = useState<CartItem[]>([])
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      )
    }
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const saveForLater = (id: number) => {
    setCartItems((prevCart) => {
      const item = prevCart.find((i) => i.id === id)
      if (!item) return prevCart
      setSavedItems((prevSaved) => [...prevSaved, item])
      return prevCart.filter((i) => i.id !== id)
    })
  }

  const moveToCart = (id: number) => {
    setSavedItems((prevSaved) => {
      const item = prevSaved.find((i) => i.id === id)
      if (!item) return prevSaved
      setCartItems((prevCart) => [...prevCart, { ...item, quantity: item.quantity || 1 }])
      return prevSaved.filter((i) => i.id !== id)
    })
  }

  const applyCoupon = () => {
    if (couponCode === "TRIBAL10") {
      setDiscount(0.1)
    } else if (couponCode === "ARTISAN20") {
      setDiscount(0.2)
    } else {
      setDiscount(0)
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
        <section className="bg-card border-b border-border py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
              <p className="text-muted-foreground mt-1">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            {cartItems.length > 0 && (
              <p className="hidden sm:block text-sm text-muted-foreground pr-2">
                Price
              </p>
            )}
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Cart + Saved for later */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart items */}
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-card border border-border rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
                    >
                      <div className="flex gap-3">
                        <input
                          type="checkbox"
                          className="mt-3 h-4 w-4 accent-primary"
                          aria-label="Select item"
                        />
                        <div className="w-24 h-24 rounded-lg bg-muted flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              by <span className="font-medium">{item.artisan}</span>
                            </p>
                            {item.inStock ? (
                              <p className="text-sm text-emerald-500 font-semibold mt-1">
                                In stock
                              </p>
                            ) : (
                              <p className="text-sm text-red-500 font-semibold mt-1">
                                Out of stock
                              </p>
                            )}
                            {item.deliveryEstimate && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.deliveryEstimate}
                              </p>
                            )}
                          </div>

                          <div className="text-right min-w-[80px]">
                            <p className="text-lg font-semibold text-foreground">
                              ${item.price.toFixed(2)}
                            </p>
                            {item.originalPrice && (
                              <p className="text-xs text-muted-foreground line-through">
                                ${item.originalPrice.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-muted"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-10 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-muted"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-xs sm:text-sm text-destructive hover:underline"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>

                          <button
                            onClick={() => saveForLater(item.id)}
                            className="text-xs sm:text-sm text-primary hover:underline"
                          >
                            Save for later
                          </button>
                        </div>

                        <label className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <input type="checkbox" className="h-4 w-4 accent-primary" />
                          This order contains a gift
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-card border border-border rounded-lg text-center py-16">
                  <div className="text-6xl mb-4">🛒</div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Your cart is empty
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Start shopping to add items to your cart.
                  </p>
                  <Link href="/browse">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Browse products
                    </Button>
                  </Link>
                </div>
              )}

              {/* Coupon section */}
              {cartItems.length > 0 && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Apply coupon</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button onClick={applyCoupon} className="bg-primary hover:bg-primary/90">
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try: <span className="font-semibold">TRIBAL10</span> (10% off) or{" "}
                    <span className="font-semibold">ARTISAN20</span> (20% off)
                  </p>
                </div>
              )}

              {/* Saved for later */}
              {savedItems.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6 mt-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Saved for later
                  </h3>
                  <div className="space-y-4">
                    {savedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            by {item.artisan}
                          </p>
                          <p className="text-sm font-semibold mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs sm:text-sm">
                            <button
                              onClick={() => moveToCart(item.id)}
                              className="text-primary hover:underline"
                            >
                              Move to cart
                            </button>
                            <button
                              onClick={() =>
                                setSavedItems((prev) =>
                                  prev.filter((saved) => saved.id !== item.id),
                                )
                              }
                              className="text-destructive hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Order summary
                </h2>

                {cartItems.length > 0 ? (
                  <>
                    <p className="text-sm mb-4">
                      Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):{" "}
                      <span className="font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </p>

                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Discount</span>
                        <span>
                          {discount > 0 ? `- $${discountAmount.toFixed(2)}` : "-"}
                        </span>
                      </div>
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
                        Proceed to checkout
                        <ArrowRight size={18} />
                      </Button>
                    </Link>

                    <Link href="/browse" className="block w-full">
                      <Button variant="outline" className="w-full bg-transparent">
                        Continue shopping
                      </Button>
                    </Link>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Free shipping on orders over $50
                    </p>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Your cart is empty. Add items to see order summary here.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
