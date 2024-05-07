"use client";

import React, { useState } from 'react'

const CreateCategory = ({ fetchCategories, setIsVisible }) => {
  const [category, setCategory] = useState({
    c_name: ''
  })

  const submit =async (e)=>{
    e.preventDefault()
    try {
      const res = await fetch('/api/category', {
        method: 'POST',
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
      setIsVisible(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
        <form action="" onSubmit={submit}>
            <label htmlFor="category_title" className=' font-bold mr-2'>Category Title:</label>
            <input className='rounded-sm mr-2 custom-bg' type="text" id='category_title' name='category_title' onChange={(e)=>{setCategory({c_name:e.target.value})}} value={category.c_name} />
            <button className='custom-button px-2'>Add</button>
        </form>
    </div>
  )
}

export default CreateCategory