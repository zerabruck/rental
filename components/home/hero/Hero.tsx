import Image from 'next/image'
import React from 'react'
import {RiSearchLine} from "react-icons/ri"

const Hero= () => {
  return (
    <div>
        <div className='flex justify-between items-center  h-[90vh] md:p-12 p-5 relative '>
        <div className='flex flex-col gap-5 z-10 '>
            <p className='sm:text-[4.5rem] text-[3rem] font-bold max-w-xl text-black max-lg:bg-white max-lg:bg-opacity-80' > Lets find a <span className='text-primary'>home</span> that's perfect for you.</p>
            <p className='max-w-[28rem]  text-light-text font-semibold'>you can find rental homes curated easily. search based on your address , Property type or Price</p>
            <div className='flex '>
            <input type='text' className='bg-gray w-2/3 max-md:w-full active:border-primary rounded-l-xl outline-primary   py-5' />
            <div className='bg-gray hover:bg-primary  transition ease-in-out delay-150  rounded-r-[2rem] p-3 flex '>
            <button className='bg-primary  h-[3rem] w-[3rem] my-auto rounded-full ' placeholder='search here ....'> <RiSearchLine className = "m-auto" size = {24} color = 'white'/> </button>
            </div>
            </div>

        </div>
        <div className='relative max-lg:absolute z-0 lg:w-[45%] w-[70%] right-0  h-[60vh] '>
            <Image fill className='object-contain ' alt = "landing page image" src='/img/home/hero.png'  />
        </div>
    </div>
    </div>
  )
}

export default Hero