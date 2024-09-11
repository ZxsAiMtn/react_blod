import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import request from "../../request"
import { useDispatch } from "react-redux"
import { articleDeleteResult, articleFavoriteResult } from "../../store/modules/articleSlice"

let favorite_class = "btn btn-success"
let not_favorite_class = "btn btn-danger"

const ArticleAction = (props) => {
    let navgation = useNavigate()

    const { article, currentUser } = props
    const { slug, author } = article

    let dispatch = useDispatch()

    // 删除文章  
    const deleteArticle = async () => {
        let result = await request.article.delete(slug)
        if (result.status === 1) {
            navgation("/")
        } else {
            dispatch(articleDeleteResult(result.message))
        }
    }

    // 喜欢文章
    const favoriteArticle = async (slug) => {
        let result = await request.article.favorite(slug)
        if (result.status == 1) {
            dispatch(articleFavoriteResult(result.data))
        }
    }
    // 不喜欢文章
    const unfavoriteArticle = async (slug) => {
        let result = await request.article.unfavorite(slug)
        if (result.status == 1) {
            dispatch(articleFavoriteResult(result.data))
        }
    }


    // 判断 currentUser是否存在
    if (currentUser) {
        // 判断是否登录
        const isMe = author && currentUser.username == author.username
        if (isMe) {
            // 自己的文章 编辑 和 删除
            return (
                <span>
                    <Link
                        to={`/article/edit/${slug}`}
                        className="btn btn-outline-info">
                        <i className="iconfont icon-zhuanchezhuanyongbeifen"></i>编辑
                    </Link>
                    {" "}
                    <button className="btn btn-danger"
                        onClick={() => {
                            deleteArticle(slug)
                        }}
                    >
                        删除<i className="iconfont icon-denglong"></i>
                    </button>
                </span>
            )
        } else {
            // 喜欢或不喜欢
            return (
                <button className={article.favorited ? favorite_class : not_favorite_class}
                    onClick={() => {
                        if (article.favorited) {
                            unfavoriteArticle(slug)
                        } else {
                            favoriteArticle(slug)
                        }
                    }}
                >
                    <i className="iconfont icon-xihuan"></i>{article.favoriteCount}
                </button>
            )
        }
    } else {
        // 如果未登录  可以允许跳转到登录页
        return <button
            onClick={() => {
                alert("你没有登录,请返回登录,即将为你跳转")
                navgation("/")
            }}
            className="btn btn-danger">
            <i className="iconfont icon-xihuan"></i>喜欢
        </button>
    }
}

export default ArticleAction