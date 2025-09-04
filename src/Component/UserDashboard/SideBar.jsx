import React, { useState, useEffect } from "react";

export default function SideBar({ currentBoard, setCurrentBoard }) {
  const [showSideBar, setShowSideBar] = useState(false);

  const boardList = [
    {
      icon: <i className="fa-solid fa-file"></i>,
      title: "My Posts",
      boardName: "PostsBoard",
    },
    {
      icon: <i className="fa-solid fa-feather"></i>,
      title: "Write new post",
      boardName: "BlogEditBoard",
    },
    {
      icon: <i className="fa-solid fa-user"></i>,
      title: "Edit Profile",
      boardName: "ProfileEditBoard",
    },
    {
      icon: <i className="fa-solid fa-feather"></i>,
      title: "Setting",
      boardName: "SettingBoard",
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      setShowSideBar(false);
    };

    // Thêm event listener
    window.addEventListener("resize", handleResize);

    // Cleanup: gỡ listener khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setShowSideBar(false);
  }, [currentBoard])


  return (
    <nav
      className={`flex flex-col bg-white md:py-10 py-5 rounded-[10px] w-full items-center gap-10 md:shadow-xl/30 overflow-hidden md:h-fit justify-between origin-top duration-300 ${showSideBar ? "" : "h-[70px]"
        }`}
    >
      <button
        type="button"
        className=" cursor-pointer text-[20px] md:hidden h-[30px] w-[30px] absolute left-5"
      >
        <i
          className={`fa-solid ${showSideBar ? "fa-x" : "fa-bars"} text-blue-900`}
          onClick={() => setShowSideBar((s) => !s)}
        ></i>
      </button>

      <h2 className="text-[20px] font-[700] w-full text-center pb-5">
        Dashboard
      </h2>

      <ul className="w-full flex flex-col">
        {boardList.map((board, index) => (
          <button
            type="button"
            key={index}
            className={`w-full h-20 flex px-10 gap-2 items-center cursor-pointer duration-100 font-[600] relative before:absolute before:right-0 before:h-full before:w-1 before:bg-[#193CB8] before:scale-y-0 before:origin-center hover:before:scale-y-100 before:duration-100 hover:text-[20px] ${currentBoard === board.boardName ? 'bg-[#193CB8] text-white' : ''}`}
            onClick={() => setCurrentBoard(board.boardName)}
          >
            {board.icon}
            {board.title}
          </button>
        ))}
      </ul>
    </nav>
  );
}