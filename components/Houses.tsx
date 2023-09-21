import { House } from '@/types/type'
import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore"
import { db } from '@/config/firebase'
import Search from './Search'
import HouseCard from './common/HouseCard'
import { useRouter } from 'next/router'
import Loading from './common/Loading'
const Houses = () => {
  const [houseData, setHouseData] = useState<House[] | null>(null)
  const [serachResult, setSearchResult] = useState<House[] | null>(null)
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {

      const q = collection(db, 'houses')
      try {
        const querySnapshot = await getDocs(q);
        const houses= querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as House[];
        setHouseData(houses)
        setSearchResult(houses)
        // setSearchResult((prevSearchResult) => houses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
      fetchData(); 
    }, []);
    // console.log(houseData)
    const houseClickHandler = (id:string) =>{
      router.push(`/house/${id}`)


    }
    if (houseData ){

      return (
        <div>
          <div className=' max-w-[1200px] min-h-screen m-auto'>
            <Search data = {houseData} result = {setSearchResult} />
            <div  className='flex flex-wrap max-md:justify-center  '>
    
            {
              serachResult?.map((house) =>{
                return(
                  <div key={house.id} className='m-2 md:w-[30%] sm:w-[40%] w-[80%] rounded-b-xl' onClick={() => houseClickHandler(house.id)}>             
                    <HouseCard housedata = {house}   />
                  </div>
                )
              })
            }
            </div>
    
    
          </div>
    
        </div>
      )
    }
    else{
      <Loading/>
    }
}

export default Houses