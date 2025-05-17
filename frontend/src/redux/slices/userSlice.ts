import { createSlice } from "@reduxjs/toolkit";
import type { User } from '../../types';

export interface IUser {
    authenticated: boolean;
    user: User | null

}

const initialState: IUser = {
    authenticated: false,
    user: null
}


export const userSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user || action.payload
            state.authenticated = true
        },
        logout: (state) => {
            state.user = null
            state.authenticated = false
            localStorage.clear()
            window.location.href = '/login'
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer