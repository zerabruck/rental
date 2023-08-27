import React, {useState, ChangeEvent} from 'react'
import { auth } from '../../config/firebase'
import {signInWithEmailAndPassword} from "firebase/auth"
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../store/feature/auth/user';
import { RootState } from "@/store";

const login = () => {
    const [ userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const user = useSelector((state: RootState) =>state.auth.user )
    const dispatch = useDispatch()
    
    const loginUser = () =>{
        signInWithEmailAndPassword(auth, userEmail, userPassword).then((response) =>{
            dispatch(setUser(response.user.uid))
        }).catch(err =>{
            console.log(err)
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
        <button onClick= {loginUser}>register</button>
        {
            user
        }

    </div>
  )
}
export default login
