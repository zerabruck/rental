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
        rent:true,
        sell:false,
        location:'',
        minBedrooms:'',
        maxBedrooms:'',
        minBathrooms:'',
        maxBathrooms:'',
        minPropertySize:'',
        maxPropertysize:'',
        houseType:'all',

    })
    const changeHandler =(event: React.ChangeEvent<HTMLInputElement>) =>{
        setQuery(prev => ({...prev , [event.target.name]:event.target.value}))
        serach({...query, [event.target.name]:event.target.value})

    }

    const serach = (result_query:SearchQuery) =>{
        let search_result = data
        if (result_query.location ){
            let miniSearch = new MiniSearch({
                fields: ['address', 'description'], 
                storeFields: ['id','address', 'description', 'name', 'coverPhotoUrl', 'picturesUrl', 'houseType', 'numberOfBathrooms', 'numberOfBedrooms', 'propertySize', 'price', 'userId', 'wantTo' ],
                searchOptions: {
                    boost: { address: 2 },
                    fuzzy: 0.5
                  }
              })
              miniSearch.addAll(data)
              search_result = miniSearch.search(result_query.location) as unknown as House[]
        }
        
        // houseType:''
        if (result_query.rent){
            search_result = search_result.filter(result => result.wantTo === "rent")
        }
        if (result_query.sell){
            search_result = search_result.filter(result => result.wantTo === "sell")
        }
        if (result_query.minBathrooms){
            search_result = search_result.filter(result => result.numberOfBathrooms >= parseInt(result_query.minBathrooms))
        }
        if (result_query.maxBathrooms){
            search_result = search_result.filter(result => result.numberOfBathrooms <= parseInt(result_query.maxBathrooms))
        }
        if (result_query.minBedrooms){
            search_result = search_result.filter(result => result.numberOfBedrooms >= parseInt(result_query.minBedrooms))
        }
        if (result_query.maxBedrooms){
            search_result = search_result.filter(result => result.numberOfBedrooms <= parseInt(result_query.maxBedrooms))
        }
        if (result_query.minPropertySize){
            search_result = search_result.filter(result => result.propertySize >= parseInt(result_query.minPropertySize))
        }
        if (result_query.maxPropertysize){
            search_result = search_result.filter(result => result.propertySize <= parseInt(result_query.maxPropertysize))
        }
        if (result_query.houseType && result_query.houseType !== 'all'){
            search_result = search_result.filter(result => result.houseType === result_query.houseType)
        }
        console.log(search_result)
        console.log(result_query.houseType)

        
        
        result(search_result)

    }
  return (
    <div className=''>
        <div className='flex gap-3'>
            <div className='bg-gray flex  w-fit rounded-xl font-semibold '>
                <button onClick={() =>{
                    setQuery(prev => ({...prev , rent:!prev.rent, sell:!prev.sell}))
                    serach({...query, rent:!query.rent, sell:!query.sell})
                }}  className={`px-5 py-2 rounded-xl capitalize   ${query.rent && 'text-primary border-2 bg-white  border-[#EEEEEE]'} `}>rent</button>
                <button onClick={() =>{
                    setQuery(prev => ({...prev , sell:!prev.sell, rent:!prev.rent}))
                    serach({...query, sell:!query.sell, rent:!query.rent}) 
                }}  className={`px-5  py-2 rounded-xl capitalize   ${query.sell && 'text-primary border-2 bg-white  border-[#EEEEEE]'} `}>sell</button>
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
                <input name='minBedrooms'  onChange={(e) => changeHandler(e)} type='number' className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                <p className='font-bold text-xl'>-</p>
                <input name='maxBedrooms' type='number'   onChange={(e) => changeHandler(e)} className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                </div>
            </div>
            <div className=''>
                <div className='flex font-semibold w-fit m-auto items-center gap-2 py-2'>
                    <LiaBathSolid/>
                    <p>Bathrooms</p>
                </div>
                <div className='flex gap-2 '>
                <input name='minBathrooms' type='number'  onChange={(e) => changeHandler(e)} className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                <p className='font-bold text-xl'>-</p>
                <input name='maxBathrooms' type='number'  onChange={(e) => changeHandler(e)} className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                </div>
            </div>
            <div className=''>
            <div className='flex w-fit font-semibold m-auto items-center gap-2 py-2'>
                    <BsHouseDoor/>
                    <p>House Type</p>
                </div>
                    <select onChange={(e) =>{
                        setQuery(prev => ({...prev , houseType:e.target.value}))
                        serach({...query, houseType:e.target.value})
                    }} 
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
                <input name='minPropertySize' type='number'  onChange={(e) => changeHandler(e)} className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                <p className='font-bold text-xl'>-</p>
                <input name='maxPropertysize' type='number'  onChange={(e) => changeHandler(e)} className=' py-2 max-w-[6rem] border-2 border-gray outline-none focus:border-primary rounded-xl' />
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default Search