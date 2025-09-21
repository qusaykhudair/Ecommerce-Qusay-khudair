import React from 'react'
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProdctsType } from '@/types/products.type';
import Link from 'next/link';
import Image from 'next/image';
import MyButton from '../MyButton/MyButton';
export default function Product({product}: {product:ProdctsType}) {
  return (
    <>
       <Card key={product._id} className="w-100% h-full flex flex-col justify-between p-4">
      <CardContent>
     <div className="relative group overflow-hidden rounded-xl shadow-md">
      {/* Product Image */}
         <Image
        src={product.imageCover}
width={400}
height={400}
        alt={product.title} 
        className="w-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-5">
        
        {/* Eye Icon */}
 <Link href={`/products/${product._id}`}>
        <button className="p-3 bg-white rounded-full shadow hover:bg-green-100 transition">
          <Eye className="w-5 h-5 text-gray-700" />
        </button>
</Link>
        {/* Cart Icon */}
        <button className="p-3 bg-white rounded-full shadow hover:bg-green-100 transition">
          <ShoppingCart className="w-5 h-5 text-gray-700" />
        </button>

        {/* Heart Icon */}
        <button className="p-3 bg-white rounded-full shadow hover:bg-red-100 transition">
          <Heart className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>

       <CardTitle className="mt-10 fw-semibold text-green-500 text-xl">{product.category.name}</CardTitle>
      
     <CardHeader>    
      <CardDescription className="mt-5 fw-bold line-clamp-1">{product.title}</CardDescription>
    </CardHeader>
  
    </CardContent>


 
    <CardFooter className="flex items-center justify-between">
      <span className="text-lg font-bold">{product.price} EGP</span>
      <span className="flex text-lg font-bold"><Star className="fill-amber-300 text-amber-300"/> {product.ratingsAverage}</span>

    </CardFooter> 
      
 

    <MyButton id = {product._id}></MyButton>    
  </Card> 
    </>
  )
}
