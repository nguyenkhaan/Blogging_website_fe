import api from "../Aixos/api"

async function activityRecord(id, days) {
    const res = api.post('/activity-record' , {id , days} , {
        headers: {
            "Content-Type": "application/json"
        }, 
        withCredentials: 'include'
    }) 
    return res 
}

export {activityRecord}