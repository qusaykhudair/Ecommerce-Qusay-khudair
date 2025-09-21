import { getAllCategories } from '@/api/Category.api';
import { CategoryType } from '@/types/products.type';
import React from 'react'
import CategoryCarousel from '../CategoryCarousel/CategoryCarousel';

export default async function CategorySlider() {
  


    const getAllCategoriesData:CategoryType[] = await getAllCategories(); 

  
    return (
    <>
        <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">All Categories</h2>
      <CategoryCarousel getAllCategoriesData={getAllCategoriesData}/>
    </section>
    </>
  )
}
