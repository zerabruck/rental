import React, {useState,useEffect} from 'react'
import Image from 'next/image'
import { HomeStep } from '../../../types/type'
const Step:React.FC<HomeStep> = ({id, url,title, description, backGroundColor}) => {
    const [backgroundColor, setBackGroundColor] = useState("")
    useEffect(() =>{
        setBackGroundColor(backGroundColor)
    })
  return (
    <div className={`flex max-md:flex-col justify-center ${id % 2 == 0 && 'flex-row-reverse'} items-center my-14`}>
        <div className={`relative md:w-[30%] sm:w-[80%] w-[90%]  h-[30rem] rounded-3xl bg-[${backgroundColor}]`}>
        {
            id == 1 && <div className={`w-[18rem] h-[20rem]   z-10 object-cover absolute max-sm:hidden -top-12 md:-left-1/4`}>
            <Image className=' object-contain   rounded-3xl w-full h-full' fill alt="contact owner" src="/img/home/steps/search-overlay.png"/>
        </div>
        }
        {
            id == 2 && <div className={`w-[12rem] h-[20rem]  z-10 object-cover absolute -top-8 max-sm:hidden md:-right-1/4 right-0`}>
            <Image className=' object-contain rounded-3xl w-full h-full' fill alt="contact owner" src="/img/home/steps/select-overlay.png"/>
        </div>
        }
        {
            id == 3 && <div className={`w-[12rem] h-[20rem]  z-10 object-cover absolute -top-8 max-sm:hidden md:-left-1/4`}>
            <Image className=' object-contain rounded-3xl w-full h-full' fill alt="contact owner" src="/img/home/steps/contact-overlay.png"/>
        </div>
        }
            <Image className='object-cover rounded-3xl' fill alt="contact owner" src={url}/>
        </div>
        <div className=' sm:ml-16 ml-6 pr-16 -mr-3'>
            <p className="text-3xl capitalize font-semibold mb-4">{title}</p>
            <p className='max-w-[21rem] text-light-text'>{description}</p>
        </div>
    </div>
  )
}
export default Step

// import React from 'react'
// import Image from 'next/image'
// import { HomeStep } from '../../../types/type'
// import OverlaySearch from '../overlayCards/OverlaySearch'
// const Step:React.FC<HomeStep> = ({id, url,title, description}) => {
//     let backgroundColor = ''
//     switch (id) {
//         case 1:
//             backgroundColor = "#FD8B7A"
//             break;
//         case 2:
//             backgroundColor = "#F9F871"
//             break;
//         case 3:
//             backgroundColor = "#FFBD67"
//             break;

//         default:
//             backgroundColor = "#ffff"
//             break;
//     }
//   return (
//     <div className={`flex justify-center ${id % 2 == 0 && 'flex-row-reverse'} items-center my-14`}>
//         {/*  color choices 
//         bg-[#F9F871]
//         bg-[#FD8B7A]
//         bg-[#FFBD67]
//          */}
//         <div className={`relative w-[30%] h-[30rem] rounded-3xl bg-[${backgroundColor}]`}>
//             <Image className='object-cover rounded-3xl' fill alt="contact owner" src={url}/>
//         </div>
//         <div className=' ml-16 pr-16 -mr-3'>
//             <p className="text-3xl capitalize font-semibold mb-4">{title}</p>
//             <p className='max-w-[21rem] text-light-text'>{description}</p>
//         </div>
//     </div>
//   )
// }

// export default Step