"use client";
import { useContext, useEffect, useState } from "react";
import {
  getProductsFromCart,
  updateProductQuantity,
  removeProductFromCart,
  clearCart,
} from "@/api/cart.api";
import { CartProductType, CartType } from "@/types/cart.type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartContext, CartContextType  } from "@/context/cart.context";
export default function Cart() {
  const [products, setProducts] = useState<CartProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const router = useRouter();
  const cart = useContext(CartContext) as CartContextType;
  const [cartData, setCartData] = useState<CartType | undefined>(undefined);

async function handelGetProduct() {
  setLoading(true);
  const data = await cart?.handleCart(); 
  setCartData(data);
  console.log(data);
  setLoading(false);
}

useEffect(() => {
  handelGetProduct();
}, []);

  // 🟢 Fetch cart products
  async function fetchCart() {
    try {
      setLoading(true);
      const res = await getProductsFromCart();
      if (res?.data?.products) {
        setProducts(res.data.products);
        setTotalPrice(res.data.totalCartPrice);
        

            let sum = 0;
(res.data.products as { count: number }[]).forEach((product) => {
  sum += product.count;
});


  
   cart.setNumOfCartItems(sum);

      }
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  // 🟢 Handlers
  const increaseQty = async (productId: string, currentCount: number) => {
    setActionLoading(productId + "-inc");
    await updateProductQuantity(productId, currentCount + 1);
    await fetchCart();
    setActionLoading(null);
  };

  const decreaseQty = async (productId: string, currentCount: number) => {
    if (currentCount > 1) {
      setActionLoading(productId + "-dec");
      await updateProductQuantity(productId, currentCount - 1);
      await fetchCart();
      setActionLoading(null);
    }
  };

  const removeProduct = async (productId: string) => {
    setActionLoading(productId + "-remove");
    await removeProductFromCart(productId);
    await fetchCart();
    setActionLoading(null);
  };

  const handleClearCart = async () => {
    if (confirm("Are you sure you want to clear all items from the cart?")) {
      setActionLoading("clear");
      await clearCart();
      await fetchCart();
      setActionLoading(null);
    }
  };

  // 🟢 شاشة تحميل عامة
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col">
      <div className="max-w-5xl mx-auto flex-1 w-full">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Your Cart</h1>

        {/* Total */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-4 mb-6">
          <p className="text-lg font-medium text-gray-700">
            Total Items: <span className="font-bold">{products.length}</span>
          </p>
          <p className="text-xl font-bold text-green-600">
            Total: {totalPrice} EGP
          </p>
        </div>

        {/* Products */}
        <div className="space-y-4">
          {products.length > 0 ? (
            products.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={80}
                    height={80}
                    className="rounded-lg border"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {item.product.title}
                    </h2>
                    <p className="text-green-600 font-medium">
                      Price: {item.price} EGP
                    </p>
                    <button
                      onClick={() => removeProduct(item.product._id)}
                      disabled={actionLoading === item.product._id + "-remove"}
                      className="flex items-center gap-1 text-red-500 text-sm mt-2 hover:underline disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      {actionLoading === item.product._id + "-remove"
                        ? "Removing..."
                        : "Remove"}
                    </button>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => increaseQty(item.product._id, item.count)}
                    disabled={actionLoading === item.product._id + "-inc"}
                    className="border-green-600 text-green-600 hover:bg-green-100 disabled:opacity-50"
                  >
                    {actionLoading === item.product._id + "-inc" ? (
                      <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </Button>
                  <span className="px-4 py-1 rounded-lg bg-gray-100 font-medium">
                    {item.count}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => decreaseQty(item.product._id, item.count)}
                    disabled={actionLoading === item.product._id + "-dec"}
                    className="border-green-600 text-green-600 hover:bg-green-100 disabled:opacity-50"
                  >
                    {actionLoading === item.product._id + "-dec" ? (
                      <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Minus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600 text-lg mb-4">
                Your cart is empty 🛍️
              </p>
              <Button
                onClick={() => router.push("/products")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
              >
                Go Shopping
              </Button>
            </div>
          )}
        </div>
      </div>

{/* 🟢 زر Checkout */}
{products.length > 0 && (
  <div className="max-w-5xl mx-auto w-full mt-6">
    <Button
      onClick={() => router.push(`/checkout/${cartData?.cartId}`)}
      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition"
    >
      Proceed to Checkout
    </Button>
  </div>
)}

      {/* 🟢 زر مسح الكارت بالكامل */}
      {products.length > 0 && (
        <div className="max-w-5xl mx-auto w-full mt-6">
          <Button
            onClick={handleClearCart}
            disabled={actionLoading === "clear"}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-md transition disabled:opacity-50"
          >
            {actionLoading === "clear" ? "Clearing..." : "Clear Cart"}
          </Button>
        </div>
      )}
    </div>
  );
}
