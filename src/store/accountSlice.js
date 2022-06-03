import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: 'accountDetails',
    initialState : {
        isAdmin:false,
        user : {},
        isLogin : false
    },
    reducers : {
        setIsAdmin : (state,action) => {
            state.isAdmin = action.payload
        },
        setUser : (state,action) => {
            state.user = action.payload
        },
        setLogin : (state,action) => {
            state.isLogin = action.payload
        }
    }
})
export const { setIsAdmin, setUser, setLogin} = accountSlice.actions

export default accountSlice.reducer