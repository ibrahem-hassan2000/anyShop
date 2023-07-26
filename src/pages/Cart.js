import React, { useState } from "react";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "../redux/shopSlice";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Cart() {
  const productData = useSelector((state) => state.shop.productData);
  const userInfo = useSelector((state) => state.shop.userInfo);
  const [PayNow, setPayNow] = useState(false);
  const TotalPrice = productData.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const dispatch = useDispatch();

  const handelCheckOut = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      setPayNow(false);

      toast.error("Please Sign in to Checkout");
    }
  };

  return (
    <>
      {productData.length ? (
        <div className="flex md:flex-row flex-col cart w-[100%]  md:gap-6 gap-6 items-start">
          <div className=" part1 md:w-2/3 w-[100%]  md:pr-6 overflow-auto">
            <h1 className="text-[20px] font-300 mb-4">Shopping Cart</h1>
            <div className="items flex flex-col gap-5 min-w-[680px] mb-10">
              {productData.map((item, i) => (
                <CartItem key={i} productData={item} />
              ))}
              <button
                className="bg-red-600 w-[70px] mx-10 my-4 h-[40px] rounded-[8px] text-white font-medium hover:bg-red-700 duration-300"
                onClick={() => dispatch(reset())}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="md:w-1/3 w-[100%] part2">
            <h2>Cart Total</h2>
            <ul>
              <li>
                <h3>Subtotal</h3>
                <p className="font-black">${TotalPrice}</p>
              </li>
              <li>
                <h3>Shipping</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </p>
              </li>
            </ul>
            <p>
              Total<span>${TotalPrice}</span>
            </p>
            <button className="proceed" onClick={handelCheckOut}>
              Proceed To Checkout
            </button>
            {PayNow && (
              <div className="block mx-auto my-6">
                <StripeCheckout
                  stripeKey="pk_test_51NEAT1JMrAAjiKZIDhuqcd0mmSr1fS0pgW745jIVO8qk3sYm6pZ3RRoke7UDjEMA5FnrkUZrDDyDC8uapcnFShK100qpdJF1XR"
                  name="hema shop online"
                  description={`Your Payment Amount is ${TotalPrice}`}
                  label="pay in anyshop"
                  amount={TotalPrice * 100}
                  token={userInfo.token}
                  email={userInfo.email}
                />
              </div>
            )}

            <PayPalScriptProvider
              options={{
                "client-id":
                  "ARbqukCOaSRbY3O6Zggr2tmcTs1n__V-r5q5DpDDTx1sYaSSPOQ0MdMW78Gpy4M6BXoUzbecN7EHgsy5",
              }}
            >
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "20",
                        },
                      },
                    ],
                  });
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      ) : (
        <Link
          to={"/"}
          className="text-center text-[20px] m-auto text-indigo-600 block h-[100%]  font-semibold"
        >
          {" "}
          no item choosed -- go home to shopping
        </Link>
      )}
    </>
  );
}

export default Cart;
