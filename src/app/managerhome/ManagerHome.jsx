"use client"

import CreateCategory from '@/components/CreateCategory';
import NavBar from '@/components/NavBar';
import UpdateCategory from '@/components/UpdateCategory';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import bg from "../../../public/background/home-background.png";
import { toast } from 'react-toastify';

const ManagerHome = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleUpdateClick = (categoryId) => {
      setSelectedCategoryId(selectedCategoryId === categoryId ? null : categoryId);
  };

    const [allcategory, setAllCategory] = useState([]);

    const fetchCategories = async () => {
      try {
          const res = await fetch('/api/category');
          const data = await res.json();
          if (res.ok) {
              setAllCategory(data);
          }
      } catch (error) {
          console.error('Error fetching categories:', error);
      }
  };

  useEffect(() => {
      fetchCategories();
  }, []);

  useEffect(() => {
    // Filter categories based on search term
    const filtered = allcategory.filter(category =>
        category.c_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [search, allcategory]);

  const deleteCat=async (cId)=>{
    const res = await fetch(`/api/category/${cId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("delete requested",{
        position: 'top-center'
    })
      fetchCategories();
    }
  }

  return (
    <div className='relative m-4'>
      <Image src={bg} alt="background-image" className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-25"/>

      <NavBar setSearchM={setSearch}/>
        <div className=' mt-5 mb-3'>
            <h1 className="text-2xl font-bold">Categories list</h1>

        </div>
        
        <div className='m-2 border border-accent/30 border-solid p-6 space-y-2'>
      
          <div className='flex justify-between items-center font-bold'>
            <p>Category Name</p>
            <p>Actions</p>
          </div>
        <div className='space-y-4'>
          {filteredCategories.map(category => (
            <div key={category._id} className='flex justify-between items-center'>
              <p className=' font-semibold'>{category.c_name}</p>
              {selectedCategoryId === category._id && (
            <UpdateCategory categorypro={category} fetchCategories={fetchCategories} setSelectedCategoryId={setSelectedCategoryId}/>
              )}
              <div className='flex justify-between'>
                <button onClick={() => handleUpdateClick(category._id)} className='mr-2 bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-2 rounded-lg transition-all duration-300'>Update</button>
                <button type='button' onClick={()=>deleteCat(category._id)} className=' bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-2 rounded-lg transition-all duration-300'>Delete</button>
              </div>
            </div>
          ))}
        </div>
        </div>
        <button onClick={handleClick} className='mt-2 mb-4 bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-300'>+Add Category</button>
        {isVisible && (
            <CreateCategory fetchCategories={fetchCategories} setIsVisible={setIsVisible}/>
        )}
    </div>
  )
}

export default ManagerHome