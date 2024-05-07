'use client'

import CreateProduct from '@/components/CreateProduct';
import NavBar from '@/components/NavBar';
import UpdateProduct from '@/components/UpdateProduct';
import Image from 'next/image';
import bg from "../../../public/background/home-background.png";

import React, { useEffect, useState } from 'react'

const ProductHome = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleUpdateClick = (productId) => {
      setSelectedProductId(selectedProductId === productId ? null : productId);
  };

    const [allproduct, setAllProduct] = useState([]);

  
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product');
        const data = await res.json();
        if (res.ok) {
          setAllProduct(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter categories based on search term
    const filtered = allproduct.filter(product =>
        product.p_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, allproduct]);

  const deletepro=async (pId)=>{
    const res = await fetch(`/api/product/${pId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      alert("requested")
      fetchProducts();
    }
  }


  return (
    <div className='relative m-4'>
      <Image src={bg} alt="background-image" className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-25"/>

      <NavBar setSearchM={setSearch}/>
        <div className=' mt-5 mb-3'>
            <h1 className="text-2xl font-bold">Products list</h1>
            
        </div>

        <div className='m-2 border border-accent/30 border-solid p-6 space-y-2'>
            <div className='flex justify-between items-center font-bold'>
                <p>Product Name</p>
                <p>Product Unit</p>
                <p>product rate</p>
                <p>product quantity</p>
                <p>Actions</p>
            </div>
            <div className='space-y-4'>
            {filteredProducts.map(product => (
            <div key={product._id} className='flex justify-between items-center'>
              <p className=' font-semibold'>{product.p_name}</p>
              <p className=' font-semibold'>{product.p_unit}</p>
              <p className=' font-semibold'>{product.p_rate}</p>
              <p className=' font-semibold'>{product.p_quantity}</p>
              {selectedProductId === product._id && (
            <UpdateProduct productpro={product} fetchProducts={fetchProducts} setSelectedProductId={setSelectedProductId}/>
              )}
              <div className='flex justify-between'>
                <button onClick={() => handleUpdateClick(product._id)} className='mr-2 bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-2 rounded-lg transition-all duration-300'>Update</button>
                <button type='button' onClick={() => deletepro(product._id)} className=' bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-2 rounded-lg transition-all duration-300'>Delete</button>
              </div>
            </div>
          ))}
            </div>
        </div>
        <button onClick={handleClick} className=' mt-2 mb-4 bg-yellow-400/20 border border-yellow-500/30 border-solid backdrop-blur-[6px] shadow-lg hover:shadow-xl hover:bg-yellow-400/30 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-300'>+Add Product</button>
        {isVisible && (
            <CreateProduct fetchProducts={fetchProducts} setIsVisible={setIsVisible}/>
        )}
    </div>
  )
}

export default ProductHome