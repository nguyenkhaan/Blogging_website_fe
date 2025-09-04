import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
const roundedNumber = (num) => (num > 1000) ? ((num / 1000).toFixed(1) + 'K') : num.toString()
function AuthorItem({ authorData }) 
{
    const [followed , setFollowed] = useState(false) 
    const handleFollowClick = () => {
        setFollowed(!followed) 
    }
    const { name, email, famous, blogs, subscribers, follows } = authorData
    return (
        <div className="w-full flex flex-col gap-3.5 mb-4">
            <div className="w-full flex items-center justify-between gap-3">
                {/* Hinh nen tac gia */}
                <div 
                    className="rounded-full w-16 h-16 bg-black bg-no-repeat bg-cover bg-center"
                    style = {{
                        backgroundImage: 'url(Image/default-avatar.png)'
                    }}
                ></div>
                <div className="flex-1 min-h-20 px-2 ">
                    {/* Ten (name) - dia chi Email (email) */}
                    <h3 className="text-base text-blue-700">{name}</h3>
                    <h3 className="text-sm text-black mb-2">{email}</h3>
                    {/* Nut theo doi */}
                    <button onClick = {handleFollowClick} className="rounded text-sm text-blue-500 transition-all duration-200 ease-linear px-2 text-left border-solid border-2 border-blue-700 hover:cursor-pointer hover:text-white hover:bg-blue-700">
                        <span className="font-bold text-base">+ </span>
                        {followed? 'Đã theo dõi' : 'Theo dõi'}
                    </button>
                </div>
            </div>
            {/* Thanh tich tong quan */}
            <div className="px-4 flex gap-2 items-center text-sm text-gray-600 justify-between">
                <span className="block cursor-default" title="Reputations: 5.6K"><i class="fa-solid fa-star"></i> {Math.floor(famous)}</span>
                <span className="block cursor-default" title="Tổng số bài viết: 4.7K"><i class="fa-solid fa-pencil"></i> {roundedNumber(blogs)}</span>
                <span className="block cursor-default" title="Người theo dõi: 4.7K"><i class="fa-solid fa-user-plus" title="Người theo dõi"></i> {roundedNumber(follows)}</span>
                <span className="block cursor-default" title="Tổng số lượt xem: 5.6K"><i class="fa-solid fa-eye"></i> {roundedNumber(subscribers)}</span>
            </div>
        </div>
    )
}
export default AuthorItem