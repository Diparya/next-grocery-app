'use client'

import RenderModel from '@/components/RenderModel'
import Staff from '@/components/models/Staff'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import bg from "../../../public/background/projects-background.png";
import Link from 'next/link'

const SignUp = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    })

    const doSignup= async (e)=>{
        e.preventDefault()
        if (data.name.trim() === "" || data.name == null) {
            toast.warning("Name is required");
            return
        }

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })
        
              await res.json()
              toast.success("Registered",{
                position: 'top-center'
            })
            setData({
                name: '',
                email: '',
                password: '',
                role: ''
            })

        } catch (error) {
            toast.error("signup error" + error.response.data.message,{
                position: 'top-center',
            })
        }
    }

    
  return (
    <>
    <Image src={bg} alt="background-image" className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-25"/>
    <div className="flex items-center justify-center fixed top-20 left-0 h-screen">
      <RenderModel>
          <Staff/>
      </RenderModel>
    </div>
    <div className='grid grid-cols-12'>
        <div className='col-span-4 col-start-5'>
            <div className='py-5'>
                <h1 className='text-3xl text-center'>SignUp Here</h1>
                <form action="" className='mt-5' onSubmit={doSignup}>
                    <div className='mt-3'>
                        <label htmlFor="user_name" className='block text-sm font-medium mb-2'>Username</label>
                        <input type="text" placeholder='Enter username' name="user_name" onChange={(e)=>{setData({...data, name: e.target.value})}} value={data.name} className='w-full p-2.5 rounded-sm custom-bg'/>
                    </div>

                    <div className='mt-3'>
                        <label htmlFor="user_email" className='block text-sm font-medium mb-2'>Email</label>
                        <input type="email" placeholder='Enter Email' id='user_email' name='user_email' onChange={(e)=>{setData({...data, email: e.target.value})}} value={data.email} className='w-full p-2.5 rounded-sm custom-bg'/>
                    </div>

                    <div className='mt-3'>
                        <label htmlFor="user_password" className='block text-sm font-medium mb-2'>Password</label>
                        <input type="password" placeholder='Enter Password' id="user_password" name="user_password" onChange={(e)=>{setData({...data, password: e.target.value})}} value={data.password} className='w-full p-2.5 rounded-sm custom-bg'/>
                    </div>

                    <div className='mt-4 w-40'>
                        <select name='role' onChange={(e)=>{setData({...data,role:e.target.value})}} value={data.role} id="role" className='custom-button px-2 py-1'>
                            <option value="" >Select Role</option>
                            <option value='user'>user</option>
                            <option value='manager'>manager</option>
                            
                        </select>
                    </div>

                    <div className='mt-3 text-center'>
                        <button type='submit' className='mr-2 bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-300'>SignUp</button>
                        <Link href={'/login'} className="bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-300">Login</Link>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default SignUp