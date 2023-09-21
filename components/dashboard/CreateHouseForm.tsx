import React,{useState} from 'react'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { storage, db} from '@/config/firebase'
import {collection, addDoc} from "firebase/firestore"
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Loading from '../common/Loading'

const CreateHouseForm = () => {
    const [pictures, setPictures] = useState<File[]>([])
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [numberOfBedrooms, setNumberOfBedrooms] = useState('')
    const [numberOfBathrooms, setNumberOfBathrooms] = useState('')
    const [propertySize, setPropertySize] = useState('')
    const [wantTo, setWantTo] = useState("sell")
    const [houseType, setHouseType] = useState("villa")
    const [price, setPrice] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successVisible, setSuccessVisible] = useState(false)
    const user = useSelector((state:RootState) => state.auth.user)
    const [loading, setLoading] = useState(false)

    const hideMessage = () =>{
        setSuccessVisible(false)
    }

    if (successVisible){
        setTimeout(hideMessage, 2000)
    }

    const handlePictureSubmits = (event: React.ChangeEvent<HTMLInputElement> ) =>{
        const files = event.target.files
        if (files){
            const file = files[0]
            setPictures( prevpic => [...prevpic, file])
        }

    }
    const handlePicturesDelete = (picture :File) =>{
        setPictures(prevpics => prevpics.filter((prevpic => prevpic !== picture )))
    }
    const submitImage = async(image:File | null) =>{
        if (image === null) return ''
        const imageRef = ref(storage, `images/${image.name}`)
       const url = await uploadBytes(imageRef, image).then(async(snapshot) => {
            return await getDownloadURL(snapshot.ref).then(url =>{
                return url
            }).catch(err =>{
                console.error(err)
                setErrorMessage(err.message)
                return ''
            })

        }).catch(err =>{
            console.error(err)
            setErrorMessage(err.message)

            return ''
        })
        if (url){
            return url
        }
        
        else{
            return ''
        }

    }
    const submitHandler = async(event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        setLoading(true)
        if (coverPhoto !== null){
            setErrorMessage('')
            const imageUrl = await submitImage(coverPhoto)
            const uploadedPicturesUrls = [];
            for (const image of pictures) {
                const url = await submitImage(image);
                if (url !== "") {
                uploadedPicturesUrls.push(url);
                }
            }
            
            
            const collectionRef = collection(db,"houses")
            await addDoc(collectionRef,{
                userId:user,
                name:name,
                address:address,
                description:description,
                wantTo:wantTo,
                houseType:houseType,
                numberOfBathrooms:parseInt(numberOfBathrooms),
                numberOfBedrooms:parseInt(numberOfBedrooms),
                propertySize:parseInt(propertySize),
                price:parseInt(price),
                coverPhotoUrl:imageUrl,
                picturesUrl:uploadedPicturesUrls
            }).then(res =>{
                console.log('done')
                setLoading(false)
                setSuccessVisible(true)
                setPictures([])
                setCoverPhoto(null)
                setName("")
                setAddress("")
                setDescription("")
                setNumberOfBedrooms('')
                setNumberOfBathrooms('')
                setPropertySize('')
                setWantTo("sell")
                setHouseType("villa")
                setPrice('')
            }).catch(err =>{
                setErrorMessage(err.message)
            })
        }
        else{

            setErrorMessage("Cover photo is required.")
        }
    }
    
    
  return (
    <div className=' bg-white max-w-[1000px] m-auto rounded-xl shadow-md relative'>
        {
            successVisible && <p className="bg-green-500  text-white p-4 absolute top-0 left-0 right-0">
            Success!
          </p>
        }
        <form onSubmit={submitHandler}>
            {
                loading && <Loading/>
            }
            <div className='px-12 py-4 max-sm:px-2'>
            {
                errorMessage && 
            <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                <p>{errorMessage}</p>
            </div>
            }

            <div className='flex flex-col gap-3'>
            <label className='font-semibold'>
                Name<span className='text-red-600'>*</span>
            </label>
            <input required value={name} onChange={(e) => {setName(e.target.value)}} type='text' className="block rounded-lg w-2/3 max-md:w-full h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            <div className='flex flex-col gap-3 mt-5'>
            <label className='font-semibold'>
                Address<span className='text-red-600'>*</span>
            </label>
            <input required value={address} onChange={(e) => {setAddress(e.target.value)}} type='text' className="block rounded-lg  max-md:w-full w-2/3 h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            </div>
            <div className="h-[.5px] w-full border border-[#EEEEEE] mt-5 "></div>
            <div className='px-12 max-sm:px-2'>

            <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold'>
                    Description<span className='text-red-600'>*</span>
                </label>
                <textarea required value={description} onChange={(e) => {setDescription(e.target.value)}} className='block  max-md:w-full rounded-lg w-2/3 h-[10rem] border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]'></textarea>
            </div>
            <div className='flex flex-col gap-3 mt-5'>
                <p className='font-semibold'>Pictures</p>
            <label>
                Cover Photo<span className='text-red-600'>*</span>
            </label>
            <div className='flex gap-5 items-center '>

                {
                    coverPhoto && <div className='w-[4rem] h-[4rem] relative '>
                        <Image className='object-cover' fill alt='cover photo' src={URL.createObjectURL(coverPhoto)} />
                    </div> 
                }
            <label className="border-2 text-light-text border-[#EEEEEE] w-fit h-fit rounded-[3rem]  px-4 py-2 cursor-pointer">
                Browse
                <input type="file" className="hidden" onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    e.target.files && setCoverPhoto(e.target.files[0])
                }} />
            </label>
            </div>
            <label>
                Additional Pictures
            </label>
            <div className='flex flex-wrap gap-5 items-center '>

                {
                    pictures.map(picture =>{
                        return (
                            <div className='w-[4rem] h-[4rem] relative hover:cursor-pointer' onClick={() =>handlePicturesDelete(picture)}>
                                <div className='bg-red-500 w-full h-full  flex justify-center items-center text-white'>  
                                    <p>
                                    Delete
                                    </p>
                                </div>
                                
                        <Image  className='object-cover hover:hidden' fill alt='cover photo' src={URL.createObjectURL(picture)} />
                    </div>

                        )
                    }) 
                }
            <label className="border-2 text-light-text border-[#EEEEEE] w-fit rounded-[3rem]  px-4 py-2 cursor-pointer">
                {pictures.length != 0 ? "add":'Browse'}
                <input type="file" className="hidden" id="fileInput" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePictureSubmits(e)} />
            </label>
            </div>
            </div>
            </div>
            
            <div className="h-[.5px] w-full border border-[#EEEEEE] mt-5 "></div>
            <div className='px-12 max-sm:px-2'>

            <div className='flex  flex-col gap-3 mt-5'>
            <label className='font-semibold'>
                House component<span className='text-red-600'>*</span>
            </label>
                <div className='flex gap-4 w-2/3 max-sm:flex-col  max-md:w-full'>
                <input required value={numberOfBedrooms} onChange={e =>{ setNumberOfBedrooms(e.target.value)}} type='number' step={1} placeholder='Number of bedrooms' className=' max-sm:w-full pl-4 rounded-lg w-1/3 h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]' />
                <input required value={numberOfBathrooms} onChange={e => setNumberOfBathrooms(e.target.value)} type='number' step={1} placeholder='Number of bathrooms' className=' max-sm:w-full pl-4 rounded-lg w-1/3 h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]' />
                <input required value={propertySize} onChange={e => setPropertySize(e.target.value)} type='number' step={1} placeholder='Property size' className=' max-sm:w-full pl-4 rounded-lg w-1/3 h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]' />
                </div>
            </div>
            <div className='flex  flex-col gap-3 mt-5'>
            <label className='font-semibold'>
                House Type:<span className='text-red-600'>*</span>
            </label>
                    <select 
                    required
                        value={houseType}
                        onChange={e => setHouseType(e.target.value)}
                        className=" w-fit block p-2 border-gray-300 bg-white rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300  border-2 outline-none border-[#EEEEEE]"
                    >
                        <option value="villa">villa</option>
                        <option value="Apartament">Apartament</option>
                        <option value="G+">G+</option>
                        <option value="Condominum">Condominum</option>
                    </select>
                    
            </div>
            <div className='flex  flex-col gap-3 mt-5'>
            <label className='font-semibold'>
                Want To:<span className='text-red-600'>*</span>
            </label>
            <div className='flex gap-10'>
                <div>
                <input onChange={e => setWantTo(e.target.value)} value="sell" className='mr-3' checked = {wantTo === "sell"} type="radio" />
                <label>
                    Sell
                </label>
                </div>
                <div>
                <input  onChange={e => setWantTo(e.target.value)}  checked = {wantTo === "rent"} value="rent" type="radio" className='mr-3' />
                <label>
                    Rent
                </label>
                </div>
            </div>
            </div>

            <div className='flex flex-col gap-3 mt-5'>
            <label className='font-semibold'>
                Price<span className='text-red-600'>*</span>
            </label>
            <input required value={price} onChange={e => setPrice(e.target.value)} type='number' step={1} className="block rounded-lg w-1/6  max-sm:w-1/2 h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            </div>

            <div className="h-[.5px] w-full border border-[#EEEEEE] mt-5 "></div>
            <div className='flex justify-end mt-5 px-12 pb-3  max-sm:px-2'>
                <button type='submit'  className="bg-primary w-fit text-white px-4 py-2 rounded-[3rem] cursor-pointer">Submit</button>
                
            </div>
        </form>
    </div>
  )
}

export default CreateHouseForm