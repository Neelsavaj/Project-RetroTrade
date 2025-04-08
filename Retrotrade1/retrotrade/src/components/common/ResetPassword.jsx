import axios from 'axios'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const ResetPassword = () => {
    const navigate = useNavigate();
    const token = useParams().token 
    const {register,handleSubmit} = useForm()
    const submitHandler = async(data)=>{

        const obj = {
            token:token,
            password:data.password
        }
        const res = await axios.post("/user/resetpassword",obj)
        console.log(res.data)         
        navigate('/login')
    }
  return (
    <div>
        <h1>RESET PASSWOERD COMPONENT</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label>NEW PASSWORD</label>
                <input type='text' {...register("password")}></input>
            </div>
            <div>
                <input type='submit'></input>
            </div>
        </form>
    </div>  
  )
}