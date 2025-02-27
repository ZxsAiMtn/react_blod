import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    username: "",
    password: "",
    errors: ""
}

export const registSlice = createSlice({
    name: "regist",

    initialState,

    reducers: {
        registFiledUpdate: (state, action) => {
            let key = action.payload.key
            let value = action.payload.value
            state[key] = value
        },
        registSubmit: (state, action) => {
            state.errors = action.payload
        },
        // 解决 从其他页面 跳转到注册页的时候 数据还在的BUG
        onUnload: () => {
            return { ...initialState }
        }
    }
})

export const { registFiledUpdate, registSubmit, onUnload } = registSlice.actions

export default registSlice.reducer