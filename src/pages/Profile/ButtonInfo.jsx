import { Link } from "react-router-dom";

const ButtonInfo = props => {
    const { profile, isCurrentUser, follow, unfollow } = props

    let handleClick = (e) => {
        e.preventDefault()
        if (profile.following) {
            unfollow(profile.username)
        } else {
            follow(profile.username)
        }
    }

    if (isCurrentUser) {
        // 访问自己的页面
        return (
            <Link
                to={"/setting"}
                className="btn btn-outline-info">
                编辑 <i className="iconfont icon-zhuanchezhuanyongbeifen"></i>
            </Link>
        )
    } else {
        // 访问其他人的
        return <button
            onClick={handleClick}
            className={profile.following ? "btn btn-danger" : "btn btn-success"}>
            {profile.following ? "取消关注" : "添加关注"} <i className="iconfont icon-xihuan"></i>
        </button>
    }
}

export default ButtonInfo