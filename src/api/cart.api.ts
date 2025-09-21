"use server"

import getMyToken from "@/utilities/GetMyToken";
import { json } from "zod";

export default async function addProductToCart(id:string){
 const token = await getMyToken()
  
 if(!token){
  throw new Error('Login to add to cart')
 }
 
    const res =  await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {
        method : 'POST',
        body : JSON.stringify({
    productId : id
}) , 
headers : {
    token :` ${token}`,
    "Content-Type" : 'application/json'
}
    })

    const data = res.json()
    return data ;
}

export async function getProductsFromCart(){
    const token = await getMyToken();
    
   const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {
        method : 'GET' ,
        headers : {
             token :` ${token}`,
        }
    })

    const data = await res.json()
    return data ;

}

export async function removeProductFromCart(id: string) {
  const token = await getMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      method: "DELETE",
      headers: {
        token :` ${token}`,
      },
    }
  );

  const data = await res.json();
  return data;
}

export async function updateProductQuantity(id: string, count: number) {
  const token = await getMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        count,
      }),
      headers: {
        token :` ${token}` ,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
}

export async function clearCart() {
  const token = await getMyToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "DELETE",
    headers: {
       token :` ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}