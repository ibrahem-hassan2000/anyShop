import React, { useState } from "react";
import { Link } from "react-router-dom";
import shop from "../asset/images/shop.svg";
import { Avatar } from "@mantine/core";
import img1 from "../asset/images/avatar.png";
import { useSelector } from "react-redux";

function HeaderNav() {
  const productData = useSelector((state) => state.shop.productData);
  const userInfo = useSelector((state) => state.shop.userInfo);

  let Links = [
    { name: "HOME", link: "/" },
    { name: "CART", link: "/cart" },
    { name: "ABOUT", link: "/about" },
    { name: "BLOG'S", link: "/blogs" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <>
      <div className="  shadow-md w-full fixed top-0 left-0 border-b-2 border-b-indigo-600 z-[100]">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7 ">
          <Link
            to="/"
            className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
    text-gray-800"
          >
            <span className="text-3xl text-indigo-600 mr-1 pt-2">
              <ion-icon name="briefcase-outline"></ion-icon>
            </span>
            AnyShop
          </Link>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>
          <Link to="/cart" className=" right-[76px] md:right-[20px] shopIcon ">
            <img src={shop} alt="shop" />
            <p>{productData.length ? productData.length : 0}</p>
          </Link>
          <Link
            to="/SignUp"
            className=" right-[110px] md:right-[50px] shopIcon "
          >
            {" "}
            <Avatar
              radius="xl"
              className="block m-auto"
              src={userInfo ? userInfo.image : img1}
            />{" "}
            {userInfo && (
              <h3 className="text-[8px] font-bold text-center">
                {userInfo.name}
              </h3>
            )}{" "}
          </Link>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px] px-16"
            }`}
          >
            {Links.map((link) => (
              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                <Link
                  to={link.link}
                  className="text-gray-800 hover:text-indigo-600 duration-500"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default HeaderNav;
