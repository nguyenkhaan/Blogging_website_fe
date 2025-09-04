import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import React from "react";
export default function Slider({
    autoSlide = false,
    autoSlideInterval = 3000,
    slides,
}) {
    const [curr, setCurr] = useState(0);

    const prev = () =>
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () =>
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, []);

    return (
        <div className="overflow-hidden relative block">
            <div
                className="flex transition-transform ease-out min-h-100 md:min-h-140 duration-500"
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {slides.map((img) => (
                   
                    <div
                        className = "w-[1280px] flex-shrink-0 min-h-full bg-blue-600 bg-no-repeat bg-cover bg-center"
                        // style = {{backgroundImage: `url(${img})`}}
                        
                    ></div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={prev}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronLeft size={36} />
                </button>
                <button
                    onClick={next}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronRight size={36} />
                </button>
            </div>

            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <div
                            className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
// <img src={img} className="w-[300%]" alt="" />