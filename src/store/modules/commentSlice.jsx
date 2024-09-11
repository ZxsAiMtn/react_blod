import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from "../../request"

const initialState = {
    body: "",
    comments: [],
    errors: null
}

export const createComment = createAsyncThunk("comment/create", async ({ slug, body }) => {
    const response = await request.comment.create(slug, body)
    return response.data
})

export const initComment = createAsyncThunk("comment/init", async slug => {
    const response = await request.comment.get(slug)
    return response.data
})

export const deleteComment = createAsyncThunk("comment/delete", async ({ slug, id }) => {
    await request.comment.delete(slug, id)
    return id
})


export const commentSlice = createSlice({
    name: "comment",

    initialState,

    reducers: {
        commentFiledUpdate: (state, action) => {
            let key = action.payload.key
            let value = action.payload.value
            state[key] = value
        },
    },
    extraReducers: builder => {
        builder.addCase(createComment.fulfilled, (state, action) => {
            let comment = action.payload
            let newComments = state.comments.concat([comment])
            return { ...state, comments: newComments, body: "" }
        }).addCase(initComment.fulfilled, (state, action) => {
            let newComments = action.payload
            return { ...state, comments: newComments, body: "" }
        }).addCase(deleteComment.fulfilled, (state, action) => {
            const deleteId = action.payload
            const deleteResult = state.comments.filter(item => {
                return item.id !== deleteId
            })
            return { ...state, comments: deleteResult, body: "" }
        })
    }
})

export const { commentFiledUpdate } = commentSlice.actions

export default commentSlice.reducer