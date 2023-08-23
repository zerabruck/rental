import Image from 'next/image'
import React from 'react'

function Interest() {
  return (
    <div className='flex flex-col gap-3 justify-center items-center w-fit'>
        <div className='relative w-72 h-80 rounded-2xl overflow-hidden'>
            <Image fill className='rounded-2xl object-cover hover:scale-110 transition duration-500 cursor-pointer'  alt="interest image" src="/img/home/cotton-home.jpg" /> 
        </div>
        
            <p className='font-semibold text-dark-text'>Pick up the earliest sunrise </p>
            <button className="border-2 border-light-text/[.25] rounded-lg px-3 py-2 w-fit">2453 <span className='text-light-text'> properties</span></button>
        
    </div>
  )
}

export default Interest