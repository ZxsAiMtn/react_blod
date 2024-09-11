import { PureComponent, memo } from "react";
import { connect } from "react-redux";
import Articles from "../Articles"
import {
    getTabArticles,
    syncCurrentPage,
    syncTab,
    syncTag,
    onUnload
} from "../../store/modules/homeSlice"
import { getData } from "../../utils/localStorage";

import { Button, Flex } from 'antd';

let AllTab = memo(props => {

    let { currentUser, tab, onTabClick } = props


    if (!currentUser) {
        return null
    } else {
        return (
            <li className="nav-item">
                <Flex gap="small" wrap="wrap">
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            onTabClick("all", 1)
                        }}
                        type={tab == "all" ? "primary" : ""}>全部</Button>
                </Flex>
            </li>
        )
    }
})

let YouTab = memo(props => {

    let { currentUser, tag } = props

    if (!currentUser) {
        return null
    } else {
        if (tag) {
            return (
                <li className="nav-item">
                    <Flex gap="small" wrap="wrap">
                        <Button type={"primary"}>{tag}</Button>
                    </Flex>
                </li>
            )
        } else {
            return null
        }
    }
})

class Main extends PureComponent {

    handleClick = (tab, page) => {
        this.props.syncTag(null)
        this.props.syncTab(tab)
        this.props.syncCurrentPage(page)
        this.props.getTabArticles()
    }

    handlePageClick = (pageNum) => {
        this.props.syncCurrentPage(pageNum)
        this.props.getTabArticles()
    }

    render() {
        return (
            <>
                {/* 选项卡 */}
                <div className="feet-toggle clearfix">
                    <ul className="nav navbar-nav">
                        <AllTab
                            tab={this.props.tab}
                            currentUser={this.props.currentUser}
                            onTabClick={this.handleClick}
                        />
                        <YouTab
                            tag={this.props.tag}
                            currentUser={this.props.currentUser}
                        />
                    </ul>
                </div>

                {/* 显示文章列表 */}
                <Articles
                    articles={this.props.articles}
                    count={this.props.count}
                    currentPage={this.props.currentPage}
                    isShowPage={true}
                    onPageClick={this.handlePageClick}
                />
            </>
        )
    }

    componentDidMount() {
        let currentUser = getData("currentUser")
        if (currentUser) {
            // 当页面开始显示的时候 就应该查询所有的文章
            this.props.syncTab("all")
            this.props.syncCurrentPage(1)
            this.props.getTabArticles()
        }
    }

    componentWillUnmount() {
        this.props.onUnload()
    }
}

const mapState = state => ({
    ...state.home,
    ...state.login
})

const mapDispatch = dispatch => ({
    getTabArticles: () => dispatch(getTabArticles()),
    syncCurrentPage: (page) => dispatch(syncCurrentPage(page)),
    syncTab: (tab) => dispatch(syncTab(tab)),
    syncTag: (tag) => dispatch(syncTag(tag)),
    onUnload: () => dispatch(onUnload())
})


export default connect(mapState, mapDispatch)(Main) 