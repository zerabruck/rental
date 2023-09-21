import Link from 'next/link'
import { useRouter } from 'next/router'
import React,{useState} from 'react'
import {FaHome} from "react-icons/fa"
import {GiHamburgerMenu} from "react-icons/gi"
import { getAuth } from "firebase/auth"
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

function Header() {
    const router = useRouter()
    const auth = useSelector((state: RootState) =>state.auth.user )

    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="sm:px-12   lg:py-4 capitalize mb-6">
        <ul className='flex max-lg:hidden lg:justify-between justify-evenly items-center'>
            
            <div className='flex justify-around gap-4  w-[40%] font-semibold text-[1.5rem]'>
            <li className='px-2 rounded-sm gap-2 bg-primary text-base flex items-center '><FaHome color = 'white' size={23}/> <p className='bg-white px-2 rounded-sm capitalize '>Shelter</p></li> 
            <li className={` hover:border-b-4 border-b-primary rounded-sm ${router.pathname === "/" && "border-b-4 border-b-primary rounded-sm"}`}> <Link href='/'>home</Link> </li>
            <li className={` hover:border-b-4 border-b-primary rounded-sm ${router.pathname === "/houses" && "border-b-4 border-b-primary rounded-sm"}`}><Link href='/houses'>Properties</Link></li>
            <li className={` hover:border-b-4 border-b-primary rounded-sm ${router.pathname === "/contact" && "border-b-4 border-b-primary rounded-sm"}`}><Link href='/contact'>Contact</Link></li>
            {
              auth && 
            <li className={` hover:border-b-4 border-b-primary rounded-sm ${router.pathname === "/dashboard" && "border-b-4 border-b-primary rounded-sm"}`}><Link href='/dashboard'>Dashboard</Link></li>
            }

            </div>
            <div className='flex justify-around gap-6  items-center  font-semibold text-[1.5rem]'>
            <li className={` hover:border-b-4 border-b-primary rounded-sm ${router.pathname === "/login" && "border-b-4 border-b-primary rounded-sm"}`}><Link href='/login'>Login</Link></li>
            <li className='border-2 border-primary text-primary rounded-[2rem] px-6 py-2'><Link href='/register'>Create Account</Link></li>
            </div>
        </ul>
        <div className='flex lg:hidden justify-end sm:p-2 '  onClick={() => setIsOpen(prev => !prev)}>
            <GiHamburgerMenu size = {53}/>
        </div>
        <div className={`fixed lg:hidden  justify-end top-0 right-0 h-full w-64 bg-white z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out duration-300`}>
      <div className="p-4 h-full">
        <ul className='flex flex-col gap-4 text-center  justify-center  h-full items-center'>
            
            <div className='flex flex-col gap-4  justify-center  w-[40%] font-semibold text-[1.5rem]'>
            <li className={` hover:border-b-4 border-b-primary rounded-sm ${router.pathname === "/" && "border-b-4 border-b-primary rounded-sm"}`}> <Link href='/'>home</Link> </li>
            <li className={` hover:border-b-4 border-b-primary rounded-sm ${router.pathname === "/houses" && "border-b-4 border-b-primary rounded-sm"}`}><Link href='/houses'>Properties</Link></li>
            <li className={` hover:border-b-4 border-b-primary rounded-sm ${router.pathname === "/contact" && "border-b-4 border-b-primary rounded-sm"}`}><Link href='/contact'>Contact</Link></li>
            {
              auth && 
            <li className={` hover:border-b-4 border-b-primary rounded-sm ${router.pathname === "/dashboard" && "border-b-4 border-b-primary rounded-sm"}`}><Link href='/dashboard'>Dashboard</Link></li>
            }
            </div>
            <div className='flex flex-col  justify-center gap-6  items-center  font-semibold text-[1.5rem]'>
            <li className={` hover:border-b-4 border-b-primary rounded-sm ${router.pathname === "/login" && "border-b-4 border-b-primary rounded-sm"}`}><Link href='/login'>Login</Link></li>
            <li className='border-2 border-primary text-primary rounded-[2rem] px-6 py-2'><Link href='/register'>Create Account</Link></li>
            </div>
        </ul> 
      </div>
      <button onClick={() => setIsOpen(prev => !prev)} className="fixed top-4 p-2 right-4 z-50   bg-gray-200 rounded-full">
        <GiHamburgerMenu size = {53}/>
      </button>
    </div>


    </div>
  )
}

export default Header