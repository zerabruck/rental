import { House } from '@/types/type'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import {BiSolidBed} from "react-icons/bi"
import {LiaBathSolid} from "react-icons/lia"
import {MdSquareFoot} from "react-icons/md"

const HouseCard= ({housedata}:{housedata:House}) => {
    const route = useRouter()
    const clickHandler = () =>{
        route.push(`/house/${housedata.id}`)
    }
  return (
    <div className=' w-full border-2 rounded-t-2xl border-[#EEEE] bg-white shadow-sm' onClick={clickHandler}>
        <div className='relative w-full h-[15rem] rounded-t-2xl overflow-hidden'>
            <Image className='object-cover rounded-t-2xl hover:scale-110 transition duration-500 cursor-pointer' fill alt='house image' src={housedata.coverPhotoUrl} />
        </div>
        <div className='p-3'>
            <div className='flex justify-between items-center'>
            <p className=' text-xl pt-4'><span className='text-orange-500 font-bold'>{housedata.price}</span> birr</p>
            <p className='bg-green-100 w-fit px-2 py-1 rounded-md text-green-500'>{housedata.wantTo}</p>
            </div>
            <p className='font-bold text-2xl capitalize pt-5'>{housedata.address.slice(0,13)}...</p>
            <p className='capitalize pt-1 text-light-text'>Ethiopia</p>
            <div className='flex gap-2 flex-wrap'>
                <div className='flex justify-center items-center gap-2'>
                    <div className='bg-gray p-1 rounded-lg'>
                        <BiSolidBed/>
                    </div>
                <p>{housedata.numberOfBedrooms}beds</p>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <div className='bg-gray p-1 rounded-lg'>
                    <LiaBathSolid/>
                    </div>
                <p>{housedata.numberOfBathrooms}baths</p>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <div className='bg-gray p-1 rounded-lg'>
                    <MdSquareFoot/>
                    </div>
                <p>{housedata.propertySize}sqft</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HouseCard