//https://stackoverflow.com/questions/23210587/how-to-configure-a-replica-set-with-mongodb
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import TextEditorBox from "./TextEditorBox";
import { sendBlog } from "../../Feature/sendBlog";
import { onSuccess , onError } from "../../Service/callingToast";
import { activityRecord } from "../../Service/activityRecorded";
import { stampFromCurrentYear } from "../../Helper/stampFromCurrentYeat";
import { getURLQuery } from "../../Service/getURLQuery";
import { getBlogInfo } from "../../Service/getBlogInfo";
import { updateBlog } from "../../Feature/updateBlog";
export default function BlogEditBoard() {
    const [bannerPreview, setBannerPreview] = useState(null); //Tien hanh set lai banner Preview neu nhu no la edit 
    const [editorContent, setEditorContent] = useState("");
    const [titleChange , setTitleChange] = useState('') 
    const [editorRef, setEditorRef] = useState(null);
    const location = useLocation();
    const [isEdit , setIsEdit] = useState(false) 
    // Cleanup function
    useEffect(() => {
        return () => {
            if (bannerPreview) {
                URL.revokeObjectURL(bannerPreview);
            }
        };
    }, [bannerPreview]);

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            banner: null,
            title: "",
            content: "",
        },
    });
    const blogID = getURLQuery(location).get('blogID') //id cua bai viet -> lay tu truoc 
    useEffect(() => {
        if (blogID) setIsEdit(true)   //Neu nhu ton tai query blogID thi tien hanh xet du lieu lai thanh true 
    } , [])
    async function onSubmit(data) {
        const finalContent =
            editorRef && editorRef.getHTML
                ? editorRef.getHTML()
                : editorContent || "<p>No content</p>";

        const submissionData = {
            ...data,
            content: finalContent,
        };
        const id = new URLSearchParams(location.search).get("id");
        // console.log('Submitting blog post:', submissionData);  //Du lieu nhan duoc chinh la submissionData
        let res = undefined 
        console.log(submissionData) 
        if (isEdit == false) res = await sendBlog(submissionData, id); //Gui du lieu ve server
        else res = await updateBlog(submissionData , blogID) 
        // else -> Goi ham de tien hanh update blog, tham so dau vao la submissionData, blogID , thay vi userID (id)
        if (res.data.code < 0)
            onError("Lỗi đăng bài - Vui lòng thử lại sau")
        else {
            //goi toast de bao hieu dang bai thanh cong 
            const mess = (isEdit? 'Cập nhật thông tin thành công' : 'Đăng bài thành công')
            onSuccess(mess) //Goi toast thanh cong 
            //Ghi nhan hoat dong hom nay 
            if (!isEdit) await activityRecord(id , stampFromCurrentYear(Date.now())) //Truyen userID va Date.now() vao. Chi ghi nhan khi dang bai, khong ghi nhan khi sua chua 
            // console.log('>>> Check time stamp: ' , stampFromCurrentYear(Date.now())) 
            // console.log('Dang bai ket qua: ' , res) In ra ket qua dang bai 
        }
    }
    useEffect(() => {
        if (isEdit) {
            const res = getBlogInfo(blogID).then((data) => {
                const {title , banner , content} = data.data.blogInfo 
                setBannerPreview(banner) //Dat du lieu banner ban dau 
                editorRef.commands.setContent(content) //Dat du lieu content vao trong TextEditorBox 
                setTitleChange(title) //Dat du lieu tieu de 
                console.log(data.data.blogInfo) 
            })
        }
    } , [isEdit])
    return (
        <section className="w-full h-full bg-white md:shadow-xl/30 rounded-[5px] p-10 flex flex-col items-center text-black gap-10">
            <h1 className="font-semibold text-3xl">{isEdit? 'Edit your post' : 'Write your new post'}</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-8 items-center">
                <Controller
                    control={control}
                    name="banner"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div className="w-full relative rounded-2xl border-4 border-dashed border-gray-300 flex justify-center items-center overflow-hidden h-70 sm:h-90  lg:h-100 cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange(file);
                                    if (file) {
                                        setBannerPreview(
                                            URL.createObjectURL(file)
                                        );
                                    } else {
                                        setBannerPreview(null);
                                    }
                                }}
                                onBlur={onBlur}
                                ref={ref}
                            />
                            {bannerPreview ? (
                                <img
                                    src={bannerPreview}
                                    alt="Banner Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-400">
                                    <h3 className="text-xl font-medium mt-2">
                                        Click to add your banner
                                    </h3>
                                </div>
                            )}
                        </div>
                    )}
                />

                <input
                    {...register("title")}
                    placeholder="Your title"
                    className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value = {titleChange} 
                    onChange={(e) => setTitleChange(e.target.value)}
                />

                {/* Text Editor Box */}
                <TextEditorBox
                    onContentChange={setEditorContent}
                    onEditorReady={setEditorRef}
                    initialContent=  '<p>Start writing your post...</p>' //Gia tri content ban dau -> fetchAPI de tien hanh lay neu nhu no la edit 
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                    Publish Post
                </button>
            </form>
        </section>
    );
}
