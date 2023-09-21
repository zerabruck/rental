import React, {useState, useEffect} from 'react'
import {AiOutlineHome} from "react-icons/ai"
import {CgProfile} from "react-icons/cg"
import {MdOutlineAddBusiness} from "react-icons/md"
import { Properties } from './Properties'
import CreateHouseForm from './CreateHouseForm'
import { Profile } from './Profile'
import { getAuth,signOut } from "firebase/auth"
import { useRouter } from 'next/router'
import { auth } from '@/config/firebase'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/feature/auth/user'

export const DashBoard = () => {
    const [tab, setTab] = useState("properties")
    const user = getAuth()
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user.currentUser) {
          router.push('/login');
        }
      }, [user.currentUser, router]);
      const logout = async() =>{
        try{
          
          await signOut(auth)
          dispatch(logoutUser())
          router.push('/');

        }
        catch(err){
          console.error(err)
        }
    
      }
    
        return (
            <div className='flex  w-full'>
                <div className=' h-[100vh] cursor-pointer border-r border-r-[#EEEE] sm:w-[14%]   flex gap-3 flex-col items-center  justify-center'>
                    <div onClick={() => setTab("properties")} className= {`flex  items-center  py-4 pl-5 text-xl font-bold gap-2 w-full ${tab === "properties" && "border-l-primary border-l-4 text-primary"} `} >
                        <AiOutlineHome size = {25}/>
                        <p className='max-md:hidden' >Properties</p>
                    </div>
                    <div  onClick={() => setTab("profile")} className= {`flex  items-center  py-4 pl-5 text-xl font-bold gap-2 w-full ${tab === "profile" && "border-l-primary border-l-4 text-primary"} `} >
                        <CgProfile size = {25}/>
                        <p className='max-md:hidden'>Profile</p>
                    </div>
                    <div  onClick={() => setTab("postProperty")} className= {`flex  items-center  py-4 pl-5 text-xl font-bold gap-2 w-full ${tab === "postProperty" && "border-l-primary border-l-4 text-primary"} `} >
                        <MdOutlineAddBusiness size = {25}/>
                        <p className='max-md:hidden'>Post Property</p>
                    </div>
                    <button  onClick={logout} className= {` self-start mx-2 hover:rounded-md    py-2 px-4   text-xl font-bold gap-2  bg-red-200 `} >
                        Logout
                    </button>
                </div>
                <div className='bg-gray w-[89%] h-[100vh] overflow-scroll overflow-x-hidden relative'>
                    {
                        tab === "properties" && 
                        <div>
                            <Properties/>
                        </div>
                    }
                    {
                        tab === "postProperty" && 
                        <div className='sm:px-12 px-2 pb-10'>
                            <p className='text-[3rem] font-semibold max-w-[1000px] m-auto py-5 capitalize'>Create Property</p>
                            <CreateHouseForm/>
                        </div>
                    }
                    {
                        tab === "profile" && 
                        <div className='sm:px-12 px-4 pb-10'>
                            <p className='text-[3rem] font-semibold max-w-[700px]  py-5 capitalize m-auto'>Profile</p>
        
                            <Profile/>
                        </div>
                    }
                </div>
            </div>
        )

    

}
