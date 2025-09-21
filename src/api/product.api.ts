import { ProdctsType } from "@/types/products.type";

 export default async function getAllProducts() {
  
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
    next: {revalidate: 60}    
  });
  const {data} = await response.json();
  return data;
  }

    export async function getProductDetails(id:string) {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      const { data } = await response.json();
      return data;
    }


  export async  function getRelatedProducts(id:string) {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`);
    const { data } = await response.json();
    return data;
    }