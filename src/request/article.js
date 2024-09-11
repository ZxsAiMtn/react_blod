import apiClient from "./apiClient"

const LIIMIT = 5;

// 1   3
const OFFSET = page => {
    return (page - 1) * LIIMIT
}

export default {
    create: article => apiClient.post("/articles", { article }),
    get: slug => apiClient.get("/articles/" + slug),
    update: article => apiClient.put("/articles/" + article.slug, { article }),
    delete: slug => apiClient.delete("/articles/" + slug),

    favorite: slug => apiClient.post("/favorites/" + slug),
    unfavorite: slug => apiClient.delete("/favorites/" + slug),

    getAuthor: (author, page) => apiClient.get(`/articles?author=${author}&limit=${LIIMIT}&offset=${OFFSET(page)}`),
    getFavorite: (favorite, page) => apiClient.get(`/articles?favorite=${favorite}&limit=${LIIMIT}&offset=${OFFSET(page)}`),

    // ----新增的 home中使用的请求
    getAll:(page)=>apiClient.get(`/articles?limit=${LIIMIT}&offset=${OFFSET(page)}`),
    byTag:(tag,page)=>apiClient.get(`/articles?tag=${tag}&limit=${LIIMIT}&offset=${OFFSET(page)}`)
}