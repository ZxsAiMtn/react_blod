import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { useParams } from "react-router-dom"
import { getProfile, followResult } from "../../store/modules/profileSlice"
import { useEffect, useState } from "react"
import request from "../../request/index.js"
import ButtonInfo from "./ButtonInfo.jsx"
import { articleAuthorResult, syncCurrentPage } from "../../store/modules/articlesSlice"
import Articles from "../Articles"

const Profile = () => {
    // shallowEqual redux中的一个 插件  工具 
    // 查看是否有新的 store的更新 如果有则更新 没有则不更新

    let { username } = useParams()

    const profile = useSelector((state) => {
        return state.profile
    }, shallowEqual)

    let dispatch = useDispatch()

    let getUserInfo = () => {
        request.user.get(username).then(res => {
            if (res.status == 1) {
                dispatch(getProfile(res.data))
            } else {
                dispatch(getProfile(res.message))
            }
        })
    }
    useEffect(() => {
        getUserInfo()
        getAuthorArticle()
        return () => {

        }
    }, [username, profile.username])

    const currentUser = useSelector((state) => {
        return state.login.currentUser
    }, shallowEqual)

    const isCurrentUser = currentUser && currentUser.username === profile.username

    // 添加关注
    let follow = async () => {
        try {
            let result = await request.user.follow(username)
            dispatch(followResult(result.data))
        } catch (error) {
            let errors = "程序内部有问题"
            dispatch(followResult(errors))
        }
    }
    // 取消关注
    let unfollow = async () => {
        try {
            let result = await request.user.unfollow(username)
            dispatch(followResult(result.data))
        } catch (error) {
            let errors = "程序内部有问题"
            dispatch(followResult(errors))
        }
    }

    // 获取自己的文章
    let getAuthorArticle = (pageNum=1) => {
        request.article.getAuthor(username, pageNum).then((res) => {
            if (res.status === 1) {
                dispatch(articleAuthorResult(res.data))
            }
        })
    }

    // 获取喜欢的文章
    let getFavoriteArticle = (pageNum=1) => {
        request.article.getFavorite(username,pageNum).then((res) => {
            if (res.status === 1) {
                dispatch(articleAuthorResult(res.data))
            }
        })
    }

    const articlesSlice = useSelector((state) => {
        return state.articlesSlice
    }, shallowEqual)

    let [tab, setTab] = useState(1)

    let handlePageClick = (pageNum) => {
        dispatch(syncCurrentPage(pageNum))
        if (tab == 1) {
            getAuthorArticle(pageNum)
        } else if (tab == 2) {
            getFavoriteArticle(pageNum)
        }
    }

    return (
        <div className="profile-page">
            {/* 1 用户的信息 */}
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 offset-md-12 col-xs-12">
                            {/* 1.1 头像 bio 名字 */}
                            <img src={profile.avatar || "http://localhost:8000/default.png"}
                                style={{ width: 100, height: 100 }} alt="" />
                            <h4>{profile.username}</h4>
                            <p>{profile.bio}</p>

                            {/* 1.2  行为 看谁的主页 自己 编辑，其他人，关注或取消关注 */}
                            <ButtonInfo profile={profile}
                                isCurrentUser={isCurrentUser}
                                follow={follow}
                                unfollow={unfollow}
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* 2 用户的文章 用户自己的文章 // 关注的文章 */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12 offset-md-12 col-xs-12">
                        {/* 选项卡 */}
                        <div className="articles-toggle">
                            <ul className="nav navbar-nav clearfix">
                                <li className="nav nav-item">
                                    <button
                                        onClick={
                                            () => {
                                                setTab(1)
                                                getAuthorArticle()
                                            }
                                        }
                                        className={tab == 1 ? "btn btn-outline-success active" : "btn btn-outline-success"}>
                                        我的文章
                                    </button>
                                </li>
                                <li className="nav nav-item">
                                    <button
                                        onClick={
                                            () => {
                                                setTab(2)
                                                getFavoriteArticle()
                                            }
                                        }
                                        className={tab == 2 ? "btn btn-outline-success active" : "btn btn-outline-success"}>
                                        关注者的文章
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {/* 3 文章的列表 */}
                        <Articles
                            articles={articlesSlice.articles}
                            count={articlesSlice.count}
                            currentPage={articlesSlice.currentPage}
                            isShowPage={true}
                            onPageClick={handlePageClick}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile