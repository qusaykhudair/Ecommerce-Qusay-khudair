"use client"

import addProductToCart from '@/api/cart.api';
import { Button } from '@/components/ui/button'
import { CartContext, CartContextType } from '@/context/cart.context';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function MyButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const cart = useContext(CartContext) as CartContextType;
  const router = useRouter();

  async function handelAdd() {
    try {
      setIsLoading(true);

      const data = await addProductToCart(id);

      if (data.status === "success") {
        toast.success(data.message, { position: 'top-center', duration: 2000 });

        let sum = 0;
        (data.data.products as { count: number }[]).forEach((product) => {
          sum += product.count;
        });

        cart.setNumOfCartItems(sum);
      } else {
        toast.error("Can't add product to cart You must login first❗", { position: 'top-center', duration: 2000 });
        router.push("/login");
      }
    } catch (error: unknown) {
       const err = error as { message?: string };

      if (err?.message === "Login to add to cart") {
        toast.error("You must login first ❌", { position: 'top-center', duration: 2000 });
        router.push("/login");
      } else {
        toast.error(err?.message || "Something went wrong ❌", { position: 'top-center', duration: 2000 });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={handelAdd}
      disabled={isLoading}
      className="
        px-1 py-2 rounded-full
        bg-gradient-to-r from-green-500 to-emerald-600
        text-white font-semibold shadow-md
        hover:from-green-600 hover:to-emerald-700
        hover:shadow-lg hover:scale-105
        transition-all duration-300 ease-in-out
      "
    >
      Add to Cart
    </Button>
  )
}
