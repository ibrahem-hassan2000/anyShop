import { Carousel } from "@mantine/carousel";
import React, { useEffect, useState } from "react";
import { rem } from "@mantine/core";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import img1 from "../asset/images/img1.jpg";
import img2 from "../asset/images/img2.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/shopSlice";
import { toast } from "react-toastify";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  useEffect(() => {
    const data = () => {
      axios
        .get("https://fakestoreapiserver.reactbd.com/products")
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        });
    };
    data();
  }, []);
  return (
    <div className="home">
      <Carousel
        withIndicators
        height="100%"
        maw={"100%"}
        mx="auto"
        loop="true"
        styles={{
          indicator: {
            width: rem(12),
            height: rem(4),
            transition: "width 250ms ease",
            backgroundColor: "white",
            "&[data-active]": {
              width: rem(40),
            },
          },
        }}
        className="w-[100%] md:h-[600px] sm:h-[400px] h-[250px]"
      >
        <Carousel.Slide>
          <img src={img1} alt="images" />
        </Carousel.Slide>
        <Carousel.Slide>
          <img src={img2} alt="images" />
        </Carousel.Slide>
        <Carousel.Slide>
          <img src={img1} alt="images" />
        </Carousel.Slide>
      </Carousel>
      <div className="grid gap-3 mt-12 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {Data.map((item) => {
          return (
            <div
              
              className="cardProduct"
              key={item._id}
            >
              <div className="boxImg cursor-pointer" onClick={() =>
                navigate(`/product/${item._id}`, {
                  state: {
                    item: item,
                  },
                })
              }>
                <img src={item.image} alt="name" className="headImg" />
                <p className="sall">SALL</p>
              </div>
              <div className="cardBody">
                <h2 className="titleCard"> {item.title}</h2>
                <h3 className="text-gray-500">{item.category}</h3>
                <div className="price">
                  <p className="priceBefore"> {item.oldPrice}</p>
                  <p className="priceAfter">{item.price}</p>
                </div>
                <button className="btnCard" onClick={()=>dispatch(addToCart({
                  _id:item._id,
                  title:item.title,
                  image:item.image,
                  price:item.price,
                  quantity:1,
                  description:item.description  
                }))&toast.success(item.title)}>Add To Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
