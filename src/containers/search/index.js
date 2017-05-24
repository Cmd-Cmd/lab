import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';
import {Breadcrumb, Container, UCheck, Article, Pagination,
        Form, Input, Button, Sticky, ScrollSpy, Icon} from 'amazeui-react';
import {connect} from 'react-redux';

import hint from '../../hint';

import './Search.css';
import {searchPageTo, changeSearchKeyword} from '../../action';
import {searchListing} from '../../action/fetch';

class Search extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.searchListing('');
  }

  render() {
    let pageArr = [];
    let temp = (this.props.pageNow - 2 < 0) ? 0 : this.props.pageNow - 2;
    for (let i = temp; i < temp + 4 && i <= this.props.pageAll; i++) {
      pageArr.push(i + 1);
    }
    if (pageArr.length === 3 && pageArr[0] > 1) {
      pageArr.unshift(pageArr[0] - 1);
    }
    return (
      <div id='Search'>
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item>
              <IndexLink to='/'>首页</IndexLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to='/search'>搜索</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Sticky>
            <Form id='searchInput' onSubmit={(e) => {
              e.preventDefault();
              let temp = 0;
              temp += document.getElementById('newsCheck').checked ? 1 : 0;
              temp += document.getElementById('noticeCheck').checked ? 2 : 0;
              if (temp === 0) {
                hint('请选择搜索类别');
              } else {
                this.props.searchListing(temp === 3 ? '' : temp);
              }
            }}>
              <Input btnAfter={
                                <Button type='submit' amStyle='secondary'>
                                  搜索
                                </Button>
                              }
                     placeholder='搜索...' amStyle='secondary'
                     onChange={e => this.props.changeKeyword(e.target.value)}
                     value={this.props.keyword} />
               <UCheck label='新闻' amStyle='success' id='newsCheck'
                       inline defaultChecked />
               <UCheck label='公告' amStyle='success' id='noticeCheck'
                       inline defaultChecked />
            </Form>
          </Sticky>
          <ul className='am-list'>
            {
              this.props.data.map((ele, inx) => {
                return (
                  <ScrollSpy key={inx}>
                    <li>
                        <Link to={`/${ele.type === '1' ? 'news' : 'notice'}/` +
                                  ele.ArticleID}
                              className='am-list-item-hd'>
                          <Article title={ele.Title}>
                            <div className='am-article-bd'>
                              <p className='am-margin-0 am-article-lead'>
                                {ele.infor}
                              </p>
                            </div>
                          </Article>
                        </Link>
                        <span className='am-list-date'>{ele.DateTime}</span>
                    </li>
                  </ScrollSpy>
                );
              })}
          </ul>
          <Pagination centered>
            <Pagination.Item disabled={(this.props.pageNow === 0)}>
              <Icon icon='angle-double-left'
                    onClick={
                      (e) => this.props.changePage(this.props.pageNow - 1)}>
              </Icon>
            </Pagination.Item>
            {pageArr.map((ele, inx) => {
              return (
                <Pagination.Item key={inx}
                                 active={this.props.pageNow === ele - 1}>
                  <Icon icon='blank'
                        onClick={(e) => this.props.changePage(ele - 1)}>
                    {ele}
                  </Icon>
                </Pagination.Item>
              );
            })}
            <Pagination.Item disabled={(this.props.pageNow ===
                                        this.props.pageAll)}>
              <Icon icon='angle-double-right'
                    onClick={(e) => {
                      this.props.changePage(this.props.pageNow + 1);
                    }}></Icon>
            </Pagination.Item>
          </Pagination>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.search.result,
    pageNow: state.search.pageNow,
    pageAll: state.search.pageAll,
    keyword: state.search.keyword
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePage: (page) => dispatch(searchPageTo(page)),
    changeKeyword: word => dispatch(changeSearchKeyword(word)),
    searchListing: type => dispatch(searchListing(type))
  };
};

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;
