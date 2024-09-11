import Errors from "../../components/Errors"
import {
    articleFiledUpdate,
    articleAddTag,
    articleRemoveTag,
    articleResult,
    onUnload,
    ArticleBySlugResult
} from "../../store/modules/articleSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import request from "../../request"
import { useEffect } from "react"

function ArticleEdit() {

    let { title, description, body, tags, tag, errors } = useSelector((state) => {
        return state.article
    })

    let dispatch = useDispatch()

    let watchEnter = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault()
            dispatch(articleAddTag())
        }
    }

    let removeTag = (tag) => {
        return () => {
            dispatch(articleRemoveTag(tag))
        }
    }

    let navigate = useNavigate()

    // 一会 要变成更新  
    let onSubmitForm = async (article) => {
        try {
            const result = await request.article.update(article)
            console.log(result);
            if (result.status == 1) {
                const { slug } = result.data
                navigate("/article/" + slug)
            } else {
                dispatch(articleResult(result.message))
            }
        } catch (error) {
            let err = "程序内部有问题"
            dispatch(articleResult(err))
        }
    }
    // 从 params 取出数据
    const { slug } = useParams()
    // 获取文章信息   数据的回显
    let getArticleBySlug = async (routeSlug) => {
        try {
            const result = await request.article.get(routeSlug)
            if(result.status===1){
                dispatch(ArticleBySlugResult(result.data))
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getArticleBySlug(slug)
        return () => {
            dispatch(onUnload())
        }
    }, [])


    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">更新文章</h1>
                        <Errors errors={errors} />
                        <form>
                            <fieldset className="form-group">
                                <input
                                    value={title || ""}
                                    type="text"
                                    placeholder="文章标题"
                                    className="form-control form-control-lg"
                                    onChange={(e) => dispatch(articleFiledUpdate(
                                        { key: "title", value: e.target.value }))}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    value={description || ""}
                                    type="text"
                                    placeholder="文章的描述"
                                    className="form-control form-control-lg"
                                    onChange={(e) => dispatch(articleFiledUpdate(
                                        { key: "description", value: e.target.value }))}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <textarea
                                    value={body || ""}
                                    placeholder="使用markdown编辑文章"
                                    className="form-control form-control-lg"
                                    rows={12}
                                    onChange={(e) => dispatch(articleFiledUpdate(
                                        { key: "body", value: e.target.value }))}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    value={tag || ""}
                                    type="text"
                                    placeholder="输入标签"
                                    className="form-control form-control-lg"
                                    onKeyDown={watchEnter}
                                    onChange={(e) => dispatch(articleFiledUpdate(
                                        { key: "tag", value: e.target.value }))}
                                />
                                {/* 显示所以的标签 */}
                                {
                                    tags.map(tag => {
                                        return (
                                            <span
                                                style={{ marginRight: "4px" }}
                                                className="btn btn-secondary btn-sm"
                                                key={tag}>{tag}&nbsp;
                                                <i
                                                    onClick={removeTag(tag)}
                                                    className="iconfont icon-denglong"></i>
                                            </span>
                                        )
                                    })
                                }
                            </fieldset>
                            <button
                                className="btn btn-success"
                                type="button"
                                onClick={() => {
                                    onSubmitForm({slug, title, description, body, tags })
                                }}
                            >确定更新</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ArticleEdit