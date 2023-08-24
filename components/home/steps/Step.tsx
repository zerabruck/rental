import React from 'react'
import Image from 'next/image'
import { HomeStep } from '../../../types/type'
import OverlaySearch from '../overlayCards/OverlaySearch'
const Step:React.FC<HomeStep> = ({id, url,title, description}) => {
    let backgroundColor = ''
    switch (id) {
        case 1:
            backgroundColor = "#FD8B7A"
            break;
        case 2:
            backgroundColor = "#F9F871"
            break;
        case 3:
            backgroundColor = "#FFBD67"
            break;
    
        default:
            backgroundColor = "#ffff"
            break;
    }
  return (
    <div className={`flex justify-center ${id % 2 == 0 && 'flex-row-reverse'} items-center my-14`}>
        {/*  color choices 
        bg-[#F9F871]
        bg-[#FD8B7A]
        bg-[#FFBD67]
         */}
        <div className={`relative w-[30%] h-[30rem] rounded-3xl bg-[${backgroundColor}]`}>
            <Image className='object-cover rounded-3xl' fill alt="contact owner" src={url}/>
        </div>
        <div className=' ml-16 pr-16 -mr-3'>
            <p className="text-3xl capitalize font-semibold mb-4">{title}</p>
            <p className='max-w-[21rem] text-light-text'>{description}</p>
        </div>
    </div>
  )
}

export default Step