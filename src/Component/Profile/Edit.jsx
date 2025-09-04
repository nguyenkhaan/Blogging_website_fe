import React from 'react'
import ReactDOM from 'react-dom'
function Input() {
    return (
        <div className="flex flex-col my-2 justify-start flex-1 gap-2">
            <label className="font-bold text-base">First Name: </label>
            <input type="text" className="text-base text-gray-800 rounded-md px-2 py-2.5 border-2 border-solid border-gray-500" placeholder="Enter" />
        </div>

    )
}
function Edit() {
    return (
        <>
            <h3 className="text-2xl font-semibold block w-full text-center font-sans mb-5">Edit profile</h3>
            <form className="">
                <div className="w-full flex gap-8">
                    <Input />
                    <Input />
                    <Input />
                </div>
                <Input />
                <Input />
                <div className="w-full flex gap-8">
                    <Input />
                    <Input />
                </div>
                <Input />
                <div className="w-full flex gap-6 items-center justify-end mt-6">
                    <button className=" py-2 px-8 rounded-lg text-xl text-semibold cursor-pointer  text-blue-800 border-2 border-solid border-blue-800">Cancel</button>
                    <button type="submit" className=" py-2 px-8 rounded-lg text-xl text-semibold cursor-pointer text-white border-2 border-solid bg-blue-800 border-blue-800">Save</button>
                </div>
            </form>
        </>
    )
}
export default Edit