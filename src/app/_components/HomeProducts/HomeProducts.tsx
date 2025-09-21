import React from 'react'
import Product from '../Product/Product'
import getAllProducts from '@/api/product.api';
import { ProdctsType } from '@/types/products.type';

export default async function HomeProducts() {
      const allPtoducts: ProdctsType[] = await getAllProducts();
  return (
    <>
      <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {allPtoducts.map((product)=><Product key={product._id} product={product}/>)}

      </div>
      </div>
    </>
  )
}
