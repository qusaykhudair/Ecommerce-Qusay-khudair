"use client"
import Image from 'next/image'
import logo from '../../../../public/images/freshcart-logo.svg'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
 import { useRouter } from "next/navigation";
import { ShoppingCart } from 'lucide-react'
import { useContext } from 'react'
import { CartContext, CartContextType } from '@/context/cart.context'

export default function Navbar() {
  const {data} = useSession();
const router = useRouter();
  const cart = useContext(CartContext) as CartContextType;

async function logOut(){
    await signOut();
    router.push('/login')
  }
  return (
    <nav className="shadow-md bg-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image src={logo} alt="nav-logo" className="w-45 cursor-pointer hover:scale-105 transition-transform duration-300" />
          </Link>

          <ul className="flex items-center gap-6 text-gray-700 font-medium">
            <li>
              <Link href="/" className="hover:text-green-600 transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-green-600 transition-colors duration-300">Products</Link>
            </li>
            {/* <li>
              <Link href="/categories" className="hover:text-green-600 transition-colors duration-300">Categories</Link>
            </li> */}
            {/* <li>
              <Link href="/brands" className="hover:text-green-600 transition-colors duration-300">Brands</Link>
            </li> */}

            {data ? <>
              <li>
              <Link href="/allorders" className="hover:text-green-600 transition-colors duration-300">Orders</Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-green-600 transition-colors duration-300">Cart</Link>
            </li>
            
            </> : ''}
            
          
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Social Icons */}
          <ul className="flex items-center gap-4 text-gray-500 text-lg">
         
           <li className="relative">
  <Link href={"/cart"}>
    <ShoppingCart />
  </Link>

  <h5
    className="bg-green-600 text-white rounded-full w-5 h-5 flex justify-center items-center absolute -right-3 -top-3 text-xs"
  >
    {cart.numOfCartItems ?? 0}
  </h5>
</li>

         
            <li><i className="fa-brands fa-facebook hover:text-blue-600 transition-colors duration-300 cursor-pointer"></i></li>
            <li><i className="fa-brands fa-instagram hover:text-pink-500 transition-colors duration-300 cursor-pointer"></i></li>
            <li><i className="fa-brands fa-twitter hover:text-blue-400 transition-colors duration-300 cursor-pointer"></i></li>
            <li><i className="fa-brands fa-linkedin hover:text-blue-700 transition-colors duration-300 cursor-pointer"></i></li>
            <li><i className="fa-brands fa-tiktok hover:text-black transition-colors duration-300 cursor-pointer"></i></li>
          </ul>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {data ? 
            <>
          
              <h1 className='bg-green-500 rounded-md border px-4 py-2 font-bold text-white '>Hi {data.user?.name}</h1>  
            <Link onClick={logOut} href="" className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300">
              Logout
            </Link> 
            
        
            
             </> : <> 
             <Link href="/login" className="px-4 py-2 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-all duration-300">
              Register
            </Link>
            </>}
          </div>
        </div>
      </div>
    </nav>
  )
}
