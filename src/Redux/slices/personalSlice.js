import { createSlice } from "@reduxjs/toolkit";

const personalSlice = createSlice({
    name: 'personal-info', 
    initialState: {}, //id , name , email, avatar , password , bat cu thu gi lien quan den personalInfo 
    reducers: {
        addInfo: (state , action) => {
            return action.payload 
        }, 
        updateInfo: (state , action) => {
            return {
                ...action.payload 
                //Sau khi thuc hien update, tien hanh call API lai lan nua de lay du lieu va giai du lieu moi vao trong day 
            }
        }
    }
})
export default personalSlice