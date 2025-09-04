import React from "react";
import { Facebook, Twitter, Linkedin, Youtube, Mail } from "react-feather";

export default function ContactBox() {
  return (
    <div className="flex md:flex-col items-center gap-5 h-fit py-5 md:w-20 md:shadow-xl/30 bg-white px-5 ">
      <button className="w-10 h-10 flex justify-center items-center bg-[#3E5B98] cursor-pointer hover:opacity-80 rounded-[5px] duration-100">
        <Facebook color="white"></Facebook>
      </button>

      <button className="w-10 h-10 flex justify-center items-center bg-[#4DA7DE] cursor-pointer hover:opacity-80 rounded-[5px] duration-100">
        <Twitter color="white"></Twitter>
      </button>

      <button className="w-10 h-10 flex justify-center items-center bg-[#0077B5] cursor-pointer hover:opacity-80 rounded-[5px] duration-100">
        <Linkedin color="white"></Linkedin>
      </button>

      <button className="w-10 h-10 flex justify-center items-center bg-[#C92619] cursor-pointer hover:opacity-80 rounded-[5px] duration-100">
        <Youtube color="white"></Youtube>
      </button>

      <button className="w-10 h-10 flex justify-center items-center bg-[#95A5A6] cursor-pointer hover:opacity-80 rounded-[5px] duration-100">
        <Mail color="white"></Mail>
      </button>
    </div>
  );
}
