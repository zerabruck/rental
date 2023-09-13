import Image from 'next/image'
import React,{useEffect,useState} from 'react'
import {CiLocationOn} from 'react-icons/ci'
import {BiSolidBed} from "react-icons/bi"
import {LiaBathSolid} from "react-icons/lia"
import {MdSquareFoot, MdOutlineEmail} from "react-icons/md"
import {IoCallOutline} from "react-icons/io5"
import SlideShow from '@/components/common/SlideShow'
import { useRouter } from 'next/router'
import { db } from '@/config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { House, User } from '@/types/type'
const house = () => {
    const router = useRouter()
    const houseId = router.query?.houseId as string
    const [houseData, setHouseData] = useState<House | null>(null)
    const [posterAccount, setPosterAccount] = useState<User | null>(null)
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(()=>{
        
        const fetchData = async() =>{
            if (houseId !== undefined){
                const docRef = doc(db,'houses', houseId)
                await getDoc(docRef).then( async (res) =>{
                    const house = res.data() as House
                    console.log(res.exists())
                    if (res.exists()){

                        setHouseData({...house, id:houseId})
                        const posterRef = doc(db,"users", house.userId)
                        await getDoc(posterRef).then(res =>{
                            const user = res.data() as User
                            setPosterAccount({...user, userId:house.userId})
                            console.log('user found')
                        })
                    }else{
                        setErrorMessage("No house can be found")
                    }

                }).catch(err =>{
                    console.log(err)
                })

            }

        }
        fetchData()


    }, [houseId])
    
    if (errorMessage){
        return(
            <div>
                {errorMessage}
            </div>
        )
    }

    if (houseData ){
        console.log(posterAccount)

        return (
            
          <div className='sm:m-4 m-2'>
              <div className='relative rounded-2xl w-full h-[50vh] overflow-hidden'>
                  <Image className='object-cover rounded-2xl' src={houseData.coverPhotoUrl} alt="house detail" fill />
              </div>
              <div className='flex max-md:flex-col gap-8'>
                  <div className='md:w-[65%]'>
                      <p className='text-[3rem] max-md:text-[2rem] font-semibold my-2 '>{houseData.name}</p>
                      <p className='flex items-center gap-1'><CiLocationOn size = {18}/>{houseData.address} </p>
                      <p className=' my-3'><span className='font-bold'>Description:</span>{houseData.description} </p>
                       <div>
                          <SlideShow images={houseData.picturesUrl} />
                       </div>
                       
                       
                       
      
                  </div>
                  <div>
                      <p className='capitalize font-bold my-3'>brief information</p>
                      <p className='bold capitalize font-semibold'>owner</p>
                      <div className='flex items-center gap-3 my-3'>
                        {
                            posterAccount?.profilePicture ?
                            <div className='relative rounded-full w-[5rem] h-[5rem] overflow-hidden'>
                      <Image className='object-cover rounded-full hover:scale-125 transition duration-500' src={posterAccount.profilePicture} alt="house detail" fill />
                       </div>:
                       <div className=' flex justify-center items-center rounded-full w-[5rem] h-[5rem] overflow-hidden'>
                       <p className='text-xl font-bold'>{posterAccount?.name[0]}</p>
                        </div>

                        } 
                      
                       <div>
                          <p>{posterAccount?.name}</p>
                          <p>{posterAccount?.email}</p>
                       </div>
                      </div>
      
                      <div className='flex gap-2 flex-wrap bg-gray w-fit p-2 rounded-xl'>
                      <div className='flex justify-center items-center gap-2'>
                          <div className='bg-gray p-1 rounded-lg'>
                              <BiSolidBed/>
                          </div>
                      <p>{houseData.numberOfBedrooms} beds</p>
                      </div>
                      <div className='flex justify-center items-center gap-2'>
                          <div className='bg-gray p-1 rounded-lg'>
                          <LiaBathSolid/>
                          </div>
                      <p>{houseData.numberOfBathrooms} baths</p>
                      </div>
                      <div className='flex justify-center items-center gap-2'>
                          <div className='bg-gray p-1 rounded-lg'>
                          <MdSquareFoot/>
                          </div>
                      <p>{houseData.propertySize} sqft</p>
                      </div>
                  </div>
                  <p className='my-3 text-lg font-bold'>${houseData.price}<span className='font-normal'>{ houseData.wantTo == 'rent' && "/night"}</span></p>
                  
                  <button className='flex rounded-lg items-center py-3 justify-center w-full gap-1 bg-primary text-white'><a href="tel:123-456-7890" className='flex items-center justify-center gap-2'><IoCallOutline /> Call Now</a></button>
      
      
                  </div>
              </div>
      
          </div>
        )
    } else{
        return (
            <div>
                loading
            </div>
        )
    }
  
}

export default house