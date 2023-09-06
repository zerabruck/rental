import Image from 'next/image'
import React from 'react'

export const Profile = () => {
  return (
    <div className='bg-white max-w-[1000px] rounded-xl shadow-md m-auto'>
        <div className=' flex px-12 py-4 max-sm:px-2'>
            <div className='relative w-[12rem] h-[12rem]'>
                <Image alt='profilet picture' fill src='/img/home/white-house.jpg' />
            </div>
            <div>
                <button>Change</button>
                <button>Delete</button>
            </div>
        </div>
        <form>
            <div className='flex flex-col gap-3  px-12 py-4 max-sm:px-2'>
            <label className='font-semibold'>
                Name
            </label>
            <input required type='text' className="block rounded-lg w-2/3 max-md:w-full h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            <div className='flex flex-col gap-3  px-12 py-4 max-sm:px-2'>
            <label className='font-semibold'>
                Phone Number
            </label>
            <input required type='text' className="block rounded-lg w-2/3 max-md:w-full h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            <div className="h-[.5px] w-full border border-[#EEEEEE] mt-5 "></div>
            <div className='flex flex-col gap-3  px-12 py-4 max-sm:px-2'>
            <label className='font-semibold'>
                Email
            </label>
            <input required type='text' className="block rounded-lg w-2/3 max-md:w-full h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            <div className='flex flex-col gap-3  px-12 py-4 max-sm:px-2'>
            <label className='font-semibold'>
                Change Password
            </label>
            <input required type='text' className="block rounded-lg w-2/3 max-md:w-full h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            <div className="h-[.5px] w-full border border-[#EEEEEE] mt-5 "></div>
            <div className='flex justify-between mt-5 px-12 pb-3  max-sm:px-2'>
                <button type='submit'  className="bg-primary w-fit text-white px-4 py-2 rounded-[3rem] cursor-pointer">Submit</button>   
            </div>
    
        </form>
    </div>
  )
}
