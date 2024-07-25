
import {createSlice} from "@reduxjs/toolkit";

/// for checking profile of user
const initialState = {
    user:null,
    loading: false,

}

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers : {
        setUser(state ,value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload
        },
    }
});


export const {setUser, setLoading} = profileSlice.actions ;
export default profileSlice.reducer;
