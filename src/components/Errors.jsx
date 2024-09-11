const Errors = ({ errors }) => {
    // props 都是一个对象  

    // 有 t   没 f
    if (!errors) {
        return null
    }

    return (
        <ul className="error-messages">
            <li>{errors}</li>
        </ul>
    )
}

export default Errors

// 1 注册 
// 数据库中  A123 B456 C789

// 2 D 123 

// 3 后端经过比对发现有重复账号  报错  返回到前端中

// 4 接收错误信息  注册 登录 写作 。。。

// 5  函数组件  接收props 