import {  Button, Group, Rating } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Product() {
  const location = useLocation();
  const [Count,setCount] = useState(1)
  useEffect(()=>{
    console.log(location.state.item)
  },[])
  return (
    <div className='  product flex flex-col md:flex-row gap-x-9 gap-y-2 '>
   <div className='part1 '>
    <img className='h-[350px] md:h-[590px]' src={location.state.item.image} alt={location.state.item.title}/>
   </div>
   <div className='part2'>
    <h1 className="text-[26px] md:text-[32px]">{location.state.item.title}</h1>
    <div className='price'>
    <p className='priceBefore md:!text-[28px] !text-[22px] font-light'> {location.state.item.oldPrice}</p>
    <p className='priceAfter md:!text-[36px] !text-[28px]'>{location.state.item.price}</p>
  </div>
  <div className="  stars flex gap-2 items-center  ">
  <Group position="center">
      <Rating value={location.state.item.rating} color='black' size='16px' readOnly />
    </Group>
    <p>({location.state.item._id} review)</p>
  </div>
  <p className='dec'>
  {location.state.item.description}
  </p>
  <div className='counter'>
    
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
<button className='addTo'>add to cart</button>
  </div>
   </div>
    </div>
  )
}

export default Product