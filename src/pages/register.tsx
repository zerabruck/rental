import React , {useState, ChangeEvent} from 'react'
import { db, auth } from '../../config/firebase'
import {createUserWithEmailAndPassword} from "firebase/auth"
import { setDoc, doc } from 'firebase/firestore'
import { useDispatch} from "react-redux";
import { setUser } from '../../store/feature/auth/user';
import Image from 'next/image';
import {FcGoogle} from "react-icons/fc"
import {SiGithub} from "react-icons/si"
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import Loading from '@/components/common/Loading';
const register = () => {
    const [userEmail, setUserEmail] = useState('')
    const [userPhoneNumber, setUserPhoneNumber] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()

    const registerUser = async(event: React.FormEvent<HTMLFormElement>) =>{
        setLoading(true)
        event.preventDefault()
        setErrorMessage('')
        if (confirmPassword === userPassword){

            await createUserWithEmailAndPassword(auth, userEmail, userPassword).then(async(res) =>{
                console.log(res.user.uid)
                dispatch(setUser(res.user.uid))
                await setDoc(doc(db, "users", res.user.uid),{
                    name:userName,
                    phoneNumber:userPhoneNumber,
                    email:userEmail,
                    profilePicture:'',
                    userId:res.user.uid
                }).catch((err) =>{
                    console.error(err)
                })
                router.push('/dashboard')
    
            }).catch((err:firebase.FirebaseError) =>{
                setErrorMessage(err.message.slice(9))
            })
        }else{
            setErrorMessage("Passwords do not match. Please make sure your passwords match.")
        }

    }
  return (
    <div className='flex bg-gray'>
        <div className='md:w-[50%] w-full bg-white flex justify-center text-light-text rounded-tr-[3rem]'>
        <div className='max-w-md  flex flex-col'>
            <p className='sm:text-[2.2rem] text-2xl text-dark-text text-center font-bold pt-10'>Join & Connect the Fastest Growing business of all time.</p>
            <div className="mt-5 flex  max-sm:flex-col gap-2">
                <button className='border border-[#EEEEEE] px-4 py-3 rounded-[2rem] bg-gray flex justify-center items-center gap-2'> <FcGoogle size = {22}/> sign up with Google</button>
                <button className='border border-[#EEEEEE] px-4 py-3 rounded-[2rem] bg-gray flex justify-center items-center gap-2'><SiGithub/> sign up with Github</button>
            </div>

            {
                loading ? <Loading/>:
            <div className='flex items-center justify-between py-9'>
                <div className="h-[.5px] w-[35%] border border-[#EEEEEE] "></div>
                <p className="text-gray-500">or use Email</p>
                <div className="h-[1px] w-[35%] border border-[#EEEEEE] "></div>
            </div>
            }
            {
                errorMessage && 
            <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                <p>{errorMessage}</p>
            </div>
            }
            <form className='flex flex-col' onSubmit={registerUser}>
            <div className='mb-7'>
            <label>Name</label>
            <input className='block w-full pt-3 border-b outline-none focus:border-b-primary border-[#EEEEEE] '  type='text' required  value={userName} onChange={(e: ChangeEvent<HTMLInputElement>) =>{setUserName(e.target.value)}} />

            </div>
            <div className='mb-7'>
            <label>Email</label>
            <input className='block w-full pt-3 border-b outline-none focus:border-b-primary border-[#EEEEEE] '  type='text'  value={userEmail} onChange={(e: ChangeEvent<HTMLInputElement>) =>{setUserEmail(e.target.value)}} />

            </div>
            <div className='mb-7'>
            <label>Password</label>
            <input className='block w-full pt-3 border-b outline-none focus:border-b-primary border-[#EEEEEE]'  type='text' value={userPassword} onChange={(e: ChangeEvent<HTMLInputElement>) =>{setUserPassword(e.target.value)}} />
            </div>
            <div className='mb-7'>
            <label>Confirm Password</label>
            <input className='block w-full pt-3 border-b outline-none focus:border-b-primary border-[#EEEEEE]'  type='text' value={confirmPassword} onChange={(e: ChangeEvent<HTMLInputElement>) =>{setconfirmPassword(e.target.value)}} />
            </div>
            <div className='mb-7'>
            <label>Phone Number</label>
            <input className='block w-full pt-3 border-b outline-none focus:border-b-primary border-[#EEEEEE]'  type='text'  value={userPhoneNumber} onChange={(e: ChangeEvent<HTMLInputElement>) =>{setUserPhoneNumber(e.target.value)}} />

            </div>


            <div className=' self-end'>
            <button type='submit'className='bg-primary px-10 py-4 text-white uppercase rounded-[2rem] shadow-[0_15px_20px_-15px_rgba(81,57,237,.5)]'>Sign up</button>

            </div>

            </form>
            
            
            <p className="self-center my-4 ">Own an Account?<span className='font-bold'>JUMP RIGHT IN</span></p>

        </div>
        </div>
        <div className='md:w-[50%] flex justify-center items-center md:h-[90vh] '>

        <div className="relative md:w-[60%] md:h-[60vh] max-md:hidden">
        <Image fill alt='sign in image' src='/img/signup.png' />
        </div>
        </div>
    </div>
  )
}

export default register