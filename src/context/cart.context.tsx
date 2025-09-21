"use client";

import { getProductsFromCart } from '@/api/cart.api';
import { CartType } from '@/types/cart.type';
import { createContext, useEffect, useState, ReactNode } from 'react';

export type OrderType = {
  id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  cartItems: {
    product: { title: string; imageCover: string; price: number };
    count: number;
    price: number;
  }[];
  createdAt: string;
};

export type CartContextType = {
  // Cart
  numOfCartItems: number | null;
  setNumOfCartItems: React.Dispatch<React.SetStateAction<number | null>>;
  handleCart: () => Promise<CartType | undefined>;
  cartId: string | null;
  setCartId: React.Dispatch<React.SetStateAction<string | null>>;

  // Orders
  currentOrder: OrderType | null;
  setCurrentOrder: React.Dispatch<React.SetStateAction<OrderType | null>>;
  fetchOrder: (orderId: string, token: string) => Promise<OrderType | null>;
};

export const CartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export default function CartProvider({ children }: CartProviderProps) {
  const [numOfCartItems, setNumOfCartItems] = useState<number | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);

  // Orders
  const [currentOrder, setCurrentOrder] = useState<OrderType | null>(null);

  // ✅ handleCart
  async function handleCart(): Promise<CartType | undefined> {
    const data = await getProductsFromCart();
    if (!data) return undefined;

    let sum = 0;
    data?.data?.products.forEach((product: { count: number }) => {
      sum += product.count;
    });
    setNumOfCartItems(sum);

    return data as CartType;
  }

  // ✅ fetchOrder
  async function fetchOrder(orderId: string, token: string): Promise<OrderType | null> {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token, // ✅ حسب السيرفر
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch order");

      const data = await res.json();
      setCurrentOrder(data);
      return data as OrderType;
    } catch (error) {
      console.error("Error fetching order:", error);
      return null;
    }
  }

  useEffect(() => {
    handleCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        handleCart,
        cartId,
        setCartId,
        currentOrder,
        setCurrentOrder,
        fetchOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
