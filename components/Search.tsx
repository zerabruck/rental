import React, { useState } from 'react'
import {CiLocationOn} from 'react-icons/ci'
import {BiSolidBed} from "react-icons/bi"
import {LiaBathSolid} from "react-icons/lia"
import {MdSquareFoot} from "react-icons/md"
import {BsHouseDoor} from "react-icons/bs"
import { House } from '@/types/type'
import MiniSearch from 'minisearch'

type SetStateFunction<T> = (prevState: T | ((prevState: T) => T)) => void;

interface SearchProps {
  data: House[];
  result: SetStateFunction<House[] | null>;
}
interface SearchQuery {
    rent:Boolean,
    sell:Boolean,
    location:string,
    minBedrooms:string,
    maxBedrooms:string
    minBathrooms:string,
    maxBathrooms:string
    minPropertySize:string,
    maxPropertysize:string,
    houseType:string
}
const Search: React.FC<SearchProps> = ({ data, result }) => {
    const [query, setQuery] = useState<SearchQuery >({
        rent:false,
        sell:false,
        location:'',
        minBedrooms:'',
        maxBedrooms:'',
        minBathrooms:'',
        maxBathrooms:'',
        minPropertySize:'',
        maxPropertysize:'',
        houseType:''

    })
    const changeHandler =(event: React.ChangeEvent<HTMLInputElement>) =>{
        setQuery(prev => ({...prev , [event.target.name]:event.target.value}))
        serach()

    }

    const serach = () =>{
        let result = data
        if (query.location ){
            let miniSearch = new MiniSearch({
                fields: ['address', 'description'], 
                storeFields: ['id','address', 'description', 'name', 'coverPhotoUrl', 'picturesUrl', 'houseType', 'numberOfBathrooms', 'numberOfBedrooms', 'propertySize', 'price', 'userId', 'wantTo' ]
              })
              miniSearch.addAll(data)
              console.log(miniSearch.search(query.location, { boost: { address: 2 }} ))     
        }
    }
  return (
    <div className=''>
        <div className='flex gap-3'>
            <div className='bg-gray flex  w-fit rounded-xl font-semibold '>
                <button className='px-5 border-2 py-2 rounded-xl bg-white capitalize text-primary   border-[#EEEEEE]'>rent</button>
                <button className='px-5 py-2 capitalize '>buy</button>
            </div>
            <div className='flex items-center bg-gray w-full rounded-xl '>
                <div className='px-2 '>
                <CiLocationOn size={22} />
                </div>
                <input name='location' onChange={(e) => changeHandler(e)} placeholder='search by location' className=' bg-gray border-2 border-l-0 rounded-l-none border-gray outline-none  rounded-xl py-2 placeholder:capitalize w-full' />
            </div>
        </div>

        <div className='flex bg-gray p-4 my-5 justify-evenly flex-wrap rounded-xl'>
            <div className=''>
                <div className='flex  font-semibold w-fit m-auto items-center gap-2 py-2'>
                    <BiSolidBed/>
                    <p>Bedrooms</p>
                </div>
                <div className='flex gap-2 '>
                <input type='number' className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                <p className='font-bold text-xl'>-</p>
                <input type='number' className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                </div>
            </div>
            <div className=''>
                <div className='flex font-semibold w-fit m-auto items-center gap-2 py-2'>
                    <LiaBathSolid/>
                    <p>Bathrooms</p>
                </div>
                <div className='flex gap-2 '>
                <input type='number' className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                <p className='font-bold text-xl'>-</p>
                <input type='number' className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                </div>
            </div>
            <div className=''>
            <div className='flex w-fit font-semibold m-auto items-center gap-2 py-2'>
                    <BsHouseDoor/>
                    <p>House Type</p>
                </div>
                    <select 
                        className=" w-fit block py-2  bg-white rounded-md  focus:ring  focus:border-primary   outline-none border-[#EEEEEE]"
                    >
                        <option value="all">Selected All</option>
                        <option value="Apartament">Apartament</option>
                        <option value="villa">villa</option>
                        <option value="G+">G+</option>
                        <option value="Condominum">Condominum</option>
                    </select>
                    
            </div>
            <div className=''>
                <div className='flex  font-semibold w-fit m-auto items-center gap-2 py-2'>
                    <MdSquareFoot/>
                    <p>Square Feet</p>
                </div>
                <div className='flex gap-2 '>
                <input type='number' className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                <p className='font-bold text-xl'>-</p>
                <input type='number' className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default Search