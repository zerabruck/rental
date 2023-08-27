import Image from 'next/image'
import React from 'react'
import { HomeInterest } from '../../../types/type'

const Interest:React.FC<HomeInterest> = ({url, id, propertyAmount, propertyType})=> {
  return (
    <div className='flex flex-col gap-3 justify-center items-center md:w-[25%] md:h-[30rem] sm:h-[24rem] sm:w-[80%] w-[92%] h-[22rem] '>
        <div className='relative w-full  h-full rounded-3xl overflow-hidden'>
            <Image fill className='rounded-2xl object-cover hover:scale-110 transition duration-500 cursor-pointer'  alt="interest image" src={url} /> 
        </div>
        
            <p className='font-semibold text-dark-text'>{propertyType}</p>
            <button className="animate-pulse  border-2 border-light-text/[.25] rounded-lg px-3 py-2 w-fit">{propertyAmount} <span className='text-light-text'> properties</span></button>
        
    </div>
  )
}

export default Interest