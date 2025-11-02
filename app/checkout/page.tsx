"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  const cartTotal = 365.14

  if (isComplete) {
    return (
      <>
        <Navigation userRole="customer" />
        <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
          <div className="text-center max-w-md">
            <CheckCircle size={80} className="text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been successfully placed and you'll receive a confirmation
              email shortly.
            </p>
            <div className="bg-card border border-border rounded-lg p-6 mb-6 text-left">
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="text-xl font-bold text-foreground mb-4">
                ORD-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-primary">${cartTotal.toFixed(2)}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/browse" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/customer" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">View Orders</Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navigation userRole="customer" />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-card border-b border-border py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
          </div>
        </section>

        {/* Checkout Form */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Shipping Information */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Shipping Address</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" name="zip" value={formData.zip} onChange={handleInputChange} required />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="4242 4242 4242 4242"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing Payment..." : "Complete Purchase"}
                  </Button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                  <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6 pb-6 border-b border-border">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded bg-muted flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground text-sm">Handwoven Tribal Basket</p>
                        <p className="text-xs text-muted-foreground">Qty: 1</p>
                        <p className="text-primary font-bold">$85.00</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded bg-muted flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground text-sm">Beaded Necklace</p>
                        <p className="text-xs text-muted-foreground">Qty: 2</p>
                        <p className="text-primary font-bold">$190.00</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground text-sm">
                      <span>Subtotal</span>
                      <span>$275.00</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-sm">
                      <span>Tax (8%)</span>
                      <span>$22.00</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-sm">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-green-100 text-green-800 rounded text-xs font-medium text-center">
                    Your purchase supports tribal artisans
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
