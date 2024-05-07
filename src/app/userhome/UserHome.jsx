'use client'

import AddCart from '@/components/AddCart';
import NavBar from '@/components/NavBar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import bg from "../../../public/background/about-background.png";

const UserHome = () => {
    const [allcategory, setAllCategory] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [search, setSearch] = useState('');

    const handleUpdateClick = (productId) => {
        setSelectedProductId(selectedProductId === productId ? null : productId);
    };

    const fetchCategories = async () => {
      try {
          const res = await fetch('/api/categories-with-products');
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

    const approvedCategories = allcategory.filter(category => category.is_approved);

    const filteredCategories = approvedCategories.filter(category => {
        // Filter categories based on category name
        const categoryNameMatch = category.c_name.toLowerCase().includes(search.toLowerCase());
        // Filter products within each category based on product name
        const filteredProducts = category.products.filter(product => product.p_name.toLowerCase().includes(search.toLowerCase()));
        return categoryNameMatch || filteredProducts.length > 0;
    });

  return (
    <div>
      <Image src={bg} alt="background-image" className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-25"/>

        <NavBar setSearchM={setSearch} className="fixed top-0 left-0 right-0 z-10"/>
        <div className='m-3'>
            {filteredCategories.map(category => (
                <div key={category._id}>
                    <h2 className='text-xl font-bold capitalize'>{category.c_name}</h2>
                    <ul className='flex'>
                        {category.products.map(product => (
                            <li className='border p-4 m-2 custom-bg' key={product._id}>
                                <p className='mb-2 text-base font-semibold text-green-300 capitalize'>{product.p_name}</p>
                                <div className="w-40 h-40 border shadow-white shadow-md mb-3">
                                <Image className=" w-full h-full shadow-lg" 
                                    src={product.image_url} 
                                    alt={product.p_name} 
                                    width={200} 
                                    height={200}
                                     
                                />
                                </div>
                                <p className=' text-sm'>Product Quantity: {product.p_quantity === 0 ? 'Out of Stock' : product.p_quantity+' '+product.p_unit}</p>
                                <p className='text-sm mb-1'>₹ {product.p_rate}</p>
                                <button className=' bg-green-900 p-1 text-sm rounded-md hover:bg-green-700' onClick={() => handleUpdateClick(product._id)}>Add</button>
                                {selectedProductId === product._id && (
                                <AddCart perproduct={product} fetchCategories={fetchCategories} setSelectedProductId={setSelectedProductId}/>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            </div>
        </div>
  )
}

export default UserHome