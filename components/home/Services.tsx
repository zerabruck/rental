import React from 'react'
import Service from './Service'
import services from "./../../data/home/services.json"
import { HomeService } from '../../types/type'

function Services() {
  return (
    <div  className='bg-gray mx-8 rounded-2xl mt-6 '>
        <div className='flex justify-between max-md:flex-col md:items-end md:mx-28 p-6 pt-8'>
          <div>
        <p className='text-primary font-semibold'>EHM,SO?</p>
        <p className='text-3xl font-bold text-dark-text'>What we do</p>
        <p className='text-light-text capitalize'>full-service agents,modern technology</p>
          </div>
          <div>
            <button className='bg-primary-light px-4 py-2 text-primary rounded-xl font-semibold hover:shadow-md'>See more</button>
          </div>
        </div>
        <div className='flex max-md:flex-col   justify-center gap-2 mx-3  '>
        {
          services.map((service:HomeService)=>{
            return(
                <Service id = {service.id} key = {service.id} icon= {service.icon} title = {service.title} information={service.information}/>
            )
          })
        }
        </div>
    </div>
  )
}

export default Services