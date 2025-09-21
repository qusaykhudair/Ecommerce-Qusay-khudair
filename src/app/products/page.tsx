import { ProdctsType } from "@/types/products.type";

import Product from "../_components/Product/Product";
import getAllProducts from "@/api/product.api";
export default async function page() {



const allProducts:ProdctsType[] = await getAllProducts();

 
  return (
    <>
    <div className="container py-8"> 
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
  
{allProducts.map((product) => (
 <Product key={product.id} product={product} />
))}

</div>
    </div>

    </>
  )

}