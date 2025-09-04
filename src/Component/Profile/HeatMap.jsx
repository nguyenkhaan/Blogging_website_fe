//Đo tần suất đăng bài viết của người dùng
import React from "react";
import ReactDOM from "react-dom";
import { CalendarHeatMap } from "../../Service/getHeatMapData";
function HeatMap({ activities }) {
    //Tính số lượng ngày giữa startDatre và endDate

    const Calendar = CalendarHeatMap(
        new Date("2025-01-01"),
        new Date("2026-01-01"),
        activities
    );
    return (
        <div
            className="w-full grid grid-flow-col gap-1 grid-rows-8"
            style={{ gridTemplateRows: "repeat(7 , minmax(0 , 1fr)" }}>
            {Calendar.grid.map((day, index) => {
                return (
                    <div
                        className="w-3.5 h-3.5 rounded cursor-pointer bg-gray-400"
                        title={Calendar.getTitleInDay(index, day)}
                        style={{
                            backgroundColor: Calendar.getColorInNthDay(index),
                        }}></div>
                );
            })}
        </div>
    );
}
export default HeatMap;
