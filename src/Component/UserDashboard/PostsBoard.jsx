import React, { useState, useEffect } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getUserPersonalBlogs } from "../../Service/getUserPersonalBlogs";
import { getURLQuery } from "../../Service/getURLQuery";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteUserPersonalBlog } from "../../Feature/deleteBlog";

export default function PostsBoard({setCurrentBoard}) {
    const [postInput, setPostInput] = useState("");
    const [postDisplayCount, setPostDisplayCount] = useState(0);
    const [counter, setCounter] = useState(-1);
    function handleSeeMore() {
        setPostDisplayCount((p) => Math.min(p + 20, data.length));
        setCounter((prev) => prev + 1); //Tang counter len 1 va tien hanh cap nhat blogs
    }
    const location = useLocation();
    const queryClient = useQueryClient() 
    const { data, refetch } = useQuery({
        //useQuery se chay sau khi UI duco hien thi => Can phai co 1 cai dependecies de trang tien hanh reload lai va cap nhat lai du lieu
        //Ban dau, vi useQuery chua duoc chay nen data se la undefined, chung ta console.log(data) thi se bgi dinh undefined
        //Sau do UI hien thi, va luc nay data se duoc fetch xong => Chung ta can co 1 dependencies dua vao data de thay doi va tien hanh update lai giao dien
        queryKey: ["blog", "user", counter], //query key, dung de lay du lieu - blog , user: Cac blog danh rieng cho user
        queryFn: async () => {
            const userID = getURLQuery(location).get("id");
            const res = await getUserPersonalBlogs(userID, false); //Truyen cai counter vao
            console.log(res.data.blogs);
            // setPostData(res.data.blogs) //Dat du lieu vao state de hien thi
            return res.data.blogs; //Tra ve cai nay de lay du lieu tra ve data 
        },
    });
    const {mutate} = useMutation({
        mutationFn: async ({userID , blogID}) => {
            const res = await deleteUserPersonalBlog(blogID , userID) 
            queryClient.setQueriesData(['blog' , 'user' , counter] , (prev) => {
                return prev.filter((post) => post.blogID != blogID)   //Tien hanh dat lai du lieu moi bang cach dung queryClient.setQueriesData 
            }) 
            return res 
        }
    })
    console.log(">>Check data: ", data);
    useEffect(() => {
        if (data) {
            setPostDisplayCount(Math.min(data.length, 20)); //Mot lan se hien thi 20 cai. Sau khi bam see more thi hien thi them 20 cai nua
            setCounter(0);
        }
    }, [data]);

    const handleDeleteBlog = async (blogID) => {
        console.log('Tien hanh xoa blog co id la: ' , blogID) 
        const userID = getURLQuery(location).get('id') 
        const res = mutate({blogID , userID}) //Tien hanh truyen object, khong phai truyen gia tri rieng le  
        console.log('Ket qua xoa bai: ', res)
    }
    return (
        <section className="w-full h-full bg-white md:shadow-xl/30 rounded-[5px] p-10 flex flex-col gap-10">
            <div className="flex justify-between items-center flex-col sm:flex-row gap-5">
                <h2 className="text-[30px] font-[600] shrink-0 text-blue-900">
                    My posts
                </h2>

                <label
                    htmlFor=""
                    className="border-1 h-10 flex justify-between items-center rounded-[5px] w-60 overflow-hidden">
                    <input
                        type="text"
                        className="h-full w-full outline-none px-2"
                        placeholder="Search post"
                        value={postInput}
                        onChange={(e) => setPostInput(e.target.value)}
                    />
                    <button
                        type="button"
                        className="w-10 h-10 shrink-0 bg-[#193CB8] text-white cursor-pointer hover:text-[17px] duration-100">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </label>
            </div>

            <ul className="flex flex-col gap-5 w-full justify-center items-center">
                {data && data.length < 1 && (
                    <div className="mt-20 font-[500] text-[25px] opacity-50">
                        You haven't post anything yet...{" "}
                    </div>
                )}
                {data &&
                    data
                        .slice(0, postDisplayCount)
                        .map((post, index) => (
                            <Post post={post} key={index} setCurrentBoard = {setCurrentBoard} handleDeleteBlog={() => handleDeleteBlog(post.blogID)}></Post>
                        ))}
                {data && data.length > 5 && (
                    <div
                        className="bg-[#193CB8] text-white px-5 py-2 rounded-[5px] cursor-pointer hover:opacity-90"
                        onClick={handleSeeMore}>
                        See more
                    </div>
                )}
            </ul>
        </section>
    );
}

function Post({ post , handleDeleteBlog , setCurrentBoard}) {
    const location = useLocation() 
    return (
        <div className="w-full md:min-h-30 shadow-lg flex flex-col md:flex-row gap-5 p-5 rounded-[5px] cursor-pointer border-1 overflow-hidden items-center">
            {/* <img src={post.banner} alt="Post banner" className='h-full bg-contain' /> */}
            <div
                className="w-full bg-no-repeat bg-cover bg-center md:h-30 md:w-30 shrink-0 overflow-hidden rounded-[5px] border-2'"
                style={{
                    backgroundImage: `url(${post.banner})`,
                }}></div>

            <article className="w-full grow-1">
                <Link to = {`/blog?id=${post.blogID}`}>
                    <h3 className="text-[18px] md:text-[20px] font-[500] hover:underline hover:cursor-pointer hover:text-blue-800">
                        {post.title}
                    </h3>
                </Link>
            </article>

            <div className="w-full md:w-10 shrink-0 flex-row md:flex-col flex justify-between items-center h-full text-white ">
                <div className="w-8 h-8 rounded-[5px] bg-[#193CB8] flex justify-center items-center cursor-pointer duration-100 hover:text-[20px] hover:opacity-80 shrink-0 ">
                    <Link to={`/dashboard?id=${getURLQuery(location).get('id')}&blogID=${post.blogID}`}>
                    <i class="fa-solid fa-pen-to-square" onClick={() => setCurrentBoard('BlogEditBoard')}></i>
                    </Link>
                </div>

                <div className="w-8 h-8 rounded-[5px] bg-[#ff0000] flex justify-center items-center cursor-pointer duration-100 hover:text-[20px] hover:opacity-80 shrink-0">
                    <i class="fa-solid fa-trash" onClick={handleDeleteBlog}></i>
                </div>
            </div>
        </div>
    );
}


/**
 * React Query dung de lay du lieu tu API 
 * Gom co QueryKey va queryFN 
 * useMutation 
 * gom co mutationFn: ham update du lieu va queryClient.setQueriesData -> Tao ra du lieu moi tu du lieu cu da lay tu useQuery 
 * 
 * 
 */