import { startDate, endDate } from "../Helper/getStartEndCurrentYear";
const Colors = ["#89A3B2", "#d0ebfe", "#89cbfd", "#41acfc", "#0179d1"]; //[0 , 1 , 2 , 3 , >=3]
const heatMapData = {
    startDate: startDate,
    endDate: endDate,
    count: [],
};
const getHeatmapColors = (activityCount) => {
    return Colors[Math.min(4, Math.max(0, activityCount))];
};
function CalendarHeatMap(startDate, endDate, activityCount) {
    heatMapData.startDate = startDate;
    heatMapData.endDate = endDate;
    heatMapData.count = activityCount;
    const dayInMonth = Math.ceil(
        (heatMapData.endDate - heatMapData.startDate) / (1000 * 60 * 60 * 24)
    );
    heatMapData.count = Array(dayInMonth).fill(0);
    const grid = Array.from({ length: dayInMonth }, (_, i) => {
        const date = new Date(heatMapData.startDate);
        //Ham getDate() chi tra ve so ngay trong thang
        //Nếu như đem nó truyền thẳng vào new Date() thì nó sẽ tính i ngày
        //bắt đầu từ 1 cột mốc 1970-01-01
        //Lí do in ra trình duyệt vẫn thấy đầy đủ là vì cách browser tự xử lí
        //không phải bản chất JS xử lí
        //FAKE API
        heatMapData.count[i] = activityCount[i];
        date.setDate(date.getDate() + i);

        return date.toISOString().slice(0, 10);
    });
    const getColorInNthDay = (index) => {
        const activityCount = heatMapData.count[index];
        return getHeatmapColors(activityCount);
    };
    const getTitleInDay = (index, day) => {
        const activityCount = heatMapData.count[index];
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };  //Dinh dang dd-mm-yyyy, Doc ngay va gio theo kieu Viet Nam vi-VN
        if (activityCount == 5) return `4+ posts on ${(new Date(day)).toLocaleDateString('vi-VN' , options)}`;
        return `${activityCount} posts on ${(new Date(day)).toLocaleDateString('vi-VN' , options)}`;
    };
    return {
        grid,
        getColorInNthDay,
        getTitleInDay,
    };
}

export { CalendarHeatMap, getHeatmapColors };
