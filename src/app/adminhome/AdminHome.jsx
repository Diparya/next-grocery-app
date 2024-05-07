"use client"

import RenderModel from '@/components/RenderModel';
import HatModel from '@/components/models/HatModel';
import React, { useEffect, useState } from 'react'
import bg from "../../../public/background/projects-background.png";
import Image from 'next/image';
import HomeBtn from '@/components/HomeBtn';
import { toast } from 'react-toastify';

const AdminHome = () => {
    const [allcategory, setAllCategory] = useState([]);

    const fetchCategories = async () => {
      try {
          const res = await fetch('/api/category');
          const data = await res.json();
          if (res.ok) {
              setAllCategory(data);
          }
      } catch (error) {
          console.error('Error fetching allcategory:', error);
      }
  };

    useEffect(() => {
        fetchCategories();
    }, []);

    const deleteCat=async (cId)=>{
      const res = await fetch(`/api/category/${cId}/admin`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      if (res.ok) {
        toast.warning("Deleted",{
          position: 'top-center'
      })
        fetchCategories();
      }
    }

    const updateapprove=async (cId)=>{
      const updateCategoryResponse = await fetch(`/api/category/${cId}/admin`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
    });
    await updateCategoryResponse.json();
    toast.success("Approved",{
      position: 'top-center'
  })
    fetchCategories();
    }


  return (
    <div>
      <Image src={bg} alt="background-image" className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-25"/>   
      <div className='flex flex-col justify-center items-center'>
      <div className="w-full h-screen absolute top-1/2 -translate-y-1/2 left-0">
        <HomeBtn/>
        <RenderModel>
            <HatModel/>
        </RenderModel>
      </div>
      <div className='relative top-80 space-y-2 mt-4 border p-3 border-yellow-500/30'>
      {allcategory.map(category => (
        <div key={category._id} className="">
          <div className='flex space-x-2'>
          <p className='capitalize w-20 font-bold'>{category.c_name}</p>
            {!category.is_approved && (
              <button onClick={() => updateapprove(category._id)} className='bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-2 py-1 rounded-lg transition-all duration-300'>Approve</button>
            )}
            {category.is_delete && (
              <button onClick={() => deleteCat(category._id)} className='bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-2 py-1 rounded-lg transition-all duration-300'>Delete</button>
            )}
          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  )
}

export default AdminHome