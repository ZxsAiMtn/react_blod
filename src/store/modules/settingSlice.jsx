import { createSlice } from "@reduxjs/toolkit"
import { savaData, getData, deleteData } from "../../utils/localStorage"

const initUser = () => {
    const currentUser = getData("currentUser")
    if (currentUser) {
        return currentUser
    }
    return null
}

const initToken = () => {
    const token = getData("token")
    if (token) {
        return token
    }
    return null
}


const initialState = {
    ...initUser(),
    errors: "",
    currentUser: initUser(),
    token: initToken()
}

export const settingSlice = createSlice({
    name: "setting",

    initialState,

    reducers: {
        settingFiledUpdate: (state, action) => {
            let key = action.payload.key
            let value = action.payload.value
            state[key] = value
        },
        userLogOut: () => {
            deleteData("currentUser")
            deleteData("token")
        },
        userUpdate: (state, action) => {
            if (action.payload.status === 1) {
                let currentUser = action.payload.data
                let token = action.payload.data.token

                savaData("currentUser", currentUser)
                savaData("token", token)
                state = { ...state, ...initUser() }
            } else {
                state.errors = action.payload.message
            }
        },
        onUnload: (state) => {
            return {
                ...state,
                ...initUser(),
                errors: "",
                currentUser: initUser(),
                token: initToken()
            }
        }
    }
})

export const { settingFiledUpdate, onUnload,
    userLogOut, userUpdate } = settingSlice.actions

export default settingSlice.reducer