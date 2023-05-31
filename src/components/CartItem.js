import { Button } from '@mantine/core';
import React, { useState } from 'react'
import { TiDeleteOutline } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { decreamentQuantity, deleteProduct, increamentQuantity } from '../redux/shopSlice';
import { toast } from 'react-toastify';



function CartItem({productData}) {
  const dispatch = useDispatch();
  console.log(productData);
    const [Count,setCount] = useState(1)
  return (
    <div className="flex gap-2 items-center ">
        <TiDeleteOutline size="24px" className="text-gray-600 hover:text-red-500 duration-300" onClick={()=>dispatch(deleteProduct(productData._id))& toast.error(` ${productData.title} is removed`)}/>
       <div className="flex gap-1 justify-between flex-1 items-center">
       <img src={productData.image} className='w-[110px] h-[110px] object-cover object-top ' alt={productData.title}/>
        <h2 className="w-[200px] break-words">{productData.title}</h2>
        <h3>{productData.price}</h3>
        
    
    <div className='count'>
<h3>Quantity</h3>
      <div className='btnCount'>
      <Button onClick={()=>dispatch(increamentQuantity(productData._id))}>
     +
    </Button>
    <p className='num'>{productData.quantity}</p>
    <Button onClick={()=>dispatch(decreamentQuantity(productData._id))}>
     -
    </Button>
      </div>
    </div>
  
  <p>totla ${productData.quantity*productData.price}</p>
       </div>
    </div>
  )
}

export default CartItem