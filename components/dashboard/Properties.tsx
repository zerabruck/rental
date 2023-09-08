import React, { useState, useEffect } from 'react'
import { db } from '@/config/firebase'
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore"
import { House } from '@/types/type'
import HouseCard from '../common/HouseCard'
import UpdateHouseForm from './UpdateHouseForm'
import { useSelector } from 'react-redux'
import { RootState } from "@/store";

export const Properties:React.FC = () => {
    const [houses, setHouses] = useState<House[]>([])
    const [display, setDisplay] = useState('')
    const user = useSelector((state: RootState) =>state.auth.user )
    useEffect(() => {
      const fetchData = async () => {

        const q = query(collection(db, 'houses'), where('userId', '==', user));
        try {
          const querySnapshot = await getDocs(q);
          const houses= querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as House[];
          setHouses(houses)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
        fetchData(); 
      }, [display]);
      const removeHouse = async(houseId:string) =>{
        try{
          const documentRef = doc(db,'houses',houseId)
          await  deleteDoc(documentRef)
        }
        catch(err){
          console.log(err)
        }
      }
  return (
    <div className='max-w-[1000px] m-auto '>
      <p className= {`sm:text-[3rem] text-3xl font-semibold py-6 ${display !== '' && "hidden" }`}>Your Properties</p>
      <div className='flex flex-wrap max-md:justify-center '>
        {
          houses.map((house:House) =>{
            return (
              <div key={house.id} className='m-2 md:w-[30%] sm:w-[40%] w-[80%] '>
                <div className={`${display !== '' && "hidden" }`}>
                <HouseCard housedata = {house}   />
                <div className='flex justify-between bg-white'>
                <button  onClick={() => setDisplay(house.id)} className='w-1/2 border-2 border-t-0 border-r-0 rounded-es-lg  hover:bg-gray border-[#EEEE]'>Edit</button>
                <button  onClick={() => removeHouse(house.id)} className=' w-1/2 border-2 border-t-0 rounded-ee-lg  hover:bg-red-500 hover:text-red-100 border-[#EEEE]'>Delete</button>

                </div>

                </div >
                  {
                    display === house.id &&
                <div key={house.id} className='absolute  -left-4 top-5  m-auto px-12 pb-10 z-50 w-[80vw]  '>
                    <UpdateHouseForm setDisplay = {setDisplay} houseData={house}/>
                </div>
                  }
                  

              </div>
            )
          })
        }
      </div>
    </div>
  )
}
