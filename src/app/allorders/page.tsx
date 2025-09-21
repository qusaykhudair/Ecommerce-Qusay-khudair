"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type OrderItem = {
  product: {
    title: string;
    imageCover: string;
    price: number;
  };
  count: number;
  price: number;
};

type Order = {
  id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  cartItems: OrderItem[];
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("userToken"); // ✅ التوكين لازم
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17",
          {
            headers: {
              "Content-Type": "application/json",
              token: token || "",
            },
          }
        );

        const data = await res.json();
        console.log("Orders response:", data);

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-6">Loading orders...</p>;

  if (!orders.length) {
    return (
      <div className="p-6">
        <p>No orders found ❌</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl">Teeeeeeeeeeeest Page !!!!!!!! </h1>
      <h1 className="text-xl font-bold mb-4">My Orders</h1>

      <ul className="space-y-6">
        {orders.map((order) => (
          <li
            key={order.id}
            className="border p-4 rounded shadow-sm bg-white space-y-2"
          >
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentMethodType}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {order.isPaid ? "✅ Paid" : "❌ Not Paid"} |{" "}
              {order.isDelivered ? "📦 Delivered" : "⌛ Pending"}
            </p>
            <p>
              <strong>Total:</strong> ${order.totalOrderPrice}
            </p>

            <button
              onClick={() => router.push(`/orders/${order.id}`)}
              className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
            >
              View Invoice
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => router.push("/")}
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back to Home
      </button>
    </div>
  );
}
