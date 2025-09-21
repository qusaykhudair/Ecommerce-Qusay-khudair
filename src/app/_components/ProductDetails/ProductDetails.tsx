import { ProdctsType } from '@/types/products.type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MyBtnDetails from '../MyBtnDetails/MyBtnDetails'

export default function ProductDetails({product}:{product:ProdctsType}) {
  return (
    <>
            {/* Product Image */}
              <div className="flex justify-center">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
      
              {/* Product Info */}
              <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
      
                {/* Price + Rating */}
                <div className="flex items-center gap-6">
                  <span className="text-2xl font-semibold text-green-600">
                    {product.price} EGP
                  </span>
                  <span className="flex items-center text-yellow-500">
                    <i className="fa-solid fa-star"></i>
                    <span className="ml-2 text-gray-700">{product.ratingsAverage}</span>
                  </span>
                </div>
      
                {/* Category & Brand */}
                <p className="text-sm text-gray-500">
                  Category:{" "}
                  <span className="font-medium text-gray-700">{product.category.name}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Brand:{" "}
                  <span className="font-medium text-gray-700">{product.brand?.name ?? "No brand"}</span>
                </p>
      
                {/* Stock Info */}
                <p className="text-sm text-gray-500">
                  In Stock:{" "}
                  <span className="font-medium text-gray-700">{product.quantity}</span> pcs
                </p>
                <p className="text-sm text-gray-500">
                  Sold:{" "}
                  <span className="font-medium text-gray-700">{product.sold}</span>
                </p>
      
                {/* Actions */}
                <div className="flex gap-4 mt-4">
              <MyBtnDetails id={product._id}></MyBtnDetails>
                  <button className="px-6 py-3 border border-red-500 text-red-500 rounded-lg shadow hover:bg-red-500 hover:text-white transition">
                    <i className="fa-regular fa-heart mr-2"></i> Wishlist
                  </button>
                </div>
      
                {/* Back Button */}
                <Link
                  href="/products"
                  className="mt-6 inline-block text-green-600 hover:underline"
                >
                  ← Back to Products
                </Link>
              </div>
    </>
  )
}
