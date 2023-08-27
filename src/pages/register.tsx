import React , {useState, ChangeEvent} from 'react'
import { db, auth } from '../../config/firebase'
import {createUserWithEmailAndPassword} from "firebase/auth"
import { setDoc, doc } from 'firebase/firestore'
import { useDispatch} from "react-redux";
import { setUser } from '../../store/feature/auth/user';
import { RootState } from "@/store";
const register = () => {
    const [userEmail, setUserEmail] = useState('')
    const [userPhoneNumber, setUserPhoneNumber] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const dispatch = useDispatch()

    const registerUser = async() =>{
        createUserWithEmailAndPassword(auth, userEmail, userPassword).then((res) =>{
            console.log(res.user.uid)
            dispatch(setUser(res.user.uid))
            setDoc(doc(db, "users", res.user.uid),{
                name:userName,
                phoneNumber:userPhoneNumber,
                email:userEmail,
                profilePicture:'',
                userId:res.user.uid
            }).catch((err) =>{
                console.error(err)
            })

        }).catch((err) =>{
            console.error(err)
        })

    }
  return (
    <div>
        <div>
            <label>input user email</label>
            <input className='bg-orange-100'  type='text' value={userEmail} onChange={(e: ChangeEvent<HTMLInputElement>) =>{setUserEmail(e.target.value)}} />
        </div>
        <div>
            <label>input user password</label>
            <input className='bg-orange-100'  type='text' value={userPassword} onChange={(e: ChangeEvent<HTMLInputElement>) =>{setUserPassword(e.target.value)}} />
        </div>
        <div>
            <label>input user name</label>
            <input className='bg-orange-100'  type='text' value={userName} onChange={(e: ChangeEvent<HTMLInputElement>) =>{setUserName(e.target.value)}} />
        </div>
        <div>
            <label>input user phonenumber</label>
            <input className='bg-orange-100'  type='text' value={userPhoneNumber} onChange={(e: ChangeEvent<HTMLInputElement>) =>{setUserPhoneNumber(e.target.value)}} />
        </div>
        <div>
        </div>
        <button onClick= {registerUser}>register</button>
    </div>
  )
}

export default register