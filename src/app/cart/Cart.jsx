"use client"

import React, { useContext, useEffect, useState } from 'react'
import UserContext from '@/context/userContext'
import bg from "../../../public/background/contact-background.png";
import Image from 'next/image';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cart, setCart] = useState([])
  const [proid, setProid] = useState([])
  const [total, setTotal] = useState(0);
  const context = useContext(UserContext)
    async function loadTasks(userId){
        try {
            const res = await fetch(`/api/cart/${userId}`);
            const data = await res.json();
            if (res.ok) {
              setCart(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(context.user){
        loadTasks(context.user._id)
        }
    }, [context.user])


    useEffect(() => {
      // Calculate total cost when cart changes
      let sum = 0;
      cart.forEach(product => {
        sum += product.p_quantity * product.p_rate;
      });
      setTotal(sum);
    }, [cart]);


    const remove=async (pId)=>{

      const product = cart.find(product => product.id === pId);
      
      const pro = await fetch(`/api/product/${pId}`);
      const prodata = await pro.json();
    
      const newQuantity = product.p_quantity + prodata.product.p_quantity;
      

      const updateProductResponse = await fetch(`/api/cart/${pId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ p_quantity: newQuantity }),
    });
    await updateProductResponse.json();



      const res = await fetch(`/api/cart/${pId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      if (res.ok) {
        toast.success("removed",{
          position: 'top-center'
      })
        loadTasks(context.user._id);
      }
    }
  return (
    <div>
      <Image src={bg} alt="background-image" className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-25"/>
      <Link href={"/userhome"} target={'_self'} className='text-foreground rounded-full flex items-center justify-center custom-bg fixed top-4 left-4 w-fit self-start' aria-label={"Home"} name={"Home"}>
            <span className='relative w-14 h-14 p-4 hover:text-accent'>
                <Home className='w-full h-auto' strokeWidth={1.5}/>
                
                <span className='peer bg-transparent absolute top-0 left-0 w-full h-full'/>


                <span className=' absolute hidden peer-hover:block px-2 py-1 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap'>
                Home
                </span>
            </span>
            
      </Link>
      <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex space-x-4 mb-4'>
      {cart.map(product => (
        <div key={product._id} className='custom-bg w-auto flex flex-col justify-center items-center p-3'>
          <p className='capitalize'>{product.p_name}</p>
          <p>Quantity: {product.p_quantity}</p>
          <p>Rate: {product.p_rate}</p>
          <button className='bg-green-900 rounded-lg p-1 mt-2' onClick={() => remove(product.id)}>Remove</button>
        </div>
      ))}
      </div>
      <h2 className=' font-bold'>Total Cost: ${total}</h2>
      </div>
    </div>
  )
}

export default Cart