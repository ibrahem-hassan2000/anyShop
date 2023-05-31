import React from 'react'
import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { reset } from '../redux/shopSlice'


function Cart() {
  const productData = useSelector(state=>state.shop.productData)

  const TotalPrice = productData.reduce((acc, product) => acc + (product.price*product.quantity), 0);
const dispatch = useDispatch();
  return (
    <>
     {
      productData.length? <div className='flex md:flex-row flex-col cart w-[100%]  md:gap-6 gap-6 items-start' >
      <div  className=' part1 md:w-2/3 w-[100%]  md:pr-6 overflow-auto'>
        <h1 className="text-[20px] font-300 mb-4">Shopping Cart</h1>
        <div className='items flex flex-col gap-5 min-w-[680px] mb-10'>
          {
            productData.map(((item)=>
            
            <>
            <CartItem key={item._id} productData={item}/>

            </>
            ))
          }
      <button className="bg-red-600 w-[70px] mx-10 my-4 h-[40px] rounded-[8px] text-white font-medium hover:bg-red-700 duration-300" onClick={()=>dispatch(reset( ))}>Reset</button>
        </div> 
        
      
      </div>
     
      <div className='md:w-1/3 w-[100%] part2'>
        <h2>Cart Total</h2>
        <ul>
          <li>
            <h3>Subtotal</h3>
            <p className="font-black">${TotalPrice}</p>
          </li>
          <li>
            <h3>Shipping</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            </p>
          </li>
        </ul>
        <p>
          Total<span>${TotalPrice}</span>
        </p>
        <button className='proceed' >Proceed To Checkout</button>
      </div>
    </div> :<Link to={'/'} className="text-center text-[20px] m-auto text-indigo-600 block h-[100%]  font-semibold"> no item choosed -- go home to shopping</Link>
    }
    
  

  

    </>
  )
}


export default Cart