import Image from 'next/image'
import React,{useEffect, useState} from 'react'
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"
import { db, storage } from '@/config/firebase'
import { User } from '@/types/type'
import { setUser } from '../../store/feature/auth/user';
import { RootState } from "@/store";
import { useSelector } from 'react-redux'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"

export const Profile = () => {
    const user = useSelector((state: RootState) =>state.auth.user )
    const [userInformation, setUserInformation] = useState<User | null>(null)
    const [password, setPassword] = useState('')
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
    const [errorMessage,setErrorMessage] = useState('')

    useEffect(() => {
        const fetchData = async () => {
          const q = query(collection(db, 'users'), where('userId', '==', user));
          try {
            const querySnapshot = await getDocs(q);
            const userData= querySnapshot.docs.map((doc) => ({
              ...doc.data(),
            })) as User[];
            setUserInformation(userData[0])
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
        
        }, []);
        const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
            if (userInformation !== null){
                setUserInformation(prev => ({...(prev as User), [event.target.name]:event.target.value}))
            }
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
            
            if (userInformation){
                let imageUrl = ''
            if (profilePhoto){
                imageUrl =  await submitImage(profilePhoto)
                
            }
                setUserInformation((prev) => ({
                    ...(prev as User),
                    profilePicture: imageUrl || prev?.profilePicture || '',
                }));
                const ref = doc(db, 'users', userInformation?.userId)
                await updateDoc(ref,{
                    ...userInformation, profilePicture: imageUrl || userInformation.profilePicture
                }).then(res => {
                    console.log('done')
                }).catch(error => {
                    console.error(error)
                })
            }
        }
        

  return (
    <div className='bg-white max-w-[700px] rounded-xl shadow-md m-auto'>
        <div className=' flex justify-between px-12 py-4 max-sm:px-2'>
        <div className='flex items-center gap-3'>
        <div className='relative flex items-center w-[6rem] h-[6rem] rounded-full border-4 border-light-text border-opacity-30'>

        {
            userInformation?.profilePicture?
            profilePhoto ? 
            <Image alt='profilet picture' className='rounded-full' fill src={URL.createObjectURL(profilePhoto)} />
            :
            <Image alt='profilet picture' className='rounded-full' fill src={userInformation.profilePicture} />
        :<p className='w-fit text-center m-auto '>Upload Image</p>
        }

        </div> 
        <div className=''>
            <p className='font-semibold capitalize text-xl '>{userInformation?.name}</p>
            <p className='text-light-text '>{userInformation?.email}</p>
        </div>
        </div>
            <div className='flex gap-4 justify-end mt-5 px-12 pb-3 items-center  max-sm:px-2'>
            <label className="bg-primary w-fit h-fit text-white px-4 py-2 rounded-[3rem] cursor-pointer">
                Upload
                <input type="file" className="hidden" onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    e.target.files && setProfilePhoto(e.target.files[0])
                }} />
                </label>
                {/* <button type='file'  className="bg-primary w-fit h-fit text-white px-4 py-2 rounded-[3rem] cursor-pointer">Upload</button> */}
                <button type='submit'  className="bg-red-500 w-fit h-fit text-white px-4 py-2 rounded-[3rem] cursor-pointer">Delete</button>
            </div>
        </div>
        <div className="h-[.5px] w-full border border-[#EEEEEE] mt-5 "></div>

        <form onSubmit={submitHandler}>
            <div className='flex flex-col gap-3  px-12 py-4 max-sm:px-2'>
            <label className='font-semibold'>
                Name
            </label>
            <input required value={userInformation?.name} name='name' onChange={changeHandler} type='text' className="block rounded-lg max-md:w-full h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            <div className='flex flex-col gap-3  px-12 py-4 max-sm:px-2'>
            <label className='font-semibold'>
                Phone Number
            </label>
            <input required value={userInformation?.phoneNumber} name='phoneNumber' onChange={changeHandler} type='text' className="block rounded-lg  max-md:w-full h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            <div className="h-[.5px] w-full border border-[#EEEEEE] mt-5 "></div>
            <div className='flex flex-col gap-3  px-12 py-4 max-sm:px-2'>
            <label className='font-semibold'>
                Email
            </label>
            <input required value={userInformation?.email} name='email' onChange={changeHandler} type='text' className="block rounded-lg  max-md:w-full h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            <div className='flex flex-col gap-3  px-12 py-4 max-sm:px-2'>
            <label className='font-semibold'>
                Change Password
            </label>
            <input value = {password} onChange={(e)=>setPassword(e.target.value)} type='text' className="block rounded-lg  max-md:w-full h-10 border-2 outline-none focus:border-[#97bcedee] border-[#EEEEEE]" />
            </div>
            <div className="h-[.5px] w-full border border-[#EEEEEE] mt-5 "></div>
            <div className='flex justify-between mt-5 px-12 pb-3  max-sm:px-2'>
                <button type='submit'  className="bg-primary w-fit text-white px-4 py-2 rounded-[3rem] cursor-pointer">Submit</button>   
            </div>
    
        </form>
    </div>
  )
}
