import { useSelector, useDispatch } from "react-redux"
import {
    settingFiledUpdate,
    userUpdate,
    onUnload
} from "../../store/modules/settingSlice"
import request from "../../request"
import { avatarUpdate } from "../../store/modules/loginSlice"
import { useEffect } from "react"

function SettingFrom() {
    const { username, bio, avatar, password } = useSelector((state) => {
        return state.setting
    })
    let dispatch = useDispatch()

    const settingUpdate = async (e) => {
        e.preventDefault()
        try {
            let result = await request.user.update({ username, bio, avatar, password })
            dispatch(userUpdate(result))
            dispatch(avatarUpdate())
        } catch (error) {
            let err = "程序内部有问题"
            dispatch(userUpdate(err))
        }
    }

    useEffect(()=>{
        return ()=>{
            dispatch(onUnload())
        }
    },[])

    return (
        <form onSubmit={settingUpdate}>
            <fieldset className="form-group">
                <input
                    type="text"
                    placeholder="用户昵称"
                    className="form-control form-control-lg"
                    value={username}
                    disabled
                />
            </fieldset>
            <fieldset className="form-group">
                <input
                    type="text"
                    placeholder="用户头像"
                    className="form-control form-control-lg"
                    value={avatar || ""}
                    onChange={(e) => dispatch(settingFiledUpdate({
                        key: "avatar",
                        value: e.target.value
                    }))}
                />
            </fieldset>
            <fieldset className="form-group">
                <textarea
                    rows="8"
                    className="form-control form-control-lg"
                    placeholder="用户简介"
                    value={bio || ""}
                    onChange={(e) => dispatch(settingFiledUpdate({
                        key: "bio",
                        value: e.target.value
                    }))}
                />
            </fieldset>
            <fieldset className="form-group">
                <input
                    type="password"
                    placeholder="用户密码"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => dispatch(settingFiledUpdate({
                        key: "password",
                        value: e.target.value
                    }))}
                />
            </fieldset>
            <button
                className="btn btn-outline-success pull-xs-left"
                type="submit"
            >更新</button>
        </form>
    )
}

export default SettingFrom