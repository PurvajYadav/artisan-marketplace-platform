import { useEffect, useState } from "react";

export default function BillingPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(items);
    const t = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotal(t);
  }, []);

  const handlePayment = () => {
    alert("✅ Payment Successful! Thank you for your purchase.");
    localStorage.removeItem("cart");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Billing Details</h1>
      <h3>Total Amount: ₹{total}</h3>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
