import React from 'react'
import CartItem from '../components/CartItem'

function Cart() {
  return (
    <div className='flex md:flex-row flex-col cart md:gap-6 gap-6' >
      <div  className=' part1 md:w-2/3 w-[100%]  md:pr-6 w-[600px] overflow-auto'>
        <h1 className="text-[20px] font-300 mb-4">Shopping Cart</h1>
        <div className='items flex flex-col gap-5 min-w-[680px]'>
        <CartItem/>
        <CartItem/>
        <CartItem/>
        </div>
      
      </div>
     
      <div className='md:w-1/3 w-[100%] part2'>
        <h2>Cart Total</h2>
        <ul>
          <li>
            <h3>Subtotal</h3>
            <p className="font-black">$200</p>
          </li>
          <li>
            <h3>Shipping</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            </p>
          </li>
        </ul>
        <p>
          Total<span>$250</span>
        </p>
        <button className='proceed'>Proceed To Checkout</button>
      </div>
    </div>
  

  )
}

export default Cart