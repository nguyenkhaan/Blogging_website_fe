import React from "react";
import { useState } from "react";
import sendAdsEmail from "../../Service/sendAdsEmail";
import { onSuccess } from "../../Service/callingToast";

export default function MailBox() {
  const [mailInput, setMailInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    sendAdsEmail(mailInput);
    onSuccess("Email sent successfully");
    console.log("mail send: ", mailInput);
  }

  return (
    <div className="flex flex-col items-center w-full md:w-[80%] text-[#001A57] sticky h-fit gap-5 py-10 md:shadow-xl/30 bg-white">
      <h3 className="text-[26px] ">Send me</h3>

      <div className="w-[80%] flex flex-row md:flex-col gap-2 cursor-pointer items-center">
        <form
          className="w-full flex flex-col  gap-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label
            htmlFor="mailInput"
            className="flex justify-between items-center bg-[#F2F5F8] rounded-[5px] h-12"
          >
            <i className="fa-solid fa-envelope h-12 !w-12 text-[25px] !flex !items-center !justify-center shrink-0"></i>
            <input
              type="text"
              id="mailInput"
              className="grow-1 h-full w-full outline-none"
              placeholder="Enter email"
              value={mailInput}
              onChange={(e) => setMailInput((m) => e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="h-12 w-full rounded-[5px] bg-[#2B4886] text-white text-[20px] cursor-pointer hover:opacity-80 duration-150"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
