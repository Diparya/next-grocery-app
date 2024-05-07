'use client'

import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { login } from '@/services/userService'
import UserContext from '@/context/userContext'
import bg from "../../../public/background/projects-background.png";
import Image from 'next/image'
import RenderModel from '@/components/RenderModel'
import Staff from '@/components/models/Staff'
import Link from 'next/link'

const Login = () => {
    const router = useRouter()
    const context = useContext(UserContext)
    const [data, setData] = useState({
        email: '',
        password: '',
        })

        const doLogin= async (e)=>{
            e.preventDefault()
            if (data.email.trim() === "" || data.email == null) {
                toast.warning("email is required");
                return
            }
    
            try {
                const result = await login(data)
                if (result.user.role === 'manager') {
                    toast.success("manager login",{
                        position: 'top-center'
                    })
                } else if (result.user.role === 'admin') {
                    toast.success("admin login",{
                        position: 'top-center'
                    })
                } else if (result.user.role === 'user') {
                    toast.success("user login",{
                        position: 'top-center'
                    })
                }
                
                context.setUser(result.user)
                
                if (result.user.role === 'manager') {
                    router.push('/managerhome')
                } else if (result.user.role === 'admin') {
                    router.push('/adminhome')
                } else if (result.user.role === 'user') {
                    router.push('/userhome')
                }
                
                
            } catch (error) {
                toast.error(error.response.data.message,{
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
                <h1 className='text-3xl text-center'>Login Here</h1>
                <form action="" className='mt-5' onSubmit={doLogin}>

                    <div className='mt-3'>
                        <label htmlFor="user_email" className='block text-sm font-medium mb-2'>Email</label>
                        <input type="email" placeholder='Enter Email' id='user_email' name='user_email' onChange={(e)=>{setData({...data, email: e.target.value})}} value={data.email} className='w-full p-2.5 rounded-sm custom-bg'/>
                    </div>

                    <div className='mt-3'>
                        <label htmlFor="user_password" className='block text-sm font-medium mb-2'>Password</label>
                        <input type="password" placeholder='Enter Password' id="user_password" name="user_password" onChange={(e)=>{setData({...data, password: e.target.value})}} value={data.password} className='w-full p-2.5 rounded-sm custom-bg'/>
                    </div>

                    <div className='mt-3 text-center'>
                        <button type='submit' className='mr-2 bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-300'>Login</button>
                        <Link href={'/signup'} className='bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-300'>Signup</Link>
                    </div>

                    {/* {JSON.stringify(data)} */}
                </form>

            </div>
        </div>
    </div>
    </>
  )
}

export default Login