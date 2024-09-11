import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    title: "",
    description: "",
    body: "",
    tags: [],
    tag: "",
    errors: null
}

export const articleSlice = createSlice({
    name: "article",

    initialState,

    reducers: {
        articleFiledUpdate: (state, action) => {
            let key = action.payload.key
            let value = action.payload.value
            state[key] = value
        },
        articleAddTag: (state) => {
            const tags = state.tags.concat([state.tag])
            return { ...state, tags, tag: "" }
        },
        articleRemoveTag: (state, action) => {
            let removeTag = action.payload
            let filterTags = state.tags.filter(tag => {
                return tag !== removeTag
            })
            return { ...state, tags: filterTags }
        },
        // 创建文章
        articleResult: (state, action) => {
            state.errors = action.payload
        },
        onUnload: () => {
            return { ...initialState }
        },
        ArticleBySlugResult: (state, action) => {
            return { ...state, ...action.payload }
        },
        articleDeleteResult: (state, action) => {
            state.errors = action.payload
        },
        articleFavoriteResult: (state, action) => {
            return {...state,...action.payload}
        }
    }
})

export const { articleFiledUpdate,
    articleAddTag,
    articleRemoveTag,
    articleResult,
    onUnload,
    ArticleBySlugResult,
    articleDeleteResult,
    articleFavoriteResult
} = articleSlice.actions

export default articleSlice.reducer