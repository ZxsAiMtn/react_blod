import Item from "./Item"
import Pagination from "./Pagination"

const Articles = props => {
    let { currentPage, count, onPageClick, articles, isShowPage } = props
    if (!articles) {
        return <div>正在加载中...</div>
    }
    if (articles && articles.length == 0) {
        return <div>此处没有文章...</div>
    }
    return (
        <div>
            {
                articles.map(article => {
                    return <Item article={article} key={article.slug} />
                })
            }
            {
                isShowPage ? <Pagination
                    count={count}
                    currentPage={currentPage}
                    onPageClick={onPageClick}
                /> : null
            }
        </div>
    )
}
export default Articles