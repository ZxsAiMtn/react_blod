import { lazy } from "react"

const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))

const Regist = lazy(() => import("../pages/Regist"))
const Setting = lazy(() => import("../pages/Setting"))
const Profile = lazy(() => import("../pages/Profile"))
const ArticleNew = lazy(() => import("../pages/ArtivcleNew"))

const Article = lazy(() => import("../pages/Article"))
const ArticleEdit = lazy(() => import("../pages/ArticleEdit"))

import AuthRouter from "./AuthRouter"

export default [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/setting",
        element: <AuthRouter>
            <Setting />
        </AuthRouter>
    },
    {
        path: "/profile/:username",
        element: <AuthRouter>
            <Profile />
        </AuthRouter>
    },
    {
        path: "/regist",
        element: <Regist />
    },
    {
        path: "/article/new",
        element: <AuthRouter>
            <ArticleNew />
        </AuthRouter>
    },
    {
        path: "/article/:slug",
        element: <AuthRouter>
            <Article />
        </AuthRouter>
    },
    {
        path: "/article/edit/:slug",
        element: <AuthRouter>
            <ArticleEdit />
        </AuthRouter>
    }
]