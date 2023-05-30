import { Button } from '@mantine/core';
import React, { useState } from 'react'
import { TiDeleteOutline } from 'react-icons/ti';
import img1 from "../asset/images/img1.jpg";

function CartItem() {
    const [Count,setCount] = useState(1)
  return (
    <div className="flex gap-2 items-center ">
        <TiDeleteOutline size="24px" className="text-gray-600 hover:text-red-500 duration-300"/>
       <div className="flex gap-1 justify-between flex-1 items-center">
       <img src={img1} className='w-[100px]' alt='asd'/>
        <h2 className="w-[200px] break-words">name</h2>
        <h3>$50</h3>
        
    
    <div className='count'>
<h3>Quantity</h3>
      <div className='btnCount'>
      <Button onClick={()=>{setCount(Count+1)}}>
     +
    </Button>
    <p className='num'>{Count}</p>
    <Button onClick={()=>{Count&&setCount(Count-1)}}>
     -
    </Button>
      </div>
    </div>
  
  <p>totla ${Count*50}</p>
       </div>
    </div>
  )
}

export default CartItem