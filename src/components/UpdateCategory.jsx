"use client";

import React, { useState } from 'react'

const UpdateCategory = ({categorypro, fetchCategories, setSelectedCategoryId}) => {
    const [category, setCategory] = useState({
        c_name: categorypro.c_name
      })
    
      const submit =async (e)=>{
        e.preventDefault()
        try {
          const res = await fetch(`/api/category/${categorypro._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category),
        })
    
          await res.json()
    
          setCategory({
            c_name:''
          })
    
          fetchCategories();
          setSelectedCategoryId(null)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div>
        <form action="" onSubmit={submit}>
            <label htmlFor="category_title" className=' font-bold mr-2'>Category Title:</label>
            <input className=' rounded-sm mr-2 custom-bg' type="text" id='category_title' name='category_title' onChange={(e)=>{setCategory({c_name:e.target.value})}} value={category.c_name} />
            <button className='custom-button px-2'>Update</button>
        </form>
    </div>
  )
}

export default UpdateCategory