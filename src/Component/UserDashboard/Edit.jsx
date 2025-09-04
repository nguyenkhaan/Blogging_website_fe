import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { motion, scale } from "framer-motion";
import { getUserPersonalInformation } from "../../Service/getUserPersonalInformation";
import InputEdit from "./InputEdit";
import { updatePersonalInfo } from "../../Feature/updatePersonalInfo";
import { Link } from "react-router-dom";
import personalSlice from "../../Redux/slices/personalSlice";
import { callingToast, onSuccess, onError } from "../../Service/callingToast";

export default function Edit({ personalInfo, setPersonalInfo }) {
    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm({
        mode: "all",
        reValidateMode: "all",
    });
    const avatarRef = useRef();
    const [avatar, setAvatar] = useState({
        preview: personalInfo.avatar,
    });
    const dispatch = useDispatch();

    const handleAvatarClick = () => {
        avatarRef.current.click();
    };
    const [changePass, setChangePass] = useState(false);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    useEffect(() => {
        setAvatar({ preview: personalInfo.avatar });
    }, [personalInfo]);
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file); //Su dung avatar.preview de xem truoc du lieu
    };
    // [GOI API DE CAP NHAT DU LIEU]
    const obSubmit = async (data) => {
        console.log(">>> Du lieu form: ", {
            ...data,
            avatar: avatar.preview,
            id: personalInfo.id,
        });
        const payload = {
            ...data,
            id: personalInfo.id,
            avatar: avatar,
        };
        //GOI API DE CAP NHAT DU LIEU
        await updatePersonalInfo(personalInfo.id, payload).then(
            async (json) => {
                const personalInformation = await getUserPersonalInformation(
                    personalInfo.id
                );
                if (personalInformation.data.data) {
                    dispatch(
                        personalSlice.actions.updateInfo(
                            personalInformation.data.data
                        )
                    );
                    onSuccess("Cập nhật thông tin thành công");
                    console.log(">>>>", personalInformation.data.data);
                } else onError("Cập nhật thông tin thất bại");
            }
        );
        //Chuyen sang su dung redux de cap nhat personalInfo vao state chung
        // location.reload()
    };

    // [KHONG MUON THAY DOI MAT KHAU]
    useEffect(() => {
        if (!changePass) {
            unregister("new_password"); //Go dang ki cho truong new_password
            unregister("old_password"); //Go dang ki cho truong old_password
        }
    }, [changePass]);
    const handleChangePass = (e) => {
        // console.log(e.target.checked)
        setChangePass(e.target.checked); //Check xem nguoi dung co muon dat lai mat khau hay khong
    };
    return (
        <>
            <form className="p-0 w-full" onSubmit={handleSubmit(obSubmit)}>
                <div className="flex my-2 justify-start items-end flex-1 gap-4">
                    <div
                        className="block w-60 cursor-pointer bg-cover bg-center bg-no-repeat h-60 border-solid border-gray-200 border-1 bg-blue-700 rounded-2xl "
                        style={{
                            backgroundImage: `url(${avatar.preview})`,
                        }}
                        onClick={handleAvatarClick}></div>
                    <input
                        type="file"
                        ref={avatarRef}
                        className="w-0 h-0"
                        onChange={handleAvatarChange}
                    />
                    <button
                        className="rounded text-sm bg-gray-200 border-gray-300 px-2 py-1 cursor-pointer border-1"
                        onClick={handleAvatarClick}
                        type="button">
                        Broswer...
                    </button>
                </div>
                <div className="w-full flex gap-8">
                    <InputEdit
                        label="Username"
                        type="text"
                        name="name"
                        handleInput={{ register, errors, clearErrors }}
                        value={personalInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="changePass" className="font-semibold mr-4">
                        Đổi mật khẩu?
                    </label>
                    <input
                        type="checkbox"
                        name="changePass"
                        onChange={handleChangePass}
                    />
                </div>
                {changePass ? (
                    <div className="w-full flex gap-8">
                        <InputEdit
                            label="Old Password"
                            type="password"
                            name="old_password"
                            handleInput={{ register, errors, clearErrors }}
                            value={personalInfo.password}
                        />
                        <InputEdit
                            label="New Password"
                            type="password"
                            name="new_password"
                            handleInput={{ register, errors, clearErrors }}
                            value={personalInfo.password}
                        />
                    </div>
                ) : (
                    <div className="w-full flex gap-8">
                        <div className="flex flex-col my-2 justify-start flex-1 gap-2">
                            <label className="font-bold text-base">
                                Old Password:
                            </label>
                            <input
                                disabled
                                className="text-base text-gray-800 bg-gray-200 cursor-not-allowed rounded-md px-2 py-2.5 opacity-60"
                                defaultValue={personalInfo.password}
                                type="password"
                            />
                        </div>
                        <div className="flex flex-col my-2 justify-start flex-1 gap-2">
                            <label className="font-bold text-base">
                                New Password:
                            </label>
                            <input
                                disabled
                                className="text-base text-gray-800 bg-gray-200 cursor-not-allowed rounded-md px-2 py-2.5 opacity-60"
                                defaultValue={personalInfo.password}
                                type="password"
                            />
                        </div>
                    </div>
                )}
                <div className="w-full flex gap-6 items-center justify-end mt-6">
                    <Link to={`/profile?id=${personalInfo.id}`}>
                        <motion.button
                            className=" py-2 px-6 rounded-lg text-lg text-semibold block cursor-pointer  text-blue-800 border-2 border-solid border-blue-800"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}>
                            Cancel
                        </motion.button>
                    </Link>
                    <motion.button
                        type="submit"
                        className=" py-2 px-6 rounded-lg text-lg text-semibold cursor-pointer text-white border-2 border-solid bg-blue-800 border-blue-800"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ ease: "easeInOut", duration: 0.4 }}>
                        Save
                    </motion.button>
                </div>
            </form>
        </>
    );
}
