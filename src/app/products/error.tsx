"use client";
import Link from "next/link";


export default function error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
     
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-100 mb-6">
        <i className="fa-solid fa-circle-exclamation text-red-600 text-4xl"></i>
      </div>

   
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Oops! Something went wrong
      </h1>

    
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn’t load the products right now.  
        Please check the link or try again later.
      </p>

   
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
        >
          Go Home
        </Link>
       
      </div>
    </div>
  );
}
