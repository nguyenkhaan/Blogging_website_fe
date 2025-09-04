//@ts-nocheck
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ContactBox from "../Component/InnerBlog/ContactBox";
import SideBar from "../Component/InnerBlog/SideBar";
import MailBox from "../Component/InnerBlog/MailBox";
import { textToHTML } from "../Helper/textToHTML";
import { getURLQuery } from "../Service/getURLQuery";
import { getBlogInfo } from "../Service/getBlogInfo";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { UseDispatch } from "react-redux";
import blogSlice from "../Redux/slices/blogSlice";
export default function InnerBlog() {
  const dispatch = useDispatch();
  const [blogInfo, setBlogInfo] = useState({
    title: "",
    content: "",
    blogID: "",
    banner: "",
  });
  const location = useLocation();
  const blogID = getURLQuery(location).get("id");
  const blogElement = useSelector((state: RootState) => {
    const blogLists = state.blogInfo; //Phai la blogInfo thi moi load duoc ra tu ngan hang du lieu
    if (!blogLists) return null;
    return blogLists.find((blog) => blog.blogID === blogID) || null;
  });

  useEffect(() => {
    if (blogElement && false) {
      setBlogInfo(blogElement); //Khong cho doc du lieu tu redux store nua
    } else {
      getBlogInfo(blogID).then((data) => {
        const blogData = {
          banner: data.data.blogInfo.banner as string,
          content: data.data.blogInfo.content as string,
          blogID: blogID,
          title: data.data.blogInfo.title,
        };

        setBlogInfo(blogData);
        // dispatch(blogSlice.actions.addblog(blogData));  //Luu du lieu vao redux store => Khong cho luu nua
      });
    }
  }, [blogElement, blogID, dispatch]);
  return (
    <div className="w-full bg-[#F2F5F8] ">
      <main className="w-full grid grid-cols-16 items-start">
        <figure className="flex justify-center items-center overflow-hidden max-h-70 col-span-16 relative">
          <img
            src={blogInfo.banner}
            alt="banner-pic"
            className="w-full object-contain"
          />
          <h2 className="absolute text-white font-[700] text-[30px] text-center bottom-[10%]">
            {blogInfo.title}
          </h2>
        </figure>

        <section className="col-span-2 justify-center pt-20 hidden md:flex">
          <ContactBox></ContactBox>
        </section>

        <section className="w-full h-auto col-span-16 md:col-span-9 bg-white p-10 md:shadow-xl/30">
          <article className="w-full flex flex-col gap-4 ">
            {textToHTML(blogInfo.content)}
          </article>
        </section>

        <section className="col-span-16 md:col-span-5 flex flex-col items-center pt-20 gap-5 md:gap-20">
          <SideBar></SideBar>
          <MailBox></MailBox>
        </section>

        <section className="col-span-16 h-200 mt-10 justify-center flex md:hidden">
          <ContactBox></ContactBox>
        </section>
      </main>
    </div>
  );
}
