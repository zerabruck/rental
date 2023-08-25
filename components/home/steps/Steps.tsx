import React from 'react'
import Step from './Step'
import steps from "../../../data/home/steps.json"
import { HomeStep } from '../../../types/type'

function Steps() {
  return (
    <div className='bg-gray '>
        <div className='flex flex-col items-center justify-center text-center gap-5'>
            <p className='text-4xl font-bold capitalize'> How eaisy it <span className='text-primary'>works</span> for you</p>
            <p className='max-w-[30rem] text-light-text'>How does the real estate industry works? 
                The real estate industry works because the value
                 of real estate tends to rise</p>
        </div>
        <div>
            {
                steps.map((step:HomeStep) =>{
                    return (
                        <Step key={step.id} id={step.id} title={step.title} description={step.description} url={step.url} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default Steps