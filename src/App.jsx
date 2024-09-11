import routes from "./routes"
import Header from "./components/Header"
import { useRoutes } from "react-router-dom"
import { Suspense, memo } from "react"

function App() {
  const element = useRoutes(routes)
  return (
    <>
      {/* 公共组件 header */}
      <Header />
      {/* 主体 */}
      <div>
        <Suspense fallback={<h2>loading....</h2>}>
          {element}
        </Suspense>

      </div>
    </>
  )
}

// let app = memo(() => {
// })

export default memo(App)
