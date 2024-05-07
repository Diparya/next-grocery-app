'use client'

import React, { useEffect, useState } from 'react'

const CreateProduct = ({ fetchProducts, setIsVisible }) => {
    const [product, setProduct] = useState({
        p_name:'',
        p_unit:'',
        p_rate:'',
        p_quantity:'',
        image_url:'',
        belongs:''
    })

    const [allcategory, setAllCategory] = useState([]);

  useEffect(() => {
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

    fetchCategories();
  }, []);

    const submit =async (e)=>{
        e.preventDefault()
        try {
          const res = await fetch('/api/product', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product),
        })
    
          await res.json()
    
          setProduct({
            p_name:'',
            p_unit:'',
            p_rate:'',
            p_quantity:'',
            image_url:'',

          })
          
          fetchProducts()
          setIsVisible(false)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div>
        <form action="" onSubmit={submit} className=' space-y-3'>
          <div className='space-y-3 border p-4'>
            <div className='flex justify-evenly'>
                <label className=' font-bold mr-2' htmlFor="product_name">product name:</label>
                <input id='product_name' type='text' className='rounded-sm mr-2 custom-bg' name='product_name' onChange={(e)=>{setProduct({...product,p_name:e.target.value})}} value={product.p_name} required />
            </div>
            <div className='flex justify-evenly'>
                <label className=' font-bold mr-2' htmlFor="product_unit">product unit:</label>
                <input id='product_unit' type='text' className='rounded-sm mr-2 custom-bg' name='product_unit' onChange={(e)=>{setProduct({...product,p_unit:e.target.value})}} value={product.p_unit} required />
            </div>
            <div className='flex justify-evenly'>
                <label className=' font-bold mr-2' htmlFor="product_rate">product rate:</label>
                <input id='product_rate' type='text' className='rounded-sm mr-2 custom-bg' name='product_rate' onChange={(e)=>{setProduct({...product,p_rate:e.target.value})}} value={product.p_rate} required/>
            </div>
            <div className='flex justify-evenly'>
                <label className=' font-bold mr-2' htmlFor="product_quantity">product quantity:</label>
                <input id='product_quantity' type='text' className='rounded-sm mr-2 custom-bg' name='product_quantity' onChange={(e)=>{setProduct({...product,p_quantity:e.target.value})}} value={product.p_quantity} required/>
            </div>
            <div className='flex justify-evenly'>
                <label className=' font-bold mr-2' htmlFor="product_image">product Image:</label>
                <input id='product_image' type='text' className='rounded-sm mr-2 custom-bg' name='product_image' onChange={(e)=>{setProduct({...product,image_url:e.target.value})}} value={product.image_url} required/>
            </div>
          </div>
            <div className='mt-4 w-40'>
                <select name='product_category' onChange={(e)=>{setProduct({...product,belongs:e.target.value})}} value={product.belongs} id="product_category" className='custom-button px-2 py-1'>
                  <option value="" >Select Category</option>
                  {allcategory.map(category => (
                    <option value={category._id}>{category.c_name}</option>
                  ))}
                </select>
          </div>
            <button className='custom-button px-2'>Add</button>
        </form>
    </div>
  )
}

export default CreateProduct