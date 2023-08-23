import React from 'react'
import {BsHouseHeart} from 'react-icons/bs'
import { HomeService } from '../../types/type'
const Service:React.FC<HomeService> = ({icon, title, information}) => {
  return (
    <div className='flex flex-col justify-center items-center rounded-xl bg-white md:w-[24%] p-8  ' >
        
        <div className='bg-primary-light min-w-[3rem] min-h-[3rem] flex justify-center items-center rounded-full mt-6 mb-3'>
        <BsHouseHeart color = "#5139ED" size = "1.6rem" />
        </div>
        <p className='font-semibold mb-1 capitalize text-xl text-center'>{title}</p>
        <p className='max-w-[13rem] text-center text-sm text-light-text'>{information}</p>   

    </div>
  )
}

export default Service