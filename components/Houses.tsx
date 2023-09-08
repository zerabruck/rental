import React from 'react'
import {CiLocationOn} from 'react-icons/ci'

const Houses = () => {
  return (
    <div className='m-12'>
        <div>
            <div className='bg-gray flex  w-fit rounded-xl  '>
                <button className='px-5 border-2 py-3 rounded-xl'>sell</button>
                <button className='px-5 py-3'>rent</button>
            </div>
            <div>
                <CiLocationOn />
                <input placeholder='search by location' />
            </div>
        </div>

        <div>
            <div>
                <div>
                    <CiLocationOn/>
                    <p>Bedrooms</p>
                </div>
                <div>
                <input type='number' />
                <p>-</p>
                <input type='number' />
                </div>
            </div>
        </div>

    </div>
  )
}

export default Houses