import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import request from "../../request"
import { ArticleBySlugResult, onUnload } from "../../store/modules/articleSlice"
import { useDispatch, useSelector } from "react-redux"
import ArticleAction from "./ArticleAction"
import { marked } from "marked"
import Comments from "../Comments"

function Article() {

    // 文章别名 
    const { slug } = useParams()

    let dispatch = useDispatch()

    // 通过文章别名 获取具体的文章信息
    let getArticleBySlug = async (routeSlug) => {
        let result = await request.article.get(routeSlug)
        if (result.status == 1) {
            dispatch(ArticleBySlugResult(result.data))
        } else {
            dispatch(ArticleBySlugResult(result.message))
        }
    }

    // 页面初始化的时候操作 

    useEffect(() => {
        getArticleBySlug(slug)
        return () => {
            dispatch(onUnload())
        }
    }, [])

    let article = useSelector((state) => {
        return state.article
    })

    let currentUser = useSelector((state) => {
        return state.login.currentUser
    })

    const { title, description, body, tags, author } = article

    // 自由发挥
    if (!body) {
        return null
    }

    const markdata = body
    const markhtml = marked.parse(markdata, { sanitize: true })
    const markObj = { __html: markhtml }
    return (
        <div className="article-page">
            {/* 文章的信息 */}
            <div className="banner">
                <div className="container">
                    <h1>{article.title}</h1>
                    <div className="article-meta">
                        <div className="info">
                            <Link to={`/profile/${author && author.username}`}>
                                <img alt=""
                                    src={(author && author.avatar) || "http://localhost:8000/default.png"} />
                            </Link>
                        </div>
                        <div className="info">
                            <Link to={`/profile/${author && author.username}`}>
                                {author && author.username}
                            </Link>
                        </div>
                        <ArticleAction article={article} currentUser={currentUser} />
                    </div>

                </div>
            </div>
            {/* 文章的主体 */}
            <div className="row article-content">
                <div className="col-xs-10">
                    <div dangerouslySetInnerHTML={markObj}></div>
                    <ul className="tag-list">
                        {
                            tags.map(tag => {
                                return <li key={tag}
                                    className="btn btn-secondary btn-sm">
                                    {tag}
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>

            {/* 文章的评论 */}
            <Comments currentUser={currentUser} slug={slug} />
        </div>
    )
}

export default Article