import React from "react";
import { getProductDetails, getRelatedProducts } from "@/api/product.api";
import ProductDetails from "@/app/_components/ProductDetails/ProductDetails";
import { ProdctsType } from "@/types/products.type";
import ProductSwiper from "@/app/_components/ProductSwiper/ProductSwiper";

export default async function page({ params }: { params: Promise<{id : string}> }) {
  const { id } = await params;
  const product:ProdctsType = await getProductDetails(id);
 const relatedProducts:ProdctsType[]= await getRelatedProducts(product.category._id);
 console.log(relatedProducts);





 return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductDetails product={product} />
      </div>
        <div className="mt-10">
         <ProductSwiper relatedProducts={relatedProducts} />
         
          </div>
    </div>
  );
}
