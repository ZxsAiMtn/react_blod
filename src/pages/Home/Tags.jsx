import { memo } from "react";
import { connect } from "react-redux";
import {
    getTabArticles,
    syncCurrentPage,
    syncTab,
    syncTag
} from "../../store/modules/homeSlice"
import { getData } from "../../utils/localStorage";


const Tags = memo(props => {
    // 接收标签
    const { tags } = props

    let currentUser = getData("currentUser")

    if (currentUser) {
        if (tags) {
            return (
                <div className="tag-list">
                    {
                        tags.map(tag => {
                            return (
                                <span
                                    style={{ marginRight: "4px", marginBottom: "4px" }}
                                    className="btn btn-secondary btn-sm"
                                    onClick={
                                        () => {
                                            //  条件查询 ， 更新页码  
                                            props.syncTab(null)
                                            props.syncTag(tag)
                                            props.syncCurrentPage(1)
                                            props.getTabArticles()
                                        }
                                    }
                                    key={tag}>{tag}&nbsp;

                                </span>
                            )
                        })
                    }
                </div>
            )
        } else {
            return <div>加载标签....</div>
        }
    } else {
        return <div>您还未登录</div>
    }


})

const mapDispatch = dispatch => ({
    getTabArticles: () => dispatch(getTabArticles()),
    syncCurrentPage: (page) => dispatch(syncCurrentPage(page)),
    syncTab: (tab) => dispatch(syncTab(tab)),
    syncTag: (tag) => dispatch(syncTag(tag))
})


export default connect(null, mapDispatch)(Tags) 