'use client'


import UserContext from '@/context/userContext'
import React, { useContext, useState } from 'react'

const AddCart = ({perproduct, fetchCategories, setSelectedProductId}) => {
    const context = useContext(UserContext)
    
    const [product, setProduct] = useState({
        id:perproduct._id,
        p_name:perproduct.p_name,
        p_unit:perproduct.p_unit,
        p_rate:perproduct.p_rate,
        p_quantity:perproduct.p_quantity,
        belongs:context.user._id
    })
    

    const isQuantityValid = product.p_quantity <= perproduct.p_quantity;

    const submit = async (e) => {
      e.preventDefault();
      try {
          // Calculate the updated product quantity to be sent to the server
          const updatedQuantity = perproduct.p_quantity - product.p_quantity;
          
          // Make a POST request to add the product to the cart
          const addCartResponse = await fetch('/api/cart', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(product),
          });
          await addCartResponse.json();
  
          // Make a PUT request to update the product quantity
          const updateProductResponse = await fetch(`/api/cart/${perproduct._id}`, {
              method: 'PUT',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ p_quantity: updatedQuantity }),
          });
          await updateProductResponse.json();
  
          // Refresh the category list
          fetchCategories();
          setSelectedProductId(null);
      } catch (error) {
          console.log(error);
      }
  };
  

  return (
    <div>
        <form action="" onSubmit={submit}>
            <label className=' text-sm' htmlFor="product_quantity">add quantity:</label>
            <input className=' text-black text-sm rounded-sm mr-1 ml-1 w-8 pl-1' type="number" id='product_quantity' name='product_quantity' onChange={(e)=>{setProduct({...product,p_quantity:e.target.value})}} value={product.p_quantity}/>
            {/* <button className={`text-sm px-1 rounded-sm ${!isQuantityValid ? 'bg-gray-400 text-gray-700' : 'bg-gray-500 hover:bg-gray-700'}`} disabled={!isQuantityValid}>Add</button> */}
            {isQuantityValid && (<button className="text-sm bg-gray-500 px-1 rounded-sm hover:bg-gray-700">Add</button>)}
        </form>
    </div>
  )
}

export default AddCart