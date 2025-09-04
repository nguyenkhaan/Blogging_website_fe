//Calling Toast: Ham dung de goi toast khi duoc click
const color = {
  success: "blue-500",
  warning: "yellow-500",
  error: "red-500",
};
const toast = {
  success: {
    title: "Congratulations",
    icon: `<i class="text-${color.success} fa-solid text-4xl md:text-7xl fa-circle-check"></i>`,
  },
  warning: {
    title: "Warning",
    icon: `<i class="text-${color.warning} fa-solid text-4xl md:text-7xl fa-triangle-exclamation"></i>`,
  },
  error: {
    title: "Failed",
    icon: `<i class="text-${color.error} fa-solid text-4xl md:text-7xl fa-circle-xmark"></i>`,
  },
};
function toastHTML(type, message = "You had a toast message my boss") {
  return `
        <div
            class="toast-element shadow-xl border-l-${color[type]} md:w-160 flex transition-all ease-in-out md:h-30 gap-5 right-0 p-6 border-solid border-l-16 justify-between items-center bg-white my-3 rounded-tl-xl rounded-bl-xl w-[360px] h-22">
            ${toast[type].icon}
            <div class="flex-1 flex flex-col item-center md:gap-2 justify-start">
                <span class="font-semibold text-base md:text-2xl overflow-hidden block w-full">${toast[type].title}</span>
                <span class="text-sm overflow-hidden md:text-xl text-black block w-full">${message}</span>
            </div>
        </div>
    `;
}
const duration = 3000;
function callingToast({ type, message }) {
  const toastContainer = document.querySelector("#toast-container");
  const newToast = document.createElement("div");
  const timeOutID = setTimeout(() => {
    toastContainer.removeChild(newToast);
    clearTimeout(timeOutID);
  }, 4010);
  newToast.innerHTML = toastHTML(type, message);
  const toastElement = newToast.querySelector(".toast-element");
  toastElement.style.animation = `slideInLeft ease .3s , fadeOut 1s 3s ease-in-out forwards`;
  toastContainer.appendChild(newToast);
}

const onSuccess = (message) => {
  callingToast({
    type: "success",
    message: message,
  });
};

const onError = (mess) => {
  callingToast({ type: "error", message: mess });
};

export { callingToast, onSuccess, onError };
