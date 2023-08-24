import React from 'react'
import Interest from './Interest'
import interests from "./../../../data/home/interests.json"
import { HomeInterest } from '../../../types/type'
function Interests() {
  return (
    <div className=' '>
        <div className='flex justify-center flex-col items-center gap-3 mt-6'>
          <p className='text-3xl font-bold capitalize text-center'>Move to what moves you</p>
          <p className='text-light-text text-center'>Keep calm & travel on</p>
        </div>
        <div className='flex gap-5 justify-center items-center max-md:flex-col  mt-14'>
          {
            interests.map((interest:HomeInterest) =>{
              return(
                <Interest key = {interest.id} url={interest.url} id = {interest.id} propertyAmount={interest.propertyAmount} propertyType={interest.propertyType}/>
              )
            })
          }
        </div>
    </div>
  )
}

export default Interests