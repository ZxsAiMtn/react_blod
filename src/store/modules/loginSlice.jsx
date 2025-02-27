import { createSlice } from "@reduxjs/toolkit"
import { savaData, getData } from "../../utils/localStorage"

const initUser = () => {
    const currentUser = getData("currentUser")
    if (currentUser) {
        return currentUser
    }
    return null
}

const initialState = {
    email: "",
    username: "",
    password: "",
    errors: "",
    currentUser: initUser(),
    token: null
}

export const loginSlice = createSlice({
    name: "login",

    initialState,

    reducers: {
        loginFiledUpdate: (state, action) => {
            let key = action.payload.key
            let value = action.payload.value
            state[key] = value
        },
        loginSubmit: (state, action) => {
            const { status, message, data } = action.payload
            if (status === 1) {
                let currentUser = data
                let token = data.token

                savaData("currentUser", currentUser)
                savaData("token", token)

                return { ...state, ...data }
            } else {
                return { ...state, errors: message }
            }
        },
        // 解决 从其他页面 跳转到注册页的时候 数据还在的BUG
        onUnload: () => {
            return { ...initialState, currentUser: initUser() }
        },
        avatarUpdate: (state) => {
            state.currentUser = initUser()
        }
    }
})

export const { loginFiledUpdate, loginSubmit, onUnload,
    avatarUpdate } = loginSlice.actions

export default loginSlice.reducer