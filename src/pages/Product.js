import { Button, Group, Rating } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToCart } from "../redux/shopSlice";
import {  toast } from "react-toastify";

function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [BaseCount, setBaseCount] = useState(1);
  const item = location.state.item;

  return (
    <div className="  product flex flex-col md:flex-row gap-x-9 gap-y-2 ">
      <div className="part1 ">
        <img
          className="h-[350px] md:h-[590px]"
          src={item.image}
          alt={item.title}
        />
      </div>
      <div className="part2">
        <h1 className="text-[26px] md:text-[32px]">{item.title}</h1>
        <div className="price">
          <p className="priceBefore md:!text-[28px] !text-[22px] font-light">
            {" "}
            {item.oldPrice}
          </p>
          <p className="priceAfter md:!text-[36px] !text-[28px]">
            {item.price}
          </p>
        </div>
        <div className="  stars flex gap-2 items-center  ">
          <Group position="center">
            <Rating value={item.rating} color="black" size="16px" readOnly />
          </Group>
          <p>({item._id} review)</p>
        </div>
        <p className="dec">{item.description}</p>
        <div className="counter">
          <div className="count">
            <h3>Quantity</h3>
            <div className="btnCount">
              <Button
                onClick={() => {
                  setBaseCount(BaseCount + 1);
                }}
              >
                +
              </Button>
              <p className="num">{BaseCount}</p>
              <Button
                onClick={() => {
                  BaseCount && setBaseCount(BaseCount - 1);
                }}
              >
                -
              </Button>
            </div>
          </div>
          <button
            className="addTo"
            onClick={() =>
              dispatch(
                addToCart({
                  _id: item._id,
                  title: item.title,
                  image: item.image,
                  price: item.price,
                  quantity: BaseCount,
                  description: item.description,
                })
              ) & toast.success(item.title)
            }
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
