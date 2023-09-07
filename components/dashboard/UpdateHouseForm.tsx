import React,{useState} from 'react'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { storage, db} from '@/config/firebase'
import {doc, updateDoc} from "firebase/firestore"
import Image from 'next/image'
import { House } from '@/types/type'
type SetStateFunction<T> = (prevState: T | ((prevState: T) => T)) => void;

const UpdateHouseForm = ({houseData, setDisplay}:{houseData:House, setDisplay: SetStateFunction<string>}) => {
    const [pictures, setPictures] = useState<File[]>([])
    const [prevPictures, setPrevPictures] = useState<string[]>(houseData.picturesUrl)
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null)
    const [name, setName] = useState(houseData.name)
    const [address, setAddress] = useState(houseData.address)
    const [description, setDescription] = useState(houseData.description)
    const [numberOfBedrooms, setNumberOfBedrooms] = useState(houseData.numberOfBedrooms)
    const [numberOfBathrooms, setNumberOfBathrooms] = useState(houseData.numberOfBathrooms)
    const [propertySize, setPropertySize] = useState(houseData.propertySize)
    const [wantTo, setWantTo] = useState(houseData.wantTo)
    const [houseType, setHouseType] = useState(houseData.houseType)
    const [price, setPrice] = useState(houseData.price)
    const [errorMessage, setErrorMessage] = useState('')
    const [successVisible, setSuccessVisible] = useState(false)

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
    const handlePrevPicturesDelete = (picture:string) =>{
        setPrevPictures(prevpics => prevpics.filter((prevpic) => prevpic !== picture))
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
    const submitHandler = async(id:string,event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        
        setErrorMessage('')
        let imageUrl = ''
        if (coverPhoto !== null){
            imageUrl = await submitImage(coverPhoto)
        }
            const uploadedPicturesUrls = [];
            for (const image of pictures) {
                const url = await submitImage(image);
                if (url !== "") {
                uploadedPicturesUrls.push(url);
                }
            }
            
            
            const docRef = doc(db,"houses",id)
            await updateDoc(docRef,{
                userId:houseData.userId,
                name:name,
                address:address,
                description:description,
                wantTo:wantTo,
                houseType:houseType,
                numberOfBathrooms:numberOfBathrooms,
                numberOfBedrooms:numberOfBedrooms,
                propertySize:propertySize,
                price:price,
                coverPhotoUrl:imageUrl || houseData.coverPhotoUrl,
                picturesUrl: [...prevPictures, ...uploadedPicturesUrls]
            }).then(res =>{
                console.log('done')
                setSuccessVisible(true)
                setPictures([])
                setCoverPhoto(null)
                setName("")
                setAddress("")
                setDescription("")
                setNumberOfBedrooms(0)
                setNumberOfBathrooms(0)
                setPropertySize(0)
                setWantTo("sell")
                setHouseType("villa")
                setPrice(0)
                setDisplay('')
            }).catch(err =>{
                setErrorMessage(err.message)
            })
        
        
    }
  return (
    <div className=' bg-white   rounded-xl shadow-md relative'>
        {
            successVisible && <p className="bg-green-500  text-white p-4 absolute top-0 left-0 right-0">
            Success!
          </p>
        }
        <form onSubmit={(e) => submitHandler(houseData.id,e)}>
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
                    coverPhoto ? <div className='w-[4rem] h-[4rem] relative '>
                        <Image className='object-cover' fill alt='cover photo' src={URL.createObjectURL(coverPhoto)} />
                    </div> : <div className='w-[4rem] h-[4rem] relative '>
                        <Image className='object-cover' fill alt='cover photo' src={houseData.coverPhotoUrl} />
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
                    prevPictures?.map(picture =>{
                        return (
                            <div className='w-[4rem] h-[4rem] relative hover:cursor-pointer' onClick={() =>handlePrevPicturesDelete(picture)}>
                                <div className='bg-red-500 w-full h-full  flex justify-center items-center text-white'>  
                                    <p>
                                    Delete
                                    </p>
                                </div>
                                
                        <Image  className='object-cover hover:hidden' fill alt='cover photo' src={picture} />
                    </div>

                        )
                    }) 
                }

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
                <input required  value={numberOfBedrooms} onChange={e =>{ 
                    if (e.target.value != 'e'){
                        setNumberOfBedrooms(parseInt(e.target.value))
                        
                    }
                    }} type='number' step={1} placeholder={`${houseData.numberOfBedrooms} bedrooms `} className=' max-sm:w-full pl-4 rounded-lg w-1/3 h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]' />
                <input required value={numberOfBathrooms} onChange={e =>{ 
                    if (e.target.value != 'e'){
                        setNumberOfBathrooms(parseInt(e.target.value))
                        
                    }
                    }}  type='number' step={1} placeholder={`${houseData.numberOfBathrooms} bathrooms `} className=' max-sm:w-full pl-4 rounded-lg w-1/3 h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]' />
                <input required value={propertySize} onChange={e =>{ 
                    if (e.target.value != 'e'){
                        setPropertySize(parseInt(e.target.value))
                        
                    }
                    }}  type='number' step={1} placeholder={`${houseData.propertySize} sqft `} className=' max-sm:w-full pl-4 rounded-lg w-1/3 h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]' />
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
            <input placeholder={`${houseData.price}`} required value={price} onChange={e =>{ 
                    if (e.target.value != 'e'){
                        setPrice(parseInt(e.target.value))
                        
                    }
                    }} type='number' step={1} className="block rounded-lg w-1/6  max-sm:w-1/2 h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            </div>

            <div className="h-[.5px] w-full border border-[#EEEEEE] mt-5 "></div>
            <div className='flex justify-between mt-5 px-12 pb-3  max-sm:px-2'>
                <button type='submit'  className="bg-primary w-fit text-white px-4 py-2 rounded-[3rem] cursor-pointer">Submit</button>
                <button onClick={() => setDisplay('')}  className="bg-red-600 w-fit text-white px-4 py-2 rounded-[3rem] cursor-pointer">cancel</button>
                
            </div>
        </form>
    </div>
  )
}

export default  UpdateHouseForm