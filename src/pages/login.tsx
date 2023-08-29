import React, {useState, ChangeEvent} from 'react'
import { auth } from '../../config/firebase'
import {signInWithEmailAndPassword} from "firebase/auth"
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../store/feature/auth/user';
import { RootState } from "@/store";
import Image from 'next/image';
import {FcGoogle} from "react-icons/fc"
import {SiGithub} from "react-icons/si"

const login = () => {
    const [ userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const user = useSelector((state: RootState) =>state.auth.user )
    const dispatch = useDispatch()
    
    const loginUser = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        setErrorMessage('')
        signInWithEmailAndPassword(auth, userEmail, userPassword).then((response) =>{
            dispatch(setUser(response.user.uid))
            console.log(response.user.uid)
        }).catch((err) =>{
            setErrorMessage('Sorry, we could not find an account with the provided email and password. Please verify your credentials and try again.')
        })
    }

  return (
    <div className='flex bg-gray'>
         <div className='md:w-[50%]   w-full bg-white flex justify-center text-light-text rounded-tr-[3rem]'>
        <div className='max-w-md  flex flex-col'>
            <p className='sm:text-[2.2rem] text-2xl text-dark-text text-center font-bold pt-10'>Join & Connect the Fastest Growing business of all time.</p>
            <div className="mt-5 flex max-sm:flex-col gap-2">
                <button className='border border-[#EEEEEE] px-4 py-3 rounded-[2rem] bg-gray flex justify-center items-center gap-2'> <FcGoogle size = {22}/> sign up with Google</button>
                <button className='border border-[#EEEEEE] px-4 py-3 rounded-[2rem] bg-gray flex justify-center items-center gap-2'><SiGithub/> sign up with Github</button>
            </div>

            <div className='flex items-center justify-between py-9'>
                <div className="h-[.5px] w-[35%] border border-[#EEEEEE] "></div>
                <p className="text-gray-500">or use Email</p>
                <div className="h-[1px] w-[35%] border border-[#EEEEEE] "></div>
            </div>
            {
                errorMessage && 
            <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                <p>{errorMessage}</p>
            </div>
            }
            <form onSubmit={loginUser} className='flex flex-col'>

            <div className='mb-7'>
            <label>Email</label>
            <input required className='block w-full pt-3 border-b outline-none focus:border-b-primary border-[#EEEEEE] '  type='text'  value={userEmail} onChange={(e: ChangeEvent<HTMLInputElement>) =>{setUserEmail(e.target.value)}} />

            </div>
            <div className='mb-7'>
            <label>Password</label>
            <input required className='block w-full pt-3 border-b outline-none focus:border-b-primary border-[#EEEEEE]'  type='text' value={userPassword} onChange={(e: ChangeEvent<HTMLInputElement>) =>{setUserPassword(e.target.value)}} />

            </div>
            
            <div className=' self-end'>
            <button type='submit' className='bg-primary px-10 py-4 text-white uppercase rounded-[2rem] shadow-[0_15px_20px_-15px_rgba(81,57,237,.5)]'>Sign in</button>

            </div>
            </form>
            
            
            <p className="self-center my-4 ">Don't have an Account?<span className='font-bold'>Sign in</span></p>

        </div>
        </div>
        <div className='md:w-[50%] flex justify-center items-center md:h-[90vh] '>

        <div className="relative md:w-[60%] md:h-[60vh] max-md:hidden">
        <Image fill alt='sign in image' src='/img/signin.png' />
        </div>
        </div>
        
    </div>
  )
}
export default login
