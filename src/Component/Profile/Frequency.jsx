import React from 'react'
import ReactDOM from 'react-dom'
import HeatMap from './HeatMap'
import { getHeatmapColors } from '../../Service/getHeatMapData'
function Frequency({
    activities
}) 
{
    let totalAction = activities.reduce((acc , curr) => acc + curr , 0)
    let annotations = [0 , 1 , 2 , 3 , 4]  //Mảng này để tạo ra 4 ô màu nhỏ nằm ở dưới cùng, làm nhiệm vụ chú thích cho người dùng về cấp độ các màu 
    return (
        <>
            <span className="block mb-3 text-lg font-semibold">{totalAction} hoạt động trong 12 tháng qua</span>
            <span className="grid grid-rows-1 grid-cols-52 justify-start">
                <span className="col-span-4 mb-1">Jan</span>
                <span className="col-span-4 mb-1">Feb</span>
                <span className="col-span-4 mb-1">Mar</span>
                <span className="col-span-5 mb-1">Apr</span>
                <span className="col-span-4 mb-1">May</span>
                <span className="col-span-4 mb-1">Jun</span>
                <span className="col-span-5 mb-1">Jul</span>
                <span className="col-span-4 mb-1">Aug</span>
                <span className="col-span-4 mb-1">Sep</span>
                <span className="col-span-5 mb-1">Oct</span>
                <span className="col-span-4 mb-1">Nov</span>
                <span className="col-span-5 mb-1">Dec</span>
            </span>
            <HeatMap activities = {activities} />
            <div className = "mt-6 flex items-center gap-1 justify-end">
                {annotations.map((annotation) => <div className = "rounded corosr-pointer w-3.5 h-3.5" style={{backgroundColor: getHeatmapColors(annotation)}}></div>)}
                
            </div>
        </>
    )
}
export default Frequency