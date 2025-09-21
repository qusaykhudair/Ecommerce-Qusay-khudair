"use client"

import addProductToCart from '@/api/cart.api';
import { CartContext, CartContextType } from '@/context/cart.context';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

export default function MyBtnDetails({id}:{id:string}) {
const [isLoading , setisLoading] = useState(false);
  const cart = useContext(CartContext) as CartContextType;
  const router = useRouter();


 async function handelAdd() {
    try {
      setisLoading(true);

      const data = await addProductToCart(id);

      if (data.status === "success") {
        toast.success(data.message, { position: 'top-center', duration: 2000 });

        let sum = 0;
        (data.data.products as { count: number }[]).forEach((product) => {
          sum += product.count;
        });

        cart.setNumOfCartItems(sum);
      } else {
        toast.error("Can't add product to cart ❌", { position: 'top-center', duration: 2000 });
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
      setisLoading(false);
    }
  }
    return (
    <>
      <button disabled ={isLoading} onClick={handelAdd} className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                    <i className="fa-solid fa-cart-plus mr-2"></i> Add to Cart
                  </button> 
    </>
  )
}
