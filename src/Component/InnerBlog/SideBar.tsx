import React from "react";

export default function SideBar() {
  return (
    <aside className="flex flex-col items-center w-full md:w-[80%] text-[#001A57] sticky h-fit gap-5 py-10 md:shadow-xl/30 bg-white">
      <h3 className="text-[26px] ">Related post</h3>

      <div className="w-[80%] flex flex-row md:flex-col gap-3 cursor-pointer items-center">
        <figure className="bg-red-300 max-w-50 w-full h-30">
          <img src="" alt="" />
        </figure>

        <article>
          <p className="text-[10px] text-[#3F3F3F]">Nov 10, 2025</p>

          <h4 className="text-[20px]">
            Lorem Ipsum is simply dummy text of the printing and
          </h4>
        </article>
      </div>

      <div className="w-[80%] flex flex-row md:flex-col gap-3 cursor-pointer items-center">
        <figure className="bg-red-300 max-w-50 w-full h-30">
          <img src="" alt="" />
        </figure>

        <article>
          <p className="text-[10px] text-[#3F3F3F]">Nov 10, 2025</p>

          <h4 className="text-[20px]">
            Lorem Ipsum is simply dummy text of the printing and
          </h4>
        </article>
      </div>

      <div className="w-[80%] flex flex-row md:flex-col gap-3 cursor-pointer items-center">
        <figure className="bg-red-300 max-w-50 w-full h-30">
          <img src="" alt="" />
        </figure>

        <article>
          <p className="text-[10px] text-[#3F3F3F]">Nov 10, 2025</p>

          <h4 className="text-[20px]">
            Lorem Ipsum is simply dummy text of the printing and
          </h4>
        </article>
      </div>
    </aside>
  );
}
