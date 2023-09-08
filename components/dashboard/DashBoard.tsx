import React, {useState} from 'react'
import {AiOutlineHome} from "react-icons/ai"
import {CgProfile} from "react-icons/cg"
import {MdOutlineAddBusiness} from "react-icons/md"
import { Properties } from './Properties'
import CreateHouseForm from './CreateHouseForm'
import { Profile } from './Profile'
export const DashBoard = () => {
    const [tab, setTab] = useState("properties")
  return (
    <div className='flex  w-full'>
        <div className=' h-[100vh] cursor-pointer border-r border-r-[#EEEE] w-[14%]   flex gap-3 flex-col items-center  justify-center'>
            <div onClick={() => setTab("properties")} className= {`flex  items-center  py-4 pl-5 text-xl font-bold gap-2 w-full ${tab === "properties" && "border-l-primary border-l-4 text-primary"} `} >
                <AiOutlineHome size = {25}/>
                <p>Properties</p>
            </div>
            <div  onClick={() => setTab("profile")} className= {`flex  items-center  py-4 pl-5 text-xl font-bold gap-2 w-full ${tab === "profile" && "border-l-primary border-l-4 text-primary"} `} >
                <CgProfile size = {25}/>
                <p>Profile</p>
            </div>
            <div  onClick={() => setTab("postProperty")} className= {`flex  items-center  py-4 pl-5 text-xl font-bold gap-2 w-full ${tab === "postProperty" && "border-l-primary border-l-4 text-primary"} `} >
                <MdOutlineAddBusiness size = {25}/>
                <p>Post Property</p>
            </div>
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
                <div className='px-12 pb-10'>
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
